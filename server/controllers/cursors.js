GeolocationLog = require('../models/geolocationlog');
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
        /*function(callback) {
            ReceiptDetail.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }
                
                // FROMAGE
                '200': 'BOUCHERIE',
                '260': 'CHARCUTERIE',
                '38' :'SURGELES',
                '30' :'CREMERIE LS',
                
                '10' :'FROMAGE TRAD',
                if (rdet.section == '10' && rdet.computedWeight) {

                        
                }
                // VIANDE

                // SURGELES

                // LAIT

                // VIN

                // NOURRITURE
            });
        }*/
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
