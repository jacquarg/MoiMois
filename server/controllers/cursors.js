GeolocationLog = require('../models/geolocationlog');
PhoneCommunicationLog = require('../models/phonecommunicationlog');
async = require('async');
utils = require('../models/utils');

module.exports.all = function(req, res) {
    // each function use différents part of the model, and create a cursors list.
    // cursor : 
    // {
    //    minLabel,
    //    maxLabel,
    //    balance, (%)
    // }

    async.parallel([
        function(callback) {
            PhoneCommunicationLog.monthStats("2013-09", function(err, data) {

                var cursors = [];
                
                //Total calls duration.
                    //TODO find values !
                var value = Math.min(Math.round(data.callsDuration / (20 * 60 * 60) * 50), 100); //20h ?
                cursors.push({
                    minLabel: "muet",
                    maxLabel: "pipelette",
                    balance: value,
                });
                
                // Direction balance
                cursors.push({
                    minLabel: "récepteur",
                    maxLabel: "émetteur",
                    balance: utils.balance(data.callsIncoming, data.callsOutgoing),
                });

                // SMS / calls balance ...
                cursors.push({
                    minLabel: "scribe",
                    maxLabel: "Orateur",
                    balance: utils.balance(data.sms, data.calls),
                });

                callback(null, cursors);
            });
        },
        function(callback) {
            GeolocationLog.monthDistanceStats("2013-09", function(err, data) {
                var cursors = [];

                //Total distance.
                    //TODO find values !
                var value = Math.min(Math.round(data.totalDistance / (100) * 50), 100) ; // 100km ?

                cursors.push({
                    minLabel: "casanier",
                    maxLabel: "globetrotter",
                    balance: value,
                });

                // Speed
                    //TODO find values !
                var value = Math.min(Math.round(data.totalDistance / 50 * 50), 100) ; // 50km/h ?
                cursors.push({
                    minLabel: "tortue",
                    maxLabel: "lièvre",
                    balance: value,
                });
        
                //TODO

                callback(null, cursors);
            });
        },
    ],
    function(err, results) {
        var cursors = [];
        for (var i=0;i<results.length;i++) {
            cursors = cursors.concat(results[i]);
        }

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, cursors);
        }
    });
}
