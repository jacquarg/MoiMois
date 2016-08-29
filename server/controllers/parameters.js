var Parameters = require('../models/MoiParameters');

module.exports = {

getOrCreate: function(req, res) {
    Parameters.getOrCreate(function(err, parameters) {
        res.send(parameters);
    });
},

update: function(req, res) {
    Parameters.getOrCreate(function(err, parameters) {
        if (err) { return res.send(500, "While updating parameters", err); }

        parameters.updateAttributes(req.body, function(err, parameters) {
            if (err) { return res.send(500, "While updating parameters", err); }
            res.send(parameters);
        });
    });
},

};