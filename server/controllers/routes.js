/* 
* Set the routes of your app here.
*/ 
Badges = require('./badges');
Numbers = require('./numbers');
Cursors = require('./cursors');
Bargraphs = require('./bargraphs');

// Test
TestModel = require('../models/geolocationlog');
test = function(req, res) {
    //TestModel.test(function(err, instances) {
    TestModel.monthDistanceSlices("2014-01", function(err, instances) {
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

  'cursors': {
    get: Cursors.all        
  },

  'bargraphs': {
    get: Bargraphs.all        
  },



  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

