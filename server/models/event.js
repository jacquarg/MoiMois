var cozydb = require('cozydb');
var moment = require('moment-timezone');
var async = require('async');
var RRule = require('rrule').RRule;

log = require('printit')({ prefix: 'moi:models:event' });


module.exports = Event = cozydb.getModel('Event', {
    start: String,
    end: String,
    place: String,
    details: String,
    description: String,
    rrule: String,
    tags: [String],
    attendees: [Object],
    related: { type: String, default: null },
    timezone: String,
    alarms: [Object],
    created: String,
    caldavuri: String,
    uuid: String,
    lastModification: String,
    shareID: String,
});

// 'start' and 'end' use those format,
// According to allDay or rrules.
Event.dateFormat = 'YYYY-MM-DD';
Event.ambiguousDTFormat = 'YYYY-MM-DD[T]HH:mm:00.000';
Event.utcDTFormat = 'YYYY-MM-DD[T]HH:mm:00.000[Z]';

// Handle only unique units strings.
Event.alarmTriggRegex = /(\+?|-)PT?(\d+)(W|D|H|M|S)/;

Event.prototype.isAllDay = function() {
    return this.start && this.start.length === 10;
};

Event.prototype.isRecurrent = function() {
    return !this.rrule || this.rrule === '';
};

Event.prototype.generateRealEvents = function(start, end) {

    // TODO : fetch it from the right cozy doc !
    var cozyTimezone = 'Europe/Paris';
    if (! this.isRecurrent()) { return [this]; } // TODO check this in bounds !

    // Prepare datetimes.

    // bounds.
    var jsDateBoundS = start.toDate();
    var jsDateBoundE = end.toDate();

    // For allday event, we expect that event occur on the good day in
    // local time.
    // TODO : get the timezone ...
    var eventTimezone = (this.isAllDay()) ? cozyTimezone : this.timezone;

    var mDateEventS = moment.tz(this.start, eventTimezone);
    var mDateEventE = moment.tz(this.end, eventTimezone);

    var jsDateEventS = new Date(mDateEventS.toISOString());

    var options = RRule.parseString(this.rrule);
    options.dtstart = jsDateEventS;

    var rrule = new RRule(options);

    // RRule generate event with browser's timezone. But DST changing day
    // may be different between browser's timezone, and eventTimezone, which
    // may shift event from one hour. This function do that fix.
    var fixDSTTroubles = function(jsDateRecurrentS) {
        // jsDateRecurrentS.toISOString is the UTC start date of the event.
        // unless, DST of browser's timezone is different from event's
        // timezone.
        var isoDate = jsDateRecurrentS.toISOString();
        var mDateRecurrentS = moment.tz(isoDate, eventTimezone);

        // Fix DST troubles :
        // The hour of the recurring event is fixed in its timezone.
        // So we use it as reference.
        var diff = mDateEventS.hour() - mDateRecurrentS.hour();
        // Correction is -1, 1 or 0.
        if (diff === 23) {
            diff = -1;
        } else if (diff === -23) {
            diff = 1;
        }

        mDateRecurrentS.add(diff, 'hour');

        return mDateRecurrentS;
    };

    var realEvents = rrule.between(jsDateBoundS, jsDateBoundE)
        .map(function(jsDateRecurrentS) {
            var fixedDate = fixDSTTroubles(jsDateRecurrentS);
            var mDateRecurrentS = moment(fixedDate);
            mDateRecurrentS.tz(cozyTimezone);

            // Compute event.end as event.start + event.duration.
            mDateRecurrentE = mDateRecurrentS.clone()
                .add(mDateEventE.diff(mDateEventS, 'seconds'), 'seconds');
            var attrs = this.getAttributes();
            attrs.start = mDateRecurrentS.toISOString();
            attrs.end = mDateRecurrentE.toISOString();
            return new Event(attrs);
        }, this);

    return realEvents;
};



Event.ofMonth = function(month, callback) {
    // TODO
    // return all realevents during this month 
    // (ie ponctual and all recurrent occurences)
    var start = moment(month);
    var end = moment(month).add(1, 'month');

    async.parallel({
        ponctuals: function(cb) {
            Event.request('ponctualByStart', 
                { startkey: start.toISOString(), 
                    endkey: end.toISOString() },
                cb);
        },
        recurrents: function(cb) {
            Event.request('recurrentByStart', { endkey: end.toISOString() }, cb); 
        },
    }, function(err, res) {
        if (err) { return callback(err); }
        var realEvents = res.recurrents.reduce(
            function(agg, event) {
                return agg.concat(event.generateRealEvents(start, end));
        }, res.ponctuals);

        callback(null, realEvents);
    });
};  

// TODO.
// Event.recurrentOccurencesOfMonth = function(month, callback) {
//     Event.request('recurrentByStart')
// };

