/*
* Put here the requests to the DataSystem.
*/

cozydb = require('cozydb');

module.exports = {
    geolocationlog : {
        deviceStateIsOn : function(doc) {
                if (!doc.deviceState
                    && !isNaN(doc.latitude)
                    && !isNaN(doc.longitude)) {

                    emit(
                    [doc.timestamp.slice(0, 7),
                        doc.timestamp.slice(8,10),
                        doc.timestamp.slice(11, -1)]
//                        doc.timestamp
                        , doc);
                }
            }
    },

    phonecommunicationlog: {
        totals: {
            map: function(doc) {
                var sums = {
                    calls: 0,
                    callsOutgoing: 0,
                    callsIncoming: 0,
                    callsContacts : {},
                    //contactsCount: 0,
                    callsDuration: 0,
                    sms : 0,
                    data : 0,

                };

                if (doc.type == 'VOICE') {
                    sums.calls += 1;
                    if (doc.direction == 'INCOMING') {
                        sums.callsIncoming += 1;
                    } else {
                        sums.callsOutgoing += 1;
                    }
                    sums.callsDuration += doc.chipCount;
                    sums.callsContacts[doc.correspondantNumber] = doc.chipCount ;
                } else if (doc.type == 'SMS-C') {
                    sums.sms += 1;
                } else if (doc.type == 'DATA') {
                    sums.data += doc.chipCount;
                }

                emit([doc.timestamp.slice(0, 7),
                        doc.timestamp.slice(8,10),
                        doc.timestamp.slice(11, -1)], sums);
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                    calls: 0,
                    callsOutgoing: 0,
                    callsIncoming: 0,
                    callsContacts : {},
                    //contactsCount: 0,
                    callsDuration: 0,
                    sms : 0,
                    data : 0,
                };

                for (var j=0; j<values.length; j++) {
                    v = values[j];
                    sums.calls += v.calls;
                    sums.callsIncoming += v.callsIncoming;
                    sums.callsOutgoing += v.callsOutgoing;

                    sums.callsDuration += v.callsDuration;
                    sums.sms += v.sms;
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
    receiptdetail: {
        byDate: function(doc) {
            emit(
               [doc.timestamp.slice(0, 7),
                doc.timestamp.slice(8,10),
                doc.timestamp.slice(11, -1)]
                , doc);
        },

        totalsByMonthByProduct : {
            map: function(doc) {
                emit([doc.timestamp.substring(0,7), doc.barcode],
                        doc
                     //{
                     //   count: doc.amount,
                    //    total: doc.price,
                    //    receiptDetail: doc
                    //}
                    );
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                    amount: 0,
                    price: 0,
                };

                for (var idx=0; idx<values.length; idx++) {
                    var val = values[idx];
                    for (var k in val) {
                        if (k == 'amount') {
                            sums.amount += val.amount ;

                        } else if (k == 'price') {
                            sums.price += val.price ;
                        } else {
                            sums[k] = val[k];
                        }
                    }

                }
                return sums;
            }
        },

        totalsBySection : {
            map: function(doc) {
                var aggSectionMap = {
                    '24': '200', '20': '200', '22': '200', '2': '200',
                    '12': '120', '32': '120', '26': '260',
                    '4': '260',
                    '8': '280', '28': '280',
                };

                section = (doc.section in aggSectionMap) ? aggSectionMap[doc.section] : doc.section ;

                emit(section,
                    { count: doc.amount, total: doc.price }
                    );
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                    count: 0,
                    total: 0
                };

                for (var idx=0; idx<values.length; idx++) {
                    sums.count += values[idx].count ;
                    sums.total += values[idx].total ;
                }
                return sums;
            }
        },
    },

    receipt: {
        totals : {
            map: function(doc) {
                emit(
                   [doc.timestamp.slice(0, 7),
                    doc.timestamp.slice(8,10),
                    doc.timestamp.slice(11, -1)]
                    , {
                        receipts: 1,
                        total: doc.total,
                    });
            },
            reduce : function(key, values, rereduce) {
                var sums = {
                    receipts: 0,
                    total: 0,
                };

                for (var idx=0; idx<values.length; idx++) {
                    sums.receipts += values[idx].receipts ;
                    sums.total += values[idx].total ;
                }
                return sums;
            }
        },
        byDate: function(doc) {
            emit(
               [doc.timestamp.slice(0, 7),
                doc.timestamp.slice(8,10),
                doc.timestamp.slice(11, -1)]
                , doc);
        },
    },
    bankoperation: {
        byDate: function(doc) {
            emit(
               [doc.date.slice(0, 7),
                doc.date.slice(8,10),
                doc.date.slice(11, -1)]
                , doc);
        },
    },

    cozyinstance: {
        all: cozydb.defaultRequests.all
    },
    identity: {
        all: cozydb.defaultRequests.all
    },

    editionofmoi: {
        byMonth: function(doc) {
            emit(doc.ofMonth, doc);
        },
    },
};
