var Numbers = require('./numbers');

module.exports.main = function(req, res) {
//I. 1. checkDoctypes.
    //var activesDoctypes = checkDoctypes(cb?) ;

//II. For each month
    async.map(
    //var months = 
    ['2014-01', '2014-02'],

    //for (var i=0;i<months.length;i++) {
    //    var month = months[i];
    function(month, callback) {
    //2. Compute each values
        // 
        async.parallel({
            // badges
            "numbers": fGen1P(month, Numbers.ofMonth),
        },
    //3. Select
        function(err, results) {
            mmData = {
                "numbers": results.numbers.slice(0,5),
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
