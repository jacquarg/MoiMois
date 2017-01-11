async = require('async');
moment = require('moment-timezone');
utils = require('./utils');

GeoPoint = require('./geopoint');
//RiskVehicle = require('./riskvehicle');
//RiskHome = require('./riskhome');
BankOperation = require('./bankoperation');
PhoneCommunicationLog = require('./phonecommunicationlog');
//ReceiptDetail = require('./receiptdetail');
//Receipt = require('./receipt');
Event = require('./event');


log = require('printit')({
    application: 'EditionOfMoi',
    prefix: 'models:cursor',
    date: true
});


module.exports = Cursor = {

ofMonth: function(month, cb) {
    async.parallel([
        function(callback) {
            PhoneCommunicationLog.monthStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    log.error(err);
                    callback(null, []);
                    return
                }
                var cursors = [];

                //Total calls duration.
                    //TODO find values !
                var value = Math.min(Math.round(data.callsDuration / (20 * 60 * 60) * 50), 100); //20h ?
                cursors.push({
                    origin: "orange",
                    minLabel: "muet",
                    maxLabel: "pipelette",
                    balance: value,
                    color: "Red",
                });

                // Direction balance
                cursors.push({
                    origin: "orange",
                    minLabel: "récepteur",
                    maxLabel: "émetteur",
                    balance: utils.balance(data.callsIncoming, data.callsOutgoing),
                    color: "Blue",
                });

                // SMS / calls balance ...
                cursors.push({
                    origin: "orange",
                    minLabel: "scribe",
                    maxLabel: "Orateur",
                    balance: utils.balance(data.sms, data.calls),
                    color: "Blue",
                });

                callback(null, cursors);
            });
        },
        function(callback) {
            GeoPoint.monthDistanceStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    log.error(err);
                    callback(null, []);
                    return
                }

                var cursors = [];

                //Total distance.
                    //TODO find values !
                var value = Math.min(Math.round(data.totalDistance / (100) * 50), 100) ; // 100km ?

                cursors.push({
                    origin: "orange",
                    minLabel: "casanier",
                    maxLabel: "globetrotter",
                    balance: value,
                    color: "Blue",
                });

                // Speed
                    //TODO find values !
                var value = Math.min(Math.round(data.totalDistance / 50 * 50), 100) ; // 50km/h ?
                cursors.push({
                    origin: "orange",
                    minLabel: "tortue",
                    maxLabel: "lièvre",
                    balance: value,
                    color: "Red",
                });

                //TODO

                callback(null, cursors);
            });
        },

        // function(callback) {
        //     ReceiptDetail.ofMonth(month, function(err, data) {
        //         if (err) {
        //             // Silent fail on error.
        //             log.error(err);
        //             callback(null, []);
        //             return
        //         }
        //         var cursors = [] ;
        //         var meat = 0 ;
        //         var vegetables = 0 ;
        //         var totalWeight = 0 ;
        //         data.forEach(function(rdet) {
        //             if (rdet.computedWeight) {
        //                 totalWeight += rdet.computedWeight * rdet.amount;
        //             }
        //             // Viande
        //             if (['28', // ? saurisserie
        //                 '22', '20', '26', '24', '2', '4', '6', '8'].indexOf(rdet.section) != -1
        //                 && rdet.computedWeight) {
        //                 meat += rdet.computedWeight * rdet.amount ;
        //             // Légumes
        //             } else if (['12', '10', '38', '30', '32', '34',
        //             //'46', // ? liquides
        //             '40', '42'].indexOf(rdet.section) != -1
        //                 && rdet.computedWeight) {
        //                     vegetables += rdet.computedWeight * rdet.amount ;
        //             }
        //         });

        //         cursors.push({
        //             origin: "intermarche",
        //             minLabel: "végétarien",
        //             maxLabel: "carnivore",
        //             balance: utils.balance(vegetables, meat),
        //             color: "Red",
        //         });

        //         cursors.push({
        //             origin: "intermarche",
        //             minLabel: "célibataire",
        //             maxLabel: "famille nombreuse",
        //             balance: Math.min(totalWeight, 100),
        //             color: "Blue",
        //         });

        //         callback(null, cursors);
        //     });
        // },
        // function(callback) {
        //     Receipt.totalsOfMonth(month, function(err, data) {
        //         if (err) {
        //             // Silent fail on error.
        //             log.error(err);
        //             callback(null, []);
        //             return
        //         }
        //         var cursors = [] ;

        //         cursors.push({
        //             origin: "intermarche",
        //             minLabel: "au jour le jour",
        //             maxLabel: "prévoyant",
        //             balance: Math.min(200 / data.receipts, 100),
        //             color: "Blue",
        //         });

        //         callback(null, cursors);
        //     });
        // },
        // function(callback) {
        //     RiskVehicle.all(function(err, data) {
        //         if (err || data.length == 0) {
        //             // Silent fail on error.
        //             log.error(err);
        //             callback(null, []);
        //             return
        //         }

        //         var cursors = [];

        //         var powerMap = {
        //             "Inc/ss permis/élec": 0,
        //             "Faible": 25,
        //             "Moyenne": 50,
        //             "Elevée": 75,
        //         }
        //         if (data[0].power in powerMap) {

        //           cursors.push({
        //             origin: "axa",
        //             minLabel: "pot de yaourt",
        //             maxLabel: "batmobile",
        //             balance: powerMap[data[0].power],
        //             color: "Blue",
        //           });
        //         }

        //         cursors.push({
        //             origin: "axa",
        //             minLabel: "conducteur à risque",
        //             maxLabel: "conducteur modèle",
        //             balance: data[0].axaTXBON,
        //             color: "Red",
        //         });

        //         callback(null, cursors);
        //     });
        // },
        // function(callback) {
        //     RiskHome.all(function(err, data) {
        //         if (err || data.length == 0) {
        //             // Silent fail on error.
        //             log.error(err);
        //             callback(null, []);
        //             return
        //         }

        //         var cursors = [];


        //         cursors.push({
        //             origin: "axa",
        //             minLabel: "maison de poupée",
        //             maxLabel: "château",
        //             balance: 10 * data[0].roomCount,
        //             color: "Blue",
        //         });
        //         callback(null, cursors);
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
                var cursors = [];

                var debcred = data.reduce(function(acc, bop) {
                    if (bop.amount > 0) {
                        acc.credits += bop.amount;
                    } else {
                        acc.debits -= bop.amount;
                    }
                    return acc;
                },
                { debits: 0, credits: 0 });
                cursors.push({
                    origin: "bank",
                    minLabel: "épargnant",
                    maxLabel: "dépensier",
                    balance: utils.balance(debcred.credits, debcred.debits),
                    color: "Red",
                    explanation: "Rapport entre l'ensemble des crédits et débits du mois, "
                        + "sur l'ensemble des comptes bancaires configurés dans votre Cozy.",
                });

                callback(null, cursors);
            });
        },
        function(callback) {
            Event.ofMonth(month, function(err, data) {
                if (err) {
                    log.error(err);
                    return callback(null, []);     // Silent fail on error.
                }
                Cursor._computeEvents(data, callback);
            });
        },
    ],
    function(err, results) {
        var cursors = [];
        for (var i=0;i<results.length;i++) {
            cursors = cursors.concat(results[i]);
        }
        cb(null, cursors);
    });
},

