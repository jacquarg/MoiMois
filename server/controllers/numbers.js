NumberModel = require('../models/numbermodel');

module.exports = Numbers = {

all: function(req, res) {
    // each function use différents part of the model, and create a numbers list.
    // number : 
    // {
    //    type : vc|vvc|v|vv
    //    label, 
    //    count, 
    //    count2,
    //    compareLabel 
    //    }

    Numbers.ofMonth("2013-09", function(err, numbers) {

        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, numbers);
        }
     });
},

}
