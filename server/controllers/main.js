var Numbers = require('./numbers');
var Cursors = require('./cursors');
var Viz = require('./viz');
var Spiders = require('./spiders');

module.exports = Main = {

main: function(req, res) {
//I. 1. checkDoctypes.
    //var activesDoctypes = checkDoctypes(cb?) ;
        //TODO meilleur imbrication.
        Main.badges(function(err, badges) {
        console.log(badges);
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
*/
}
function fGen1P(param, f) {
    return function(callback) {
        f(param, callback);
    }
}
