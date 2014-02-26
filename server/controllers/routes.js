/* 
* Set the routes of your app here.
*/ 
Main = require('./main');

Badges = require('./badges');
Numbers = require('./numbers');
Cursors = require('./cursors');
Viz = require('./viz');

// Test
//TestModel = require('../models/geolocationlog');
TestModel = require('../models/receiptdetail');
test = function(req, res) {
    //TestModel.test(function(err, instances) {
    TestModel.ofMonth("2014-02", function(err, instances) {
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
  'mms': {
      get: Main.main
  },

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
    get: Viz.all        
  },



  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

