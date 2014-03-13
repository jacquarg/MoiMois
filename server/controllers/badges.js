Badge = require('../models/badge');


module.exports = Badges = {

all: function(req, res) {
    //var month = new Date().toISOString().slice(0, 7);
    var month = "2014-01";
    Badge.byMonth(month, function(err, badges) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        } else {
            res.send(200, badges);
        }
    });
},

}
