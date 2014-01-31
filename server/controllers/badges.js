GeolocationLog = require('../models/geolocationlog');
PhoneCommunicationLog = require('../models/phonecommunicationlog');
async = require('async');


module.exports.all = function(req, res) {
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
}