/*
Event.byCalendar = (calendarId, callback) ->
    Event.request 'byCalendar', key: calendarId, callback


Event.tags = (callback) ->
    Event.rawRequest "tags", group: true, (err, results) ->
        return callback err if err
        out = calendar: [], tag: []
        for result in results
            [type, tag] = result.key
            out[type].push tag
        callback null, out


Event.calendars = (callback) ->
    Event.tags (err, results) ->
        return callback err, [] if err

        async.map results.calendar,
            # Map string to tag-compatible object
            (calendarName, cb) ->
                return Tag.getOrCreateByName name: calendarName, cb
            ,
            (err, calendars) ->
                callback err, calendars


Event.createOrGetIfImport = (data, callback) ->
    if data.import
        Event.request 'byDate', key: data.start, (err, events) ->
            if err
                log.error err
                Event.create data, callback
            else if events.length is 0
                Event.create data, callback
            else if data.description is events[0].description
                log.warn 'Event already exists, it was not created.'
                callback(null, events[0])
            else
                Event.create data, callback
    else
        Event.create data, callback





Event::formatStart = (dateFormat, locale='en') ->
    if @rrule
        date = moment.tz @start, @timezone
    else
        date = moment @start

    date.tz User.timezone
    date.locale(locale)
    formattedDate = date.format dateFormat
    formattedDate += " (#{User.timezone})" unless @isAllDayEvent()
    formattedDate += " "

    return formattedDate


# @TODO : this doesn't handle merge correctly
Event::getGuest = (key) ->
    guests = @attendees or []
    currentguest = guests.filter((guest) -> guest.key is key)[0]

    if currentguest
        currentguest.setStatus = (status, callback) =>
            currentguest.status = status
            @updateAttributes attendees: guests, callback

    return currentguest


# Return the emails to alert if action is EMAIL, or BOTH on the alarms.
# Actualy the attendee is the cozy's user.
Event::getAlarmAttendeesEmail = ->
    return [User.email]


# November 2014 Migration :
# Migrate from v1.0.4 to next-gen doctypes.
# Use date format as key to detect doctype version.
Event::migrateDoctype = (callback) ->

    hasMigrate = @migrateDateTime 'start'
    # Quick quit if no migration.
    if not hasMigrate
        callback()
    else
        @migrateDateTime 'end'

        if @rrule
            @timezone = User.timezone

        else
            @timezone = undefined

        @save callback


Event::migrateDateTime = (dateField) ->
    dateStr = @[dateField]

    # Skip buggy or empty values.
    if not dateStr
        return false

    # Check if it's already ISO8601
    # Skip allDay event (leght is 10), because they didn't exist.
    if dateStr.length is 10 or dateStr.charAt(10) is 'T'
        return false

    d = dateStr
    # Check for a timezone
    if "GMT" not in dateStr
        d = d + " GMT+0000"

    m = moment.tz d, 'UTC'

    if @rrule
        timezone = User.timezone or "Europe/Paris"
        @[dateField] = m.tz(timezone).format Event.ambiguousDTFormat

    else
        @[dateField] = m.format Event.utcDTFormat

    return true


Event::patchTag = (callback) ->
    if not @tags? or not @tags[0]?
        @updateAttributes tags: ['my-calendar'], callback
    else
        callback()


Event.migrateAll = (callback) ->
    Event.all {}, (err, events) ->
        if err?
            console.log err
            callback()
        else
            async.eachLimit events, 10, (event, done) ->
                event.migrateDoctype -> event.patchTag ->
                    setImmediate done
            , callback


Event.bulkCalendarRename = (oldName, newName, callback) ->
    Event.request 'byCalendar', key: oldName, (err, events) ->
        async.eachSeries events, (event, done) ->
            tags = [newName]
            event.updateAttributes {tags}, done
        , (err) -> callback err, events


Event.bulkDelete = (calendarName, callback) ->
    Event.request 'byCalendar', key: calendarName, (err, events) ->
        async.eachLimit events, 10, (event, done) ->
            event.destroy done
        , (err) -> callback err, events


# Create a placeholder event if there are no event at all, so there is a default
# calendar the first time the user opens the application.
Event.initializeData = (callback) ->
    Event.all {}, (err, events) ->
        return callback err if err?

        if events.length is 0
            # Very old arbitrary date.
            rawDate = "1901-01-01T00:00:00.000Z"
            formattedDate = moment(rawDate).format "YYYY-MM-DD"
            formattedNow = moment().tz('UTC').toISOString()
            data =
                start: formattedDate
                end: formattedDate
                description: ''
                place: ''
                tags: [localization.t("new calendar")]
                created: formattedNow
                lastModification: formattedNow
            Event.create data, callback

        else
            callback()


Event.load = (start, end, callback) ->
    startkey = start.format 'YYYY-MM-DDT00:00:00.000\Z'
    endkey = end.format 'YYYY-MM-DDT00:00:00.000\Z'

    Event.request 'byDate', {startkey, endkey}, callback
*/
