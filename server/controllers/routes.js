/* 
* Set the routes of your app here.
*/ 
Badges = require('./badges')
// Test
TestModel = require('../models/geolocationlog');
test = function(req, res) {
    //TestModel.test(function(err, instances) {
    TestModel.distanceStats(function(err, instances) {
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
  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

