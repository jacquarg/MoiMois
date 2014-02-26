GeolocationLog = require('../models/geolocationlog');
PhoneCommunicationLog = require('../models/phonecommunicationlog');
async = require('async');
utils = require('../models/utils');

module.exports.all = function(req, res) {
    // each function use différents part of the model, and create a cursors list.
    // cursor : 
    // {
    //    title,
    //    bars,
    // }

    this.ofMonth("2013-09", function(err, viz) {

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, viz);
        }
     });
};

module.exports.ofMonth = function(month, callback) {
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
                    title: "Répartition de vos temps d'appel cumulés sur les jours de la semaine",
                    bars : utils.barsToPercent(data, function(sum) { return Math.round(sum / 60) + " min"}),
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
                    title: "Moyenne des km parcourus en fonction des heures de la journée",
                    bars : utils.barsToPercent(data, function(sum) { return sum.toFixed(1) + " km"}),
                });


                callback(null, bargraphs);
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
}