/* 
* Set the routes of your app here.
*/ 
Badges = require('./badges');
Numbers = require('./numbers');

// Test
TestModel = require('../models/phonecommunicationlog');
test = function(req, res) {
    //TestModel.test(function(err, instances) {
    TestModel.dayStats("2013-09", function(err, instances) {
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
  'badges': {
      get: Badges.all
  
  },

  'numbers': {
    get: Numbers.all        
  },
  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

