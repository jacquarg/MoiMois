var cozydb = require('cozydb');


var utils = require('./utils');

log = require('printit')({
    application: 'EditionOfMoi',
    prefx: 'models:moiparameters',
    date: true,
});

module.exports = MoiParameters = cozydb.getModel('MoiParameters', {
    sendMail: { type: Boolean, default: true },
    excludedOrigin: [String],
    docTypeVersion: { type: String, default: utils.appNameNVersion() },

});


MoiParameters.getOrCreate = function(callback) {
    MoiParameters.first(function(err, model) {
        if (model) { return callback(null, model); }

        MoiParameters.create(new MoiParameters(), callback);
    });
};

MoiParameters.sendMailActivated = function(callback) {
    MoiParameters.first(function(err, model) {
        if (model) {
            return callback(null, model.sendMail);
        } else {
            callback(null, false);
        }
    });
};
