async = require('async');
moment = require('moment');

utils = require('./utils');
GeoPoint = require('./geopoint');
PhoneCommunicationLog = require('./phonecommunicationlog');
// ReceiptDetail = require('./receiptdetail');
Event = require('./event');
BankOperation = require('./bankoperation');

log = require('printit')({
    application: 'EditionOfMoi',
    prefix: 'models:vizmodel',
    date: true
});

module.exports = VizModel = {

ofMonth: function(month, callback) {
    async.parallel([
        function(callback) {
            PhoneCommunicationLog.weekDayStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    log.error(err);
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
            GeoPoint.monthDistanceSlices(month, function(err, data) {

                if (err) {
                    // Silent fail on error.
                    log.error(err);
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
        //  function(callback) {
        //     ReceiptDetail.mostBoughtProductsOfMonth(month, function(err, data) {

        //         if (err) {
        //             // Silent fail on error.
        //             log.error(err);
        //             callback(null, []);
        //             return
        //         }

        //         var viz = [];

        //         //Top 3.
        //         if (data.length >= 3) {
        //           viz.push({
        //             type: "viz_top3",
        //             title: "Top 3 de vos courses",
        //             bars : utils.barsToPercent(data.slice(0, 3), 'amount', function(item) {
        //                 return [
        //                     item.name,
        //                     "x" + item.amount,
        //                         ]
        //                 }),
        //           });
        //         }


        //         //Top 5.
        //         if (data.length >= 5) {
        //           viz.push({
        //             type: "viz_top5",
        //             title: "Vos articles préférés",
        //             bars : utils.barsToPercent(data.slice(0, 10), 'amount', function(item) {
        //                 return [
        //                     item.name,
        //                     "x" + item.amount,
        //                         ]
        //                 }),
        //           });
        //         }

        //         callback(null, viz);
        //     });
        // },
        function(callback) {
            BankOperation.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    log.error(err);
                    callback(null, []);
                    return
                }

                VizModel._computeBankOperations(data, callback);
            });
        },
        function(callback) {
            Event.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    log.error(err);
                    callback(null, []);
                    return
                }

                VizModel._computeEvents(data, callback);
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
        title: "Total des dépenses par jour de la semaine.",
        bars : utils.barsToPercent(weekData, 'sum', function(item) {
            return [
                item.rangeLabel,
                Math.round(item.sum) + " €"
                   ];
            }),
        explanation: "Somme des débits, par jours de la semaine, ce mois, "
        + "sur l'ensemble des comptes bancaires configurés dans votre Cozy.",
    });

    // Top hour cash
    var byHours = data.reduce(function(agg, bop) {
        if (bop.operationType === 'type.withdrawal') {
            var hasHour = bop.raw.match(/(\d\d)H\d\d/);
            if (hasHour) {
                var hour = hasHour[1];
                agg[hour] = - bop.amount - (agg[hour] || 0);
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
                }),
            explanation: "L'heure de la journée ou vous avez retirer la plus grosse somme totale "
            + "au distributeur automatique de billets, ce mois, "
            + "sur l'ensemble des comptes bancaires configurés dans votre Cozy.",
        });
    }
    callback(null, viz);
},

_computeEvents: function(data, callback) {
    // Event.ofMonth
    var weekData = utils.groupByWeekDays(data,
        function(item) { return new Date(item.start); },
        function(item) {
            if (item.isAllDay()) { return 0; } // Omit allday events

            // Multiples days events, retain only on the first day.
            var start = moment(item.start);
            var end = moment(item.end);
            if (!start.isSame(end, 'day')) {
                end = moment(start);
                end.add(1, 'day');
                end.hours(0);
                end.minutes(0);
            }
            return (end - start) / 60 / 1000; }
        );
    var viz = [];
    viz.push({
        type: "viz_bargraph",
        title: "Total des rendez-vous par jour de la semaine.",
        bars : utils.barsToPercent(weekData, 'sum', function(item) {
            return [
                item.rangeLabel,
                Math.round(item.sum) + " min."
                   ];
            }),
        explanation: "Durée totale des évènements de ce mois, "
        + "dans l'ensemble des agendas de votre Cozy, classés par jour de la semaine. "
        + "Les évènemnets sur plusieurs jours comptent pour 24h sur le jour de début. "
    });
    callback(null, viz);
},

// end Viz
}
