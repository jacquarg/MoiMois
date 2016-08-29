/*
* Set the routes of your app here.
*/

Main = require('./main');
Parameters = require('./parameters');

Badges = require('./badges');
Numbers = require('./numbers');
Cursors = require('./cursors');
Viz = require('./viz');
Mail = require('./mail');

// properties = SimpleController.extend({
//   getOrCreate: function(req, res, next) {
//     this.model.getOrCreate(next);
//   },

// });

// // Properties = new SimpleController({
// Properties = new properties({
//   model: require('../models/MoiProperties'),
//   reqProp: 'note',
//   reqParamID: 'noteid',
// });

// Properties.prototype.getOrCreate = function(req, res, next) {
//   this.model.getOrCreate(next);
// };


// Test
//TestModel = require('../models/geolocationlog');
//TestModel = require('../models/bankoperation');
test = function(req, res) {
    };
//    res.render('test_page.jade', { a: 'truc', b: 'bidule'});
//};


module.exports = {
  'parameters': {
    get: Parameters.getOrCreate,
    put: Parameters.update,
  },

  'mail/:month': {
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

