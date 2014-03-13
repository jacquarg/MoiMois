americano = require('americano');

var utils = require('./utils');
var async = require('async');

var Badge = require('./badge');
var NumberModel = require('./numbermodel');
var Cursor = require('./cursor');
var VizModel = require('./vizmodel');
var Spider = require('./spider');

module.exports = EditionOfMoi = americano.getModel('editionofmoi', {
    'ofMonth': String, // YYYY-MM string format.
    'number': String,
    'timestamp': Date,
    'badges': [Object],
    'numbers': [Object],
    'cursors': [Object],
    'viz': [Object],
    'spider': Object,

});

EditionOfMoi.allInDb = function(callback) {
    EditionOfMoi.request(
        "byMonth",
        {},
        function(err, instances) {
            if (err) {
                callback(err, null);
            //} else if (instances.length == 0) {
            //    callback("No moi.", null);
            } else {
                callback(null, instances);
            }
        }
    );
};

EditionOfMoi.all = function(callback) {
    EditionOfMoi.allInDb(function(err, instances) {
        if (err) {
            callback(err);
        } else {
            var allMonths = utils.months();
            if (instances.length == 0) {
                var lastComputed = -1;
            } else {
                var lastComputed = allMonths.indexOf(instances[instances.length - 1].ofMonth);
            }
            async.reduce(
                allMonths.slice(lastComputed + 1),
                instances,
                function(mms, month, cb) {
                    EditionOfMoi._generateAMoi(month, mms, function(err, mm) {
                        //Filter empty first months.
                        if (mms.length == 0 && 
                         (
                            //moiByMonth[month].badges.length == 0 &&
                            (mm.cursors.length == 0)
                            && (mm.numbers.length == 0) 
                            && (mm.viz.length == 0) )) {
                            // skip it.
                            cb(null, mms);
                            return;
                        }

                        mm.ofMonth = month;
                        //mm.number = idx;
                        mm.timestamp = new Date();
                        
                        mms.push(mm);
                        
                        EditionOfMoi.create(mm, function(err, moi) {
                            cb(null, mms);
                        }); 
                    });
                },
                callback
             );
        }   
    });
};

EditionOfMoi._generateAMoi = function(month, previouses, callback) {
    async.parallel({
        "numbers": utils.fGen1P(month, NumberModel.ofMonth),
        "cursors": utils.fGen1P(month, Cursor.ofMonth),
        //"spiders": utils.fGen1P(month, Spider.ofMonth),
        "viz": utils.fGen1P(month, VizModel.ofMonth),
        "badges": utils.fGen1P(month, Badge.ofMonth),
        },
        function(err, allOfMonth) {
            EditionOfMoi._selectAMoi(allOfMonth, previouses, callback);
    });
};

EditionOfMoi._selectAMoi = function(allOfMonth, previouses, callback) {
    var notInPreviouses = function(thing, thingsX) {
        var res = -1 ;
        for (var i=1;i<=thingsX.length;i++) {
            var things = thingsX[i-1];
            var present = things.some(function(prevThing) { 
                return prevThing.origin == thing.origin ;
            });

            res = present ? i : res ;
        }

        return res;
    };
        
    /*var cmpPreviouses = function(tag, idx, excludeList) {
        return function(o1, o2) {
        if (idx > 0) {
            var olds = moiByMonth[months[idx - 1]][tag];
            return notInPreviouses(o1, [olds, excludeList]) - sameType(o2, [olds, excludeList]);
        }
        return 0;
        
    }}*/

    var filterViz = function(mm, tag, quantity, excludeList) {
        var items = allOfMonth[tag].sort(function(o1, o2) {
            
            if (previouses.length > 0) {
                // TODO : for each previous months ?
                var olds = previouses[previouses.length - 1][tag];
                return notInPreviouses(o1, [olds, excludeList]) - notInPreviouses(o2, [olds, excludeList]);
            }
            return 0;
        });
        
        mm[tag] = items.slice(0, quantity);
        
        // exclude list
        return mm[tag].map(function(item) { return item.origin });
    };
    
    var mm = {};
        /*
        // Spiders
        spiders = resultsByMonth[month].spiders.sort(
            cmpPreviouses("spiders", idx, []));

        });

        moiByMonth[month].spiders = spiders.slice(0, 1);
        var spiderType = moiByMonth[month].spiders.map(function(item) { return item.type });
        */

    // Cursors
    var cursorsTypes = filterViz(mm, "cursors", 2, []);
    // Numbers
    filterViz(mm, "numbers", 5, cursorsTypes);
    // viz
    filterViz(mm, "viz", 2, []);
    
    filterViz(mm, "badges", 3, []);

    callback(null, mm); 
};
