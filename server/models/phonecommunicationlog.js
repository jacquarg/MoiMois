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
                //TODO defensive ?
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
