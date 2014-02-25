americano = require('americano');

module.exports = PhoneCommunicationLog = americano.getModel('phonecommunicationlog', {
    'origin': String,
    'idMesInfos': String,
    'direction': String,
    'timestamp': Date,
    'subscriberNumber': String,
    'correspondantNumber': String,
    'chipCount': Number,
    'chipType': String,
    'type': String,
    'imsi': { 'type': String, 'default': null },
    'imei': { 'type': String, 'default': null },
    'latitude': Number,
    'longitude': Number,
    'snippet': String
});

PhoneCommunicationLog.totals = function(callback) {
    PhoneCommunicationLog.rawRequest(
        "totals",
        {},
        function(err, kv) {
            if (err) {
                callback(err, null);
                //TODO defensive ?
            } else {
                var res = kv[0].value;
                res['callsContactsCount'] = Object.keys(res.callsContacts).length;
                delete res.callsContacts;
                callback(null, res);
            }
        });
};

PhoneCommunicationLog.monthStats = function(month, callback) {
    //var month = "2013-09";
    PhoneCommunicationLog.rawRequest(
        "totals",
        {   
//            group_level: 1,
            startkey: [month, null, null],
            endkey: [month, {}, {}]
        },
        function(err, kv) {
            if (err) {
                callback(err, null);
            } else if (kv.length == 0) {
                callback("No phonecommunication this month.", null);

            } else {
                var res = kv[0].value;
                //Find biggest called time from callsContacts
                var max = 0;
                var maxContact = null;
                for (var contact in res.callsContacts) {
                    if (res.callsContacts[contact] > max) {
                        max = res.callsContacts[contact];
                        maxContact = contact;
                    }
                }
                res.mostCalledContact = maxContact;
                res.mostCalledContactDuration = max;
                delete res.callsContacts;

                callback(null, res);
            }
        });
};

PhoneCommunicationLog.dayStats = function(month, callback) {
    //var month = "2013-09";
    PhoneCommunicationLog.rawRequest(
        "totals",
        {   
            group_level: 2,
            startkey: [month, null, null],
            endkey: [month, {}, {}]
        },
        function(err, kv) {
            if (err) {
                callback(err, null);
                //TODO defensive ?
            }else if (kv.length == 0) {
                callback("No phonecommunication this month.", null);
            } else {
                //Most calledDuration day.
                var max = kv[0];
                for (var idx=0; idx<kv.length; idx++) {

                    if (kv[idx].value.callsDuration > max.value.callsDuration) {
                        max = kv[idx];
                    }
                }
                callback(null, max);
            }
        });
};

PhoneCommunicationLog.weekDayStats = function(month, callback) {
    //var month = "2013-09";
    PhoneCommunicationLog.rawRequest(
        "totals",
        {   
            group_level: 2,
            startkey: [month, "01", null],
            endkey: [month, "28", {}]
        },
        function(err, kv) {
            if (err) {
                callback(err, null);
                //TODO defensive ?
            }else if (kv.length == 0) {
                callback("No phonecommunication this month.", null);
            } else {
                // week days calls durations.
                var slices = [];
                for (var i = 0; i < 7; i++) slices[i] = 0;
                

                //Most calledDuration day.
                //var max = kv[0];
                for (var idx=0; idx<kv.length; idx++) {
                    var k = kv[idx].key ;
                    var day = new Date(k[0] + "-" + k[1]).getDay();
                    var v = kv[idx].value ;
                    
                    slices[day] += v.callsDuration ;
                }
                
                res = [
                    { rangeLabel: "lundi", sum: slices[1], },
                    { rangeLabel: "mardi", sum: slices[2], },
                    { rangeLabel: "mercredi", sum: slices[3], },
                    { rangeLabel: "jeudi", sum: slices[4], },
                    { rangeLabel: "vendredi", sum: slices[5], },
                    { rangeLabel: "samedi", sum: slices[6], },
                    { rangeLabel: "dimanche", sum: slices[0], },
                ] ;
                callback(null, res);
            }
        });
};

