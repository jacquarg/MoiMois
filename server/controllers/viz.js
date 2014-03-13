VizModel = require('../models/vizmodel');
async = require('async');

module.exports = Viz = {
all: function(req, res) {
    // each function use différents part of the model, and create a cursors list.
    // cursor : 
    // {
    //    title,
    //    bars,
    // }
    async.map(utils.months(),
        VizModel.ofMonth,

        function(err, viz) {

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, viz);
        }
     });
},

}
