americano = require('americano');

module.exports = CozyInstance = americano.getModel('cozyinstance', {
    'domain': String,
    'locale': String,
    'helpUrl': String,

});

CozyInstance.one = function(callback) {
    CozyInstance.request(
        "all",
        {
            limit: 1
        },
        function(err, instances) {
            if (err) {
                callback(err, null);

            } else if (instances.length != 1) {
                callback("No documents", null);
            } else {
                callback(null, instances[0]);
            }
        }
    );
}
