/* 
* Set the routes of your app here.
*/ 

// Test
TestModel = require('../models/receiptdetail');
test = function(req, res) {
    TestModel.test(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
};
//


module.exports = {
  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

