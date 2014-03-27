//var Numbers = require('./numbers');
//var Cursors = require('./cursors');
//var Viz = require('./viz');
//var Spiders = require('./spiders');
var EditionOfMoi = require('../models/editionofmoi');

module.exports = Main = {

main: function(req, res) {
    EditionOfMoi.all(function(err, l) {
            res.send(l);
        }
    );
},

reset: function(req, res) {
    EditionOfMoi.reset(function(err, l) {
        res.send(l);
    });
},

}

    /*async.parallel([ 
        Main.badges,
        Main.scns,
        ],
        function(err, results) {
            var moiByMonth = results[1];
            var l = utils.months().map(function(month) {
                moiByMonth[month].moimois = { 
                    date : month,
                    userName: "John Doe"
                };

                moiByMonth[month].badges = results[0][month];
                return moiByMonth[month];
            }); */

/*
//I. 1. checkDoctypes.
    //var activesDoctypes = checkDoctypes(cb?) ;
        //TODO meilleur imbrication.
        Main.badges(function(err, badges) {
//II. For each month
    async.map(
        utils.months(),
//    ['2013-09', '2013-10','2013-11', '2013-12', '2014-01', '2014-02'],
    //for (var i=0;i<months.length;i++) {
    //    var month = months[i];
    function(month, callback) {
    //2. Compute each values
        // 
        async.parallel({
            "badges": function(callback) {

                callback(null, badges[month]);
            },
            "numbers": fGen1P(month, Numbers.ofMonth),
            "cursors": fGen1P(month, Cursors.ofMonth),
            "viz": fGen1P(month, Viz.ofMonth),
            //"spiders": fGen1P(month, Spiders.ofMonth),
        },
    //3. Select
        function(err, results) {
            mmData = {
                "moimois": { 
                    date : month,
                    userName: "John Doe"
                    },
                "badges": results.badges,
                "numbers": results.numbers.slice(0,5),
                "cursors": results.cursors.slice(0,2),
                "viz": results.viz.slice(0,2),
                //"numbers": results.numbers.slice(0,5),
                //
            }
            callback(null, mmData);
        });
    },
    function(err, results) {
// III. Send to display .
        res.send(200, results);
    });
    });
},
/*allList: function(callback) {
    EditionOfMoi.all(callback);
    /*Main.all(function(err, moiByMonth) {
        var months = Object.keys(moiByMonth).sort();
        var l = months.map(function(month) { return moiByMonth[month];    });
        callback(null, l);
    });
//},

all: function(callback) {
    Main.allList(function(err, instances) {
        var moisByMonth = {};

        instances.forEach(function(item){ moisByMonth[item.ofMonth] = item });
        callback(err, moisByMonth);
    });
},

allList: function(callback) {
    EditionOfMoi.all(function(err, instances) {
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
                    Main.generateAMoi(month, mms, function(err, mm) {
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
},

generateAll: function(callback) {
    async.parallel([ 
        Main.badges,
        Main.scns,
        ],
        function(err, results) {
            var moiByMonth = results[1];
            var l = [];
            var dataStarted = false;
            utils.months().forEach(function(month, idx) {
            //var l = utils.months().map(function(month) {
                if (!dataStarted && 
                    (
                    //moiByMonth[month].badges.length == 0 &&
                    (moiByMonth[month].cursors.length == 0)
                    && (moiByMonth[month].numbers.length == 0) 
                    && (moiByMonth[month].viz.length == 0) )) {
                    delete moiByMonth[month];
                    return;
                }
                dataStarted = true;

                //moiByMonth[month].moimois = { 
                //    date : month,
                //    userName: "John Doe"
                //};
                moiByMonth[month].ofMonth = month;
                moiByMonth[month].number = idx;
                moiByMonth[month].timestamp = new Date();

                moiByMonth[month].badges = results[0][month];
            });

            var mois = [];
            for (var k in moiByMonth) {
                mois.push(moiByMonth[k]);
            }
            async.map(mois,
                EditionOfMoi.create,
                callback);
    });
},



generateAll: function(callback) {
    Main.all(function(err, moiByMonth) {
        for (var k in moiByMonth) {
            EditionOfMoi.create(moiByMonth[k], function(err, instance) { console.log("Created, err?:" + err);});
        }
    });
    callback(null, null);
},



badges: function(callback) {
    var sameBadgeInPrevious = function(badge, oldBadges) {
        
        var same = oldBadges.some(function(prevBadge) { 
            return prevBadge.type == badge.type ;
            });
        return same ? 1 : -1;
    };


    Badges.byMonth(function(err, badgesByMonth) {
        var months = utils.months();

        var top3ByMonth = {};
        months.forEach(function(month) { top3ByMonth[month] = []; });
        
        months.forEach(function(month, idx) {
            badges = badgesByMonth[month].sort(function(b1, b2) {
                if (idx > 0) {
                    var oldBadges = top3ByMonth[months[idx - 1]];
                    return sameBadgeInPrevious(b1, oldBadges) - sameBadgeInPrevious(b2, oldBadges);

                }
                return 0;
            });

            top3ByMonth[month] = badges.slice(0, 3);    
        });

        callback(null, top3ByMonth);
    });
},

generateAMoi : function(month, previouses, callback) {
    async.parallel({
        "numbers": fGen1P(month, Numbers.ofMonth),
        "cursors": fGen1P(month, Cursors.ofMonth),
        //"spiders": fGen1P(month, Spiders.ofMonth),
        "viz": fGen1P(month, Viz.ofMonth),
        "badges": fGen1P(month, Badges.ofMonth),
        },
        function(err, allOfMonth) {
            Main.selectAMoi(allOfMonth, previouses, callback);
    });
},

selectAMoi: function(allOfMonth, previouses, callback) {
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
        
    //var cmpPreviouses = function(tag, idx, excludeList) {
    //    return function(o1, o2) {
    //    if (idx > 0) {
    //        var olds = moiByMonth[months[idx - 1]][tag];
    //        return notInPreviouses(o1, [olds, excludeList]) - sameType(o2, [olds, excludeList]);
    //    }
    //    return 0;
    //    
    //}}

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
        
        //// Spiders
        //spiders = resultsByMonth[month].spiders.sort(
        //   cmpPreviouses("spiders", idx, []));

        //});

        //moiByMonth[month].spiders = spiders.slice(0, 1);
        //var spiderType = moiByMonth[month].spiders.map(function(item) { return item.type });
        

    // Cursors
    var cursorsTypes = filterViz(mm, "cursors", 2, []);
    // Numbers
    filterViz(mm, "numbers", 5, cursorsTypes);
    // viz
    filterViz(mm, "viz", 2, []);
    
    filterViz(mm, "badges", 3, []);



    callback(null, mm); 
},

scns : function(callback) {
    Main.scnByMonth(function(err, instances) {
        Main.selectSCN(err, instances, callback);
    });
},

scnByMonth: function(callback) {
    async.map(
      utils.months(),
      function(month, cb) {
    //2. Compute each values
        // 
        async.parallel({
            "numbers": fGen1P(month, Numbers.ofMonth),
            "cursors": fGen1P(month, Cursors.ofMonth),
            //"spiders": fGen1P(month, Spiders.ofMonth),
            "viz": fGen1P(month, Viz.ofMonth),
        },
    //3. Select
        cb
        );
      },
      callback
    );
},
selectSCN: function(err, resultsByMonth, callback) {
    // 1 choix spider : différent du précédent
    var months = utils.months();

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
    
    //var cmpPreviouses = function(tag, idx, excludeList) {
    //    return function(o1, o2) {
    //    if (idx > 0) {
    //        var olds = moiByMonth[months[idx - 1]][tag];
    //        return notInPreviouses(o1, [olds, excludeList]) - sameType(o2, [olds, excludeList]);
    //    }
    //    return 0;
    //    
    //}}

    var filterViz = function(tag, quantity, month, idx, excludeList) {
        // Cursors
        var items = resultsByMonth[idx][tag].sort(function(o1, o2) {
            if (idx > 0) {
                // TODO : for each previous months ?
                var olds = moiByMonth[months[idx - 1]][tag];
                return notInPreviouses(o1, [olds, excludeList]) - notInPreviouses(o2, [olds, excludeList]);
            }
            return 0;
        });

        moiByMonth[month][tag] = items.slice(0, quantity);
        
        // exclude list
        return moiByMonth[month][tag].map(function(item) { return item.origin });
    };
    
    var moiByMonth = {};
    months.forEach(function(month) { moiByMonth[month] = {}; });
        
    months.forEach(function(month, idx) {
        // Spiders
        //spiders = resultsByMonth[month].spiders.sort(
        //    cmpPreviouses("spiders", idx, []));

        //});

        //moiByMonth[month].spiders = spiders.slice(0, 1);
        //var spiderType = moiByMonth[month].spiders.map(function(item) { return item.type });
        

        // Cursors
        var cursorsTypes = filterViz("cursors", 2, month, idx, []);

        // Numbers
        filterViz("numbers", 5, month, idx, cursorsTypes);
        
        // viz
        filterViz("viz", 2, month, idx, []);

    });

        callback(null, moiByMonth); 
},
/*
//module.exports.checkDoctypes = function(callback) {
function checkDoctypes(callback) {

    async.parallel({
    // Privowny


    // Orange
        "geolocationlog" : GeolocationLog.hasDocs, // une part doctype : api : <=> "exists" .
//        "phonecommunicationlog" : PhoneCommunicationLog.hasDocs,
    
    // Banques


    // Axa


    // Intermarche

    },

    callback
    );
};
}
function fGen1P(param, f) {
    return function(callback) {
        f(param, callback);
    }
}
*/
