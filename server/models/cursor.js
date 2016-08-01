GeolocationLog = require('./geolocationlog');
RiskVehicle = require('./riskvehicle');
RiskHome = require('./riskhome');
BankOperation = require('./bankoperation');
PhoneCommunicationLog = require('./phonecommunicationlog');
ReceiptDetail = require('./receiptdetail');
Receipt = require('./receipt');
async = require('async');
utils = require('./utils');

module.exports = Cursor = {

ofMonth: function(month, callback) {
    async.parallel([
        function(callback) {
            PhoneCommunicationLog.monthStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
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
            GeolocationLog.monthDistanceStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
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

        function(callback) {
            ReceiptDetail.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                var cursors = [] ;
                var meat = 0 ;
                var vegetables = 0 ;
                var totalWeight = 0 ;
                data.forEach(function(rdet) {
                    if (rdet.computedWeight) {
                        totalWeight += rdet.computedWeight * rdet.amount;
                    }
                    // Viande
                    if (['28', // ? saurisserie
                        '22', '20', '26', '24', '2', '4', '6', '8'].indexOf(rdet.section) != -1
                        && rdet.computedWeight) {
                        meat += rdet.computedWeight * rdet.amount ;
                    // Légumes
                    } else if (['12', '10', '38', '30', '32', '34',
                    //'46', // ? liquides
                    '40', '42'].indexOf(rdet.section) != -1
                        && rdet.computedWeight) {
                            vegetables += rdet.computedWeight * rdet.amount ;
                    }
                });

                cursors.push({
                    origin: "intermarche",
                    minLabel: "végétarien",
                    maxLabel: "carnivore",
                    balance: utils.balance(vegetables, meat),
                    color: "Red",
                });

                cursors.push({
                    origin: "intermarche",
                    minLabel: "célibataire",
                    maxLabel: "famille nombreuse",
                    balance: Math.min(totalWeight, 100),
                    color: "Blue",
                });

                callback(null, cursors);
            });
        },
        function(callback) {
            Receipt.totalsOfMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                var cursors = [] ;

                cursors.push({
                    origin: "intermarche",
                    minLabel: "au jour le jour",
                    maxLabel: "prévoyant",
                    balance: Math.min(200 / data.receipts, 100),
                    color: "Blue",
                });

                callback(null, cursors);
            });
        },
        function(callback) {
            RiskVehicle.all(function(err, data) {
                if (err || data.length == 0) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var cursors = [];

                var powerMap = {
                    "Inc/ss permis/élec": 0,
                    "Faible": 25,
                    "Moyenne": 50,
                    "Elevée": 75,
                }
                if (data[0].power in powerMap) {

                  cursors.push({
                    origin: "axa",
                    minLabel: "pot de yaourt",
                    maxLabel: "batmobile",
                    balance: powerMap[data[0].power],
                    color: "Blue",
                  });
                }

                cursors.push({
                    origin: "axa",
                    minLabel: "conducteur à risque",
                    maxLabel: "conducteur modèle",
                    balance: data[0].axaTXBON,
                    color: "Red",
                });

                callback(null, cursors);
            });
        },
        function(callback) {
            RiskHome.all(function(err, data) {
                if (err || data.length == 0) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var cursors = [];


                cursors.push({
                    origin: "axa",
                    minLabel: "maison de poupée",
                    maxLabel: "château",
                    balance: 10 * data[0].roomCount,
                    color: "Blue",
                });
                callback(null, cursors);
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
                });

                callback(null, cursors);
            });
        },
    ],
    function(err, results) {
        var cursors = [];
        for (var i=0;i<results.length;i++) {
            cursors = cursors.concat(results[i]);
        }
        callback(null, cursors);
    });
},

}
