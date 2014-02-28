GeolocationLog = require('../models/geolocationlog');
RiskVehicle = require('../models/riskvehicle');
RiskHome = require('../models/riskhome');
BankOperation = require('../models/bankoperation');
PhoneCommunicationLog = require('../models/phonecommunicationlog');
ReceiptDetail = require('../models/receiptdetail');
async = require('async');
utils = require('../models/utils');

module.exports = Cursors = {
all: function(req, res) {
    // each function use différents part of the model, and create a cursors list.
    // cursor : 
    // {
    //    minLabel,
    //    maxLabel,
    //    balance, (%)
    //    color,
    // }
    Cursors.ofMonth("2013-09", function(err, cursors) {

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, cursors);
        }
     });
},

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
                    minLabel: "muet",
                    maxLabel: "pipelette",
                    balance: value,
                    color: "Red",
                });
                
                // Direction balance
                cursors.push({
                    minLabel: "récepteur",
                    maxLabel: "émetteur",
                    balance: utils.balance(data.callsIncoming, data.callsOutgoing),
                    color: "Blue",
                });

                // SMS / calls balance ...
                cursors.push({
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
                    minLabel: "casanier",
                    maxLabel: "globetrotter",
                    balance: value,
                    color: "Blue",
                });

                // Speed
                    //TODO find values !
                var value = Math.min(Math.round(data.totalDistance / 50 * 50), 100) ; // 50km/h ?
                cursors.push({
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

                console.log(vegetables, meat);

                cursors.push({
                    minLabel: "végétarien",
                    maxLabel: "carnivore",
                    balance: utils.balance(vegetables, meat),
                    color: "Red",
                });

                cursors.push({
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
                    minLabel: "pot de yaourt",
                    maxLabel: "batmobile",
                    balance: powerMap[data[0].power],
                    color: "Blue",
                  });
                }

                cursors.push({
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
