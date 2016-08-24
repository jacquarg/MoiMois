GeolocationLog = require('./geolocationlog');
PhoneCommunicationLog = require('./phonecommunicationlog');
ReceiptDetail = require('./receiptdetail');
async = require('async');
utils = require('./utils');

module.exports = VizModel = {


ofMonth: function(month, callback) {
    async.parallel([
        function(callback) {
            PhoneCommunicationLog.weekDayStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                

                var bargraphs = [];
                
                // Week Day call durations
                bargraphs.push({
                    type: "viz_bargraph",
                    title: "Répartition de vos temps d'appel cumulés sur les jours de la semaine",
                    bars : utils.barsToPercent(data, 'sum', function(item) { 
                        return [
                            item.rangeLabel,
                            Math.round(item.sum / 60) + "'"
                               ];
                        }),
                });

                callback(null, bargraphs);
            });
        },
        function(callback) {
            GeolocationLog.monthDistanceSlices(month, function(err, data) {

                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var bargraphs = [];

                //Distance by week hours slices.
                bargraphs.push({
                    type: "viz_bargraph",
                    title: "Moyenne des km parcourus en fonction des heures de la journée",
                    bars : utils.barsToPercent(data, 'sum', function(item) {
                        return [
                            item.rangeLabel,
                            Math.round(item.sum) + "km",
                                ];
                        }),
                });


                callback(null, bargraphs);
            });
        },
         function(callback) {
            ReceiptDetail.mostBoughtProductsOfMonth(month, function(err, data) {

                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var viz = [];

                //Top 3.
                if (data.length >= 3) {
                  viz.push({
                    type: "viz_top3",
                    title: "Top 3 de vos courses",
                    bars : utils.barsToPercent(data.slice(0, 3), 'amount', function(item) {
                        return [
                            item.name,
                            "x" + item.amount,
                                ]
                        }),
                  });
                }


                //Top 5.
                if (data.length >= 5) {
                  viz.push({
                    type: "viz_top5",
                    title: "Vos articles préférés",
                    bars : utils.barsToPercent(data.slice(0, 10), 'amount', function(item) {
                        return [
                            item.name,
                            "x" + item.amount,
                                ]
                        }),
                  });
                }

                callback(null, viz);
            });
        },
        function(callback) {
            BankOperation.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                VizModel._computeBankOperations(data, callback);
            });
        },
    ],
    function(err, results) {
        var bargraphs = [];
        for (var i=0;i<results.length;i++) {
            bargraphs = bargraphs.concat(results[i]);
        }
        
        callback(null, bargraphs);
    });
},

_computeBankOperations: function(data, callback) {
    var viz = [];

    var weekData = utils.groupByWeekDays(
        data.filter(function(item) { return item.amount < 0 ; }),
        function(item) { return new Date(item.date); },
        function(item) { return  - item.amount ; }
        );
    var bargraphs = [];
    
    // Week Day debts.
    viz.push({
        type: "viz_bargraph",
        title: "Moyenne des dépenses par jour de la semaine.",
        bars : utils.barsToPercent(weekData, 'sum', function(item) { 
            return [
                item.rangeLabel,
                Math.round(item.sum) + " €"
                   ];
            }),
    });

    // Top hour cash 
    var byHours = data.reduce(function(agg, bop) {
        if (bop.operationType === 'type.withdrawal') {
            var hasHour = bop.raw.match(/(\d\d)H\d\d/);
            if (hasHour) {
                var hour = hasHour[1];
                agg[hour] = bop.amount + (agg[hour] || 0);
            }
        }
        return agg;
    }, {})

    var sortedHours = Object.keys(byHours).sort(function(a, b) {
        return (byHours[a] < byHours[b]) ? 1 : -1 ;
    });
    var bars = [
        { hour: sortedHours[0], amount: byHours[sortedHours[0]]},
        { hour: sortedHours[1], amount: byHours[sortedHours[1]]},
        { hour: sortedHours[2], amount: byHours[sortedHours[2]]},
    ];

    if (sortedHours.length >= 3) {
        viz.push({
            type: 'viz_top3',
            title: 'Top 3 des créneaux horraires de retrait',
            bars: utils.barsToPercent(bars, 'amount', function(item) {
                return [
                    item.hour + 'h - ' + (parseInt(item.hour) + 1) + 'h',
                    item.amount + '€'
                ];
            })
        });
    }
    callback(null, viz);
},

// end Viz
}
