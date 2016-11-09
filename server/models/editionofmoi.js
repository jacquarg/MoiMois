var cozydb = require('cozydb');

var utils = require('./utils');
var async = require('async');

var AdData = require('./addata');
var Badge = require('./badge');
var NumberModel = require('./numbermodel');
var Cursor = require('./cursor');
var VizModel = require('./vizmodel');
var Spider = require('./spider');

var BankOperation = require('./bankoperation');

log = require('printit')({
    application: 'EditionOfMoi',
    date: true
});

module.exports = EditionOfMoi = cozydb.getModel('editionofmoi', {
    'ofMonth': String, // YYYY-MM string format.
    'displayDate': String, // mois YYYY
    'flName': String,
    'une': String,
    'number': String,
    'timestamp': Date,
    'badges': [Object],
    'numbers': [Object],
    'cursors': [Object],
    'ads': [Object],
    'viz': [Object],
    'spider': Object,
    'sent': Boolean,
    'docTypeVersion': { type: String, default: utils.appNameNVersion() },
});

EditionOfMoi.touch = function(callback) {
    var cbGen = function(reqName) {
        var startTime = Date.now();

        return function(err) {
        	if (err) { log.error(err); }
            log.info("Touch " + reqName + " in " + (Date.now() - startTime) + "ms");
        };
    };
    var cb = callback ? callback : cbGen("editionofmoi.") ;
    EditionOfMoi.all(cb);
};

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

EditionOfMoi.ofMonth = function(month, callback) {
   EditionOfMoi.request(
        "byMonth",
        {
            key: month
        },
        function(err, instances) {
            if (err) {
                callback(err, null);
            // } else if (instances.length != 1) {
            //     callback("Not the moi.", null);
            } else {
                callback(null, instances[0]);
            }
        }
    );

};

EditionOfMoi.firstMonth = function(callback) {
    async.parallel([
        BankOperation.firstMonth,
        Event.firstMonth,
    ], function(err, res) {

        var first = res.reduce(function(min, current) {
            return (current < min) ? current : min ;
        }, new Date().toISOString().slice(0, 7));
        callback(null, first);
    });
};

EditionOfMoi.all = function(callback) {
    async.parallel({
        instances: EditionOfMoi.allInDb,
        // TODO : don't rely only on bank !
        firstMonth: EditionOfMoi.firstMonth,
        adData: AdData.all,
    }, function(err, results) {
        var instances = results.instances;
        var firstMonth = results.firstMonth;
        var adData = results.adData;

        if (err) { return callback(err); }

        var allMonths = utils.months(firstMonth);
        if (instances.length == 0) {
            var lastComputed = -1;
        } else {
            var lastComputed = allMonths.indexOf(instances[instances.length - 1].ofMonth);
        }
        async.reduce(
            allMonths.slice(lastComputed + 1),
            instances,
            function(mms, month, cb) {
                log.info("Edit a Moi for month: " + month);
                EditionOfMoi._generateAMoi(month, adData, mms, function(err, mm) {
                    // Filter empty months. Add 'if (mms.length == 0 &&' to filter only first's ones
                    if (
                        mm.badges.length == 0
                        && mm.cursors.length == 0
                        && mm.numbers.length == 0
                        && mm.viz.length == 0) {
                        // skip it.
                        cb(null, mms);
                        return;
                    }

                    mm.ofMonth = month;
                    mm.displayDate = utils.displayMonth(month);
                    //mm.number = idx;
                    mm.timestamp = new Date();
                    // Une .
                    var une = "...";

                    if (mm.cursors[0]) {
                      var c = mm.cursors[0];
                      une = (c.balance < 50) ? c.minLabel : c.maxLabel;
                    }
                    if (mm.cursors[1]) {
                      var c = mm.cursors[1];
                      une += " et ";
                      une += (c.balance < 50) ? c.minLabel : c.maxLabel;
                    }

                    mm.une = une ;
                    mms.push(mm);

                    EditionOfMoi.create(mm, function(err, moi) {
                        cb(null, mms);
                    });
                });
            },
            callback
        );
    });
};

EditionOfMoi._generateAMoi = function(month, adData, previouses, callback) {
    async.parallel({
        "numbers": utils.fGen1P(month, NumberModel.ofMonth),
        "cursors": utils.fGen1P(month, Cursor.ofMonth),
        //"spiders": utils.fGen1P(month, Spider.ofMonth),
        "viz": utils.fGen1P(month, VizModel.ofMonth),

        "badges": utils.fGen1P(month, Badge.ofMonth),
        "user": cozydb.api.getCozyUser,
        },
        function(err, allOfMonth) {
            if (err) { log.error(err) };
            allOfMonth.ads = adData;
            EditionOfMoi._selectAMoi(allOfMonth, previouses, callback);
    });
};

EditionOfMoi._selectAMoi = function(allOfMonth, previouses, callback) {
    var notInPreviouses = function(thing, thingsX, tag) {
        var res = -1 ;
        for (var i=1;i<=thingsX.length;i++) {
            var things = thingsX[i-1];
            var present = things.some(function(prevThing) {
                return prevThing[tag] == thing[tag] ;
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

    var filterViz = function(mm, tag, quantity, excludeList, cmpTag) {
        if (!allOfMonth[tag]) {
            mm[tag] = [];
            return [];
        }

        if (!cmpTag) {
            cmpTag = 'origin';
        }
        var items = allOfMonth[tag].sort(function(o1, o2) {

            if (previouses.length > 0) {
                // TODO : for each previous months ?
                var olds = previouses[previouses.length - 1][tag];
                return notInPreviouses(o1, [olds, excludeList], cmpTag) - notInPreviouses(o2, [olds, excludeList], cmpTag);
            }
            return 0;
        });

        mm[tag] = items.slice(0, quantity);

        // exclude list
        return mm[tag].map(function(item) { return item[cmpTag] });
    };

    var mm = {};
    if (allOfMonth.user && allOfMonth.user.public_name) {
        mm.flName = allOfMonth.user.public_name;
    } else {
        mm.flName = "";
    }
        /*
        // Spiders
        spiders = resultsByMonth[month].spiders.sort(
            cmpPreviouses("spiders", idx, []));

        });

        moiByMonth[month].spiders = spiders.slice(0, 1);
        var spiderType = moiByMonth[month].spiders.map(function(item) { return item.type });
        */

    // Cursors
    // TODO: exception undefined ...
    var cursorsTypes = filterViz(mm, "cursors", 2, []);
    // Numbers
    filterViz(mm, "numbers", 5, cursorsTypes);
    // viz
    filterViz(mm, "viz", 2, []);

    filterViz(mm, "badges", 3, [], 'type');

    filterViz(mm, "ads", 1, [], 'type');

    callback(null, mm);
};

EditionOfMoi.reset = function(callback) {
    EditionOfMoi.requestDestroy(
        "byMonth",
        {},
        function(err) {
            log.info("All editions destroyed.");
            EditionOfMoi.all(callback);
        });
};
