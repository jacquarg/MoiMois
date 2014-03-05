var Numbers = require('./numbers');
var Cursors = require('./cursors');
var Viz = require('./viz');
var Spiders = require('./spiders');

module.exports.main = function(req, res) {
//I. 1. checkDoctypes.
    //var activesDoctypes = checkDoctypes(cb?) ;

//II. For each month
    async.map(
    //var months = 
    ['2013-09', '2013-10','2013-11', '2013-12', '2014-01', '2014-02'],

    //for (var i=0;i<months.length;i++) {
    //    var month = months[i];
    function(month, callback) {
    //2. Compute each values
        // 
        async.parallel({
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

}

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
function fGen1P(param, f) {
    return function(callback) {
        f(param, callback);
    }
}
