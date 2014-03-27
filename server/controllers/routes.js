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
    };
//    res.render('test_page.jade', { a: 'truc', b: 'bidule'});
//};


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
    
  'reset': {
    post: Main.reset
  },


  'test': {
    get: test
  },

//  'touch': {
//      get: Persons.touch
//  },

};

