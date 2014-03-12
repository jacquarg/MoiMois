GeolocationLog = require('../models/geolocationlog');
InsuranceClaim = require('../models/insuranceclaim');
BankOperation = require('../models/bankoperation'); 
PhoneCommunicationLog = require('../models/phonecommunicationlog');
ReceiptDetail = require('../models/receiptdetail');
async = require('async');
utils = require('../models/utils');


module.exports = Badges = {

all: function(req, res) {
    Badges.byMonth(function(err, badges) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        } else {
            res.send(200, badges);
        }
    });
},
byMonth: function(callback) {
    // TODO : where start ?

    var months = utils.months();

    async.map(months,
        Badges.upToMonth,
        function(err, results) {
            // prepare result struct.
            badgesByMonth = {};
            months.forEach(function(month) {
                badgesByMonth[month] = [];
            });

            // On each month, keep only new badges.
            results.forEach(function(badges, monthIdx, allBadges) {
                badges.forEach(function(badge) {
                    var donTKeep = false;
                    for (var i=monthIdx-1;i>-1;i--) {

                        donTKeep = allBadges[i].some(function(oldBadge) {
                            if (oldBadge.type == badge.type
                                && oldBadge.value >= badge.value) {
                                return true;
                            }
                        });
                        if (donTKeep) {
                            break;    
                        }
                    }

                    if (!donTKeep) {
                        badgesByMonth[months[monthIdx]].push(badge);
                    }
                });
            });

            callback(null, badgesByMonth);
        });
},
upToMonth : function(month, callback) {

    // each function use différents part of the model, and create a badges list.
    async.parallel([
        function(callback) {
            GeolocationLog.distanceStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                var badges = [];
                // Top dist badge
                badges.push({
                    type: "top_distance",
                    label: Math.round(data.topDistance) + ' km',
                    value: data.topDistance,
                    month: month,
                });

                // Top speed
                badges.push({
                    type: "top_speed",
                    label: Math.round(data.topSpeed) + ' km/h',
                    value: data.topSpeed,
                    month: month,
                });

                // Traveled distances
                var hundreds = Math.floor(data.totalDistance / 100);
                //for (var h=1;h<=hundreds;h++) {
                    badges.push({
                        type: "traveled_distance",
                        label: hundreds + '00 km',
                        value: hundreds,
                        month: month,                        
                    });
                //}
                
                callback(null, badges);
            });
        },
        function(callback) {
            PhoneCommunicationLog.totals(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                var badges = [];
                
                // Data
                //var tens = Math.floor(data.callsDuration / (5 * 1000000000)); //(5 GB) TODO
                var tens = Math.floor(data.data / (100000000)); //(100 MB)
                //for (var h=1;h<=tens;h++) {
                    badges.push({
                        type: "data",
                        label: tens + '00 Mo',
                        value: tens,
                        month: month,                        
                    });
                //}

                // Calls duration.
                var tens = Math.floor(data.callsDuration / (5 * 60 * 60)); //(5 hours)
                //for (var h=1;h<=tens;h++) {
                    badges.push({
                        type: "calls_duration",
                        label: tens + ' H',
                        value: tens,
                        month: month,
                     });
                //}

                // Contacts called/received.
                var tens = Math.floor(data.callsContactsCount / 10);
                //for (var h=1;h<=tens;h++) {
                    badges.push({
                        type: "contacts_count",
                        label: tens + '0',
                        value: tens,
                        month: month,
                    });
                //}
                
                callback(null, badges);
            });
        },

        function(callback) {
            ReceiptDetail.sectionsTotals(month, ['10', '30'], function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                var badges = [];
                // Top fromage count
                badges.push({
                    type: "top_fromage",
                    label: Math.round(data) +  ' ème',
                    value: data,
                    month: month,
                });
                console.log(badges);
                callback(null, badges);
            });
            
        },
        function(callback) {
            Receipt.upToMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
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
                    value: max,
                    month: month,
                });
                callback(null, badges);
            });
            
        },
        function(callback) {
            InsuranceClaim.all(function(err, data) {
                if (err || data.length == 0) {
                    // Silent fail on error.
                    console.log("Error (probably no data): %j", err);
                    callback(null, []);
                    return
                }
                var badges = [];

                // Get max articles count
                var count = 0;
                data.forEach(function(item) {
                    for (var i=0;i<5;i++) {
                        count += item['axaNBSIN' + i];
                    }
                });

                // 
                badges.push({
                    type: "top_sinistres",
                    label: count,
                    value: count,
                    month: month,
                });
                callback(null, badges);
            });
        },
        // TODO auto anniversary !

        function(callback) {
            BankOperation.upToMonth(month, function(err, data) {
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
                    label: topDabCount + " retraits",
                    value: topDabCount,
                    month: month,
                  });
                }
                if (topDabAmount > 0) {
                  badges.push({
                    type: "top_dab_accrued_amount",
                    label: topDabAmount + " €",
                    value: topDabAmount,
                    month: month,
                  });
                }
                if (counts.topDab < 0) {
                  badges.push({
                    type: "top_dab_amount",
                    label: - counts.topDab + " €",
                    value: - counts.topDab,
                    month: month,
                  });
                }
                if (counts.topCb < 0) {
                  badges.push({
                    type: "top_cb",
                    label: - counts.topCb + " €",
                    value: - counts.topCb,
                    month: month,
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

        callback(null, badges);

    });
},

}
