module.exports = ParametersModel = Backbone.Model.extend({
	url: 'parameters',
  
    parse: function(raw) {
        raw.id = raw._id;
        return raw;
    },

});

ParametersModel.fetchSingleton = function(callback) {
    $.get(ParametersModel.prototype.url, function(data) {
        callback(null, new ParametersModel(data));
    });
};

