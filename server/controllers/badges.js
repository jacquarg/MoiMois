GeolocationLog = require('../models/geolocationlog');
InsuranceClaim = require('../models/insuranceclaim');
BankOperation = require('../models/bankoperation'); 
PhoneCommunicationLog = require('../models/phonecommunicationlog');
ReceiptDetail = require('../models/receiptdetail');
async = require('async');


module.exports = Badges = {
all: function(req, res) {
    // each function use différents part of the model, and create a badges list.
    async.parallel([
        function(callback) {
            GeolocationLog.distanceStats(function(err, data) {
                var badges = [];
                // Top dist badge
                badges.push({
                    type: "top_distance",
                    label: Math.round(data.topDistance) + ' km',
                });

                // Top speed
                badges.push({
                    type: "top_speed",
                    label: Math.round(data.topSpeed) + ' km/h',
                });

                // Traveled distances
                var hundreds = Math.floor(data.totalDistance / 100);
                for (var h=1;h<=hundreds;h++) {
                    badges.push({
                        type: "traveled_distance",
                        label: h + '00 km',
                    });
                }
                
                callback(null, badges);
            });
        },
        function(callback) {
            PhoneCommunicationLog.totals(function(err, data) {
                var badges = [];
                
                // Data
                //var tens = Math.floor(data.callsDuration / (5 * 1000000000)); //(5 GB) TODO
                var tens = Math.floor(data.data / (100000000)); //(100 MB)
                for (var h=1;h<=tens;h++) {
                    badges.push({
                        type: "data",
                        label: h + '00 Mo',
                    });
                }

                // Calls duration.
                var tens = Math.floor(data.callsDuration / (5 * 60 * 60)); //(5 hours)
                for (var h=1;h<=tens;h++) {
                    badges.push({
                        type: "calls_duration",
                        label: h + ' H',
                    });
                }

                // Contacts called/received.
                var tens = Math.floor(data.callsContactsCount / 10);
                for (var h=1;h<=tens;h++) {
                    badges.push({
                        type: "contacts_count",
                        label: h + '0',
                    });
                }
                
                callback(null, badges);
            });
        },

        function(callback) {
            ReceiptDetail.sectionsTotals(['10', '30'], function(err, data) {
                var badges = [];
                // Top fromage count
                badges.push({
                    type: "top_fromage",
                    label: Math.round(data) +  ' ème',
                });
                console.log(badges);
                callback(null, badges);
            });
            
        },
        function(callback) {
            Receipt.all(function(err, data) {
                var badges = [];

                // Get max articles count
                var max = 0;
                data.forEach(function(item) {
                    max = Math.max(item.articlesCount, max);
                });

                // Top fromage count
                badges.push({
                    type: "top_articles_count",
                    label: Math.round(max) +  ' articles',
                });
                callback(null, badges);
            });
            
        },
        function(callback) {
            InsuranceClaim.all(function(err, data) {
                var badges = [];

                // Get max articles count
                var count = 0;
                data.forEach(function(item) {
                    for (var i=0;i<5;i++) {
                        count += item['axaNBSIN' + i];
                    }
                });

                // Top fromage count
                badges.push({
                    type: "top_sinistres",
                    label: count,
                });
                callback(null, badges);
            });
        },
        // TODO auto anniversary !

        function(callback) {
            BankOperation.all(function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var badges = []
                var counts = data.reduce(function(acc, bop) {
                    if (bop.family == 'withdrawals') {
                        if (acc.topDab > bop.amount) { // amount is < 0 .
                            acc.topDab = bop.amount;
                        }
                        if (!(bop.title in acc.dabs)) {
                            acc.dabs[bop.title] = { count: 0, amount: 0};
                        }
                        acc.dabs[bop.title].count ++ ;
                        acc.dabs[bop.title].amount -= bop.amount ;


                    } else if (bop.family == 'card' && acc.topCb > bop.amount) { // amount is < 0 .
                        acc.topCb = bop.amount;
                    }
                    return acc;
                }, 
                { 'dabs': {}, 'topDab': 0, 'topCb': 0 });
                
                var topDabCount = 0;
                var topDabCountTitle = '';
                var topDabAmount = 0;
                var topDabAmountTitle = '';

                for (var k in counts.dabs) {
                    
                    if (counts.dabs[k].count > topDabCount) {
                        topDabCount = counts.dabs[k].count;
                        topDabCountTitle = k; 
                    }
                    if (counts.dabs[k].amount > topDabAmount) {
                        topDabAmount = counts.dabs[k].amount;
                        topDabAmountTitle = k; 
                    }
                }

                if (topDabCount > 0) {
                  badges.push({
                    type: "top_dab_count",
                    label: topDabCount,
                  });
                }
                if (topDabAmount > 0) {
                  badges.push({
                    type: "top_dab_accrued_amount",
                    label: topDabAmount,
                  });
                }
                if (counts.topDab < 0) {
                  badges.push({
                    type: "top_dab_amount",
                    label: - counts.topDab,
                  });
                }
                if (counts.topCb < 0) {
                  badges.push({
                    type: "top_cb",
                    label: - counts.topCb,
                  });
                }
                callback(null, badges);
            });

        },
    ],
    function(err, results) {
        var badges = [];
        for (var i=0;i<results.length;i++) {
            badges = badges.concat(results[i]);
        }

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, badges);
        }
    });
},

}
