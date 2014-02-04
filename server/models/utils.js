module.exports.computeDistance = function(loc1, loc2) {
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

}

module.exports.formatPhoneNumber = function(rawNum) {
    if (!rawNum || !(typeof rawNum == 'string' || rawNum instanceof String)) {
        return rawNum;
    }

    if (rawNum.length == 11) {
        num = ("+" + rawNum.slice(0, 2)
            + "\u202F" + rawNum.slice(2, 3)
            + "\u202F" + rawNum.slice(3, 5)
            + "\u202F" + rawNum.slice(5, 7)
            + "\u202F" + rawNum.slice(7, 9)
            + "\u202F" + rawNum.slice(9, 11)
            );
        return num;
    }

    return rawNum;
};
