cozydb = require('cozydb');

log = require('printit')({ prefix: 'BankOperation', date: true});

module.exports = OperationType = cozydb.getModel('operationtype', { 
  // Display name
  name: String,
  // Weboob unique id
  weboobvalue: Number,
});

OperationType.byId = {};

OperationType.init = function() {
  OperationType.all(function(err, models) {
  	if (err) { return log.error(err); }

  	models.forEach(function(model) {
      OperationType.byId[model._id] = model.name;
  	});

  });
};

OperationType.init();