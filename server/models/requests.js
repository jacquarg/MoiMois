/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');

module.exports = {
    "geolocationlog" : {
        "deviceStateIsOn" : function(doc) {
                if (!doc.deviceState 
                    && !isNaN(doc.latitude)
                    && !isNaN(doc.longitude)) {
                    emit(doc.timestamp, doc);
                }
            }
    }
};
