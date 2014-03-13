async = require('async');
Cursor = require('../models/cursor');

module.exports = Cursors = {
all: function(req, res) {
    // each function use différents part of the model, and create a cursors list.
    // cursor : 
    // {
    //    minLabel,
    //    maxLabel,
    //    balance, (%)
    //    color,
    // }
    Cursors.ofMonth("2013-09", function(err, cursors) {

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, cursors);
        }
     });
},

}
