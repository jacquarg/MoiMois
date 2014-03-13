americano = require('americano');

module.exports = Identity = americano.getModel('identity', {
    'idMesInfos': String,
    'lastName': String,
    'firstName': String,
});

Identity.firstNLast = function(callback) {
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
                callback(null, instances[0].firstName + " " + instances[0].lastName);
            }
        }
    );
}
