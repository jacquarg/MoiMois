/* 
* Set the routes of your app here.
*/ 
Main = require('./main');

Badges = require('./badges');
Numbers = require('./numbers');
Cursors = require('./cursors');
Viz = require('./viz');
Mail = require('./mail');

// Test
//TestModel = require('../models/geolocationlog');
//TestModel = require('../models/bankoperation');
test = function(req, res) {
        Main.generateAll(
    //TestModel.test(function(err, instances) {
//    Mail.send(
//        function(err, instances) {
//            //Main.selectSCN(err, instances, 
//        
        function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
//        });
};
//


module.exports = {
  'mail': {
    get: Mail.mail
  },
  ':month/sendmail': {
    get: Mail.sendReportReq   
  },
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

  'viz': {
    get: Viz.all        
  },



  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

