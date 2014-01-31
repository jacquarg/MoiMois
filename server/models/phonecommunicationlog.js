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
