Badge = require('../models/badge');


module.exports = Badges = {

all: function(req, res) {
    Badge.byMonth(function(err, badges) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        } else {
            res.send(200, badges);
        }
    });
},

}