_computeEvents: function(events, callback) {
    var cursors = [];

    // Routinier / Aventureux
    var recurrentCount = 0, punctualCount = 0;
    events.forEach(function(event) {
        if (event.isRecurrent()) {
            recurrentCount++;
        } else {
            punctualCount++;
        }
    });
    cursors.push({
        origin: "event",
        minLabel: "routinier",
        maxLabel: "aventureux",
        balance: utils.balance(recurrentCount, punctualCount),
        color: "Red",
        explanation: "Le rapport entre le nombre d'évènement récurrents et d'évènements ponctuels "
        + "ce mois, dans l'ensemble des agendas de votre Cozy."
    });

    // Poule Fétard
    var earlyCount = 0;
    var lateCount = 0;

    events.forEach(function(event) {

        var start = moment(event.start);
        start.tz(utils.cozyTimezone);

        if (start.hours() > 7 && start.hours() < 18) {
            earlyCount++;
        } else {
            lateCount++ ;
        }
    });
    cursors.push({
        origin: "event",
        minLabel: "poule",
        maxLabel: "fétard",
        balance: utils.balance(earlyCount, lateCount),
        color: "Red",
        explanation: "Rapport en le nombre de rendez-vous entre 7h et 19h (poule), et ceux plus "
        + "nocturnes (fétard), ce mois, dans l'ensemble des agendas de votre Cozy."
    });

    callback(null, cursors);
},

}
