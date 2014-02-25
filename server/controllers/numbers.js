//GeolocationLog = require('../models/geolocationlog');
PhoneCommunicationLog = require('../models/phonecommunicationlog');
async = require('async');
utils = require('../models/utils');

module.exports.all = function(req, res) {
    // each function use différents part of the model, and create a numbers list.
    // number : 
    // {
    //    type : vc|vvc|v|vv
    //    label, 
    //    count, 
    //    count2,
    //    compareLabel 
    //    }

    this.ofMonth("2013-09", function(err, numbers) {

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, numbers);
        }
     });
};

module.exports.ofMonth = function(month, callback) {
    async.parallel([
        function(callback) {
            PhoneCommunicationLog.monthStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                // Data
                //Total calls duration.
                var hours =  Math.floor(data.callsDuration / 3600);
                var mins = Math.round((data.callsDuration / 60) % 60);
                // each 10',  + 0.1 , ie / 100 .
                var compare = Math.round(data.callsDuration / 100);
                numbers.push({
                    type: "vc",
                    label: "Votre temps d'appel",
                    count: hours + "h" + mins,
                    compareLabel: "Équivalent à " + compare + " km parcourus à pleine vitesse par Usain Bolt, champion du monde de 100m." // try U+202F as space ?
                    });
                
                // Total data
                var mo = Math.floor(data.data / 1000000); //(1 MB)
                var compare = Math.round(data.data / 1440000); // (1.44 MB
                numbers.push({
                    type: "vc",
                    label: "Votre consommation internet sur mobile",
                    count: mo + " Mo",
                    compareLabel: "Équivalent à " + compare + " disquettes." // try U+202F as space ?
                    });

                // Most called contact
                var mins = Math.round(data.mostCalledContactDuration / 60);
                var compare =  Math.round(mins / 4);// each 4'.
                var contact = utils.formatPhoneNumber(data.mostCalledContact);
                numbers.push({
                    type: "vvc",
                    label: "Le numéro le plus appelé",
                    count: contact,
                    count2: mins + " min",
                    compareLabel: "Équivalent à la cuisson de " + compare + " oeufs coques." // try U+202F as space ?
                });

                callback(null, numbers);
            });
        },
        function(callback) {
            PhoneCommunicationLog.dayStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                // Data
                //Top callsDuration day
                //var day = 

                var mins = Math.round(data.value.callsDuration / 60);
                numbers.push({
                    type: "vv",
                    label: "Votre jour le plus bavard",
                    count: data.key.join('-'),
                    count2: mins,
                    });

                callback(null, numbers);
            });
        },
    ],
    function(err, results) {
        var numbers = [];
        for (var i=0;i<results.length;i++) {
            numbers = numbers.concat(results[i]);
        }

        callback(null, numbers);
    });
}
