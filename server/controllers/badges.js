GeolocationLog = require('../models/geolocationlog');
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
