americano = require('americano');

module.exports = GeolocationLog = americano.getModel('geolocationlog', {
    'origin': String,
    'idMesInfos': String,
    'timestamp': Date,
    'latitude': Number,
    'longitude': Number,
    'radius': Number,
    'msisdn': String,
    'deviceState': { 'type': String, 'default': null },
    'snippet': String
});

/*
GeolocationLog.hasDocs = function(callback) {
    var params = {
        limit: 1,
        reduce: false
    };

    GeolocationLog.rawRequest("deviceStateIsOn", params, 
        function(err, data) {
            if (err || !data || data.length == 0) {
                callback(null, false);
            } else {
                callback(null, true);
            }
        }
    );
}; */

// TODO unit test.
GeolocationLog.computeDistance = function(loc1, loc2) {
    // From http://integraledesmaths.free.fr/idm/PagePrincipale.htm#http://integraledesmaths.free.fr/idm/GeoAEDistSph.htm .

    var R = 6374.892; // earth radius, kilometter. 
    
    var lat1 = loc1.latitude * Math.PI / 180 ;  // latitude delta, in radian. 
    var lat2 = loc2.latitude * Math.PI / 180 ;

    var dLon = (loc2.longitude - loc1.longitude) * Math.PI / 180;  // longitude delta, in radian. 

    var r1 = Math.sin(lat1) * Math.sin(lat2) 
    + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon) ;
    // Approximations may brake arccos definition's domain.
    r1 = Math.min(1, r1);
    r1 = Math.max(-1, r1);

    var d = R * Math.acos(r1) 


/*    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; */
    //return Math.round(d);

    if (isNaN(d)) {
        console.log(Math.sin(lat1) * Math.sin(lat2) 
    + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon));
    }
    return d;

};

GeolocationLog._computeDistances = function(err, locs, callback) {
    res = {
        topDistance: 0,
        topSpeed: 0,
        totalDistance: 0,
    }
    if (err) {
        callback(err, res);

    } else if (locs.length <= 1) {
        callback("Only one points", res);
    } else {
        var loc1 = locs[0];
        for (var i=1; i<locs.length; i++) {
            var loc2 = locs[i];

            // 15' betwen the two points ? (+- 10%)

            var timeDelta = loc2.timestamp.getTime() - loc1.timestamp.getTime();

            areSuccessivePoints = 
                15 * 60 * 1000 * (1 - 0.1) < timeDelta 
                && 
                15 * 60 * 1000 * (1 + 0.1) > timeDelta ;
            // Compute distance between points.
            d = GeolocationLog.computeDistance(loc1, loc2);
            if (isNaN(d)) {
                console.log(d);
                console.log(loc1);
                console.log(loc2);
            }
            res.totalDistance += d ;

            if (areSuccessivePoints) {
                if (res.topDistance < d) {
                    res.topDistance = d;

                    res.topSpeed = d * 4 ; //  km/(1/4h) --> km/h .
                }
            }

            loc1 = loc2;
        }
        callback(null, res);
    }
};

GeolocationLog.monthDistanceStats = function(month, callback) {
    GeolocationLog.request(
        "deviceStateIsOn",
        {
          startkey: [month, null],
          endkey: [month, {}]
        },
        function(err, locs) {
            GeolocationLog._computeDistances(err, locs, callback);
        }
    );
};

GeolocationLog.monthDistanceSlices = function(month, callback) {
    GeolocationLog.request(
        "deviceStateIsOn",
        {
          startkey: [month, null],
          endkey: [month, {}]
        },
function(err, locs) {
    res = {
    //    topDistance: 0,
    //    topSpeed: 0,
    //    totalDistance: 0,
   
    }
    if (err) {
        callback(err, res);

    } else if (locs.length <= 1) {
        callback("Only one points", res);

    } else {
        var loc1 = locs[0];
        var slices = [];
        for (var i = 0; i < 12; i++) slices[i] = 0;

        for (var i=1; i<locs.length; i++) {
            var loc2 = locs[i];

            // 15' betwen the two points ? (+- 10%)

            var timeDelta = loc2.timestamp.getTime() - loc1.timestamp.getTime();

            areSuccessivePoints = 
                15 * 60 * 1000 * (1 - 0.1) < timeDelta 
                && 
                15 * 60 * 1000 * (1 + 0.1) > timeDelta ;
            
            if (areSuccessivePoints) {
                //slice by pair hours.
                var hIdx = Math.floor(parseInt(loc1.timestamp.toISOString().slice(11, 13)) / 2) ;
                d = GeolocationLog.computeDistance(loc1, loc2);
                
                slices[hIdx] += d;
            }

            loc1 = loc2;
        }
        //console.log(slices);
        res =  [
            { rangeLabel: "8h-10h", sum: slices[4],  },
            { rangeLabel: "10h-12h", sum: slices[5],  },
            { rangeLabel: "12h-14h", sum: slices[6],  },
            { rangeLabel: "14h-16h", sum: slices[7],  },
            { rangeLabel: "16h-18h", sum: slices[8],  },
            { rangeLabel: "18h-20h", sum: slices[9],  },
            { rangeLabel: "20h-22h", sum: slices[10],  },
            { rangeLabel: "22h-2h", sum: slices[11] + slices[0],  },
            { rangeLabel: "6h-8h", sum: slices[2] + slices[3],  },
            
        ]

        callback(null, res);
    }
        }
    );
};

GeolocationLog.distanceStats = function(callback) {
    GeolocationLog.request(
        "deviceStateIsOn",
        {},
/*        function(err, locs) {
            res = {
                topDistance: 0,
                topSpeed: 0,
                totalDistance: 0,
            }
            if (err) {
                callback(err, res);
            
            } else if (locs.length <= 1) {
                callback("Only one points", res);
            } else {
                var loc1 = locs[0];
                for (var i=1; i<locs.length; i++) {
                    var loc2 = locs[i];
                    
                    // 15' betwwen the two points ? (+- 10%)

                    var timeDelta = loc2.timestamp.getTime() - loc1.timestamp.getTime();
                    
                    areSuccessivePoints = 
                        15 * 60 * 1000 * (1 - 0.1) < timeDelta 
                        && 
                        15 * 60 * 1000 * (1 + 0.1) > timeDelta ;
                    // Compute distance between points.
                    d = GeolocationLog.computeDistance(loc1, loc2);
                    if (isNaN(d)) {
                        console.log(d);
                        console.log(loc1);
                        console.log(loc2);
                        }
                    res.totalDistance += d ;
                    
                    if (areSuccessivePoints) {
                        if (res.topDistance < d) {
                            res.topDistance = d;

                            res.topSpeed = d * 4 ; //  km/(1/4h) --> km/h .
                        }
                    }

                    loc1 = loc2;
                }
                callback(null, res);
            }
        }*/
        function(err, locs) {
            GeolocationLog._computeDistances(err, locs, callback);
            }
        );
};
