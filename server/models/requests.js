/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');

module.exports = {
    geolocationlog : {
        deviceStateIsOn : function(doc) {
                if (!doc.deviceState 
                    && !isNaN(doc.latitude)
                    && !isNaN(doc.longitude)) {
                    emit(doc.timestamp, doc);
                }
            }
    },

    phonecommunicationlog: {
        totals: {
            map: function(doc) {
                var sums = {
                    //calls: 0,
                    callsContacts : {},
                    //contactsCount: 0,
                    callsDuration: 0,
                    //sms : 0,
                    data : 0,

                };

                if (doc.type == 'VOICE') {
                    sums.calls += 1;
                    sums.callsDuration += doc.chipCount;
                    sums.callsContacts[doc.correspondantNumber] = doc.chipCount ;
                } else if (doc.type == 'SMS-C') {
                    sums.sms += 1;
                } else if (doc.type == 'DATA') {
                    sums.data += doc.chipCount;
                }

                emit([doc.timestamp.slice(0, 7), 
                        doc.timestamp.slice(8,10), 
                        doc.timestamp.slice(12, -1)], sums);
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                    //calls: 0,
                    callsContacts : {},
                    //contactsCount: 0,
                    callsDuration: 0,
                    //sms : 0,
                    data : 0,
                };

                for (var j=0; j<values.length; j++) {
                    v = values[j];
                    //sums.calls += v.calls;

                    sums.callsDuration += v.callsDuration;
                    //sums.sms += v.sms;
                    sums.data += v.data;

                    for (key in v.callsContacts) {
                        sums.callsContacts[key] = v.callsContacts[key];
                        //sums.callsContacts[key] = true;
                    }

                }
                return sums;
            }
        }

        
    },
};
