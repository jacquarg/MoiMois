var moment = require('moment');

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

// Return amortized value of
// right / left -> [0, 2] (0 -> 100)
// with right = left => 1.
// left and right in [0, +infinity[ .
module.exports.balance = function(left, right) {
//TODO find better function ! it is bad...
    //var tanh = function(arg) {
    //// sinh(number)/cosh(number)
    //    return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
    //};

    var rawBal = right / left;
    //var value = (rawBal <= 1) ? Math.sqrt(rawBal) : tanh(rawBal) + 1 ;
    var value = (rawBal <= 1) ? Math.sqrt(rawBal) :  (2 - 1 / rawBal) ;

    return value * 50;
}

module.exports.barsToPercent = function(data, fieldName, labLambda) {
    if (data.length <= 1) {
        console.log("To short");
        return data;
    }
    // Get max
    var max = data[0][fieldName];
    //for (var i=1;i<data.length;i++) {
    for (var i=1;i<data.length;i++) {
        if (data[i][fieldName] > max) {
            max = data[i][fieldName];
        }
    }

    var res = data.map(function(item) {
        var resIt = {};
        resIt["percent"] = item[fieldName] / max * 100 ;
        var labs = labLambda(item);
        resIt["label"] = labs[0];
        resIt["valueLabel"] = labs[1];
        return resIt;
    });

    return res;
};

module.exports.groupByWeekDays = function(data, getDate, getValue) {
    // week days calls durations.
    var slices = [];
    for (var i = 0; i < 7; i++) slices[i] = 0;

    //Most calledDuration day.
    //var max = kv[0];
    data.forEach(function(item) {

        var day = getDate(item).getDay();
        var v = getValue(item);

        slices[day] += v ;
    });
    // TODO : balance days. ?
    res = [
        { rangeLabel: "lundi", sum: slices[1], },
        { rangeLabel: "mardi", sum: slices[2], },
        { rangeLabel: "mercredi", sum: slices[3], },
        { rangeLabel: "jeudi", sum: slices[4], },
        { rangeLabel: "vendredi", sum: slices[5], },
        { rangeLabel: "samedi", sum: slices[6], },
        { rangeLabel: "dimanche", sum: slices[0], },
    ] ;

    return res ;
};

module.exports.months = function(firstMonth) {
    firstMonth = firstMonth || "2016-01";
    // firstMonth = '2016-01';

    var now = moment().startOf('month');
    var months = [];

    for (month = moment(firstMonth);
         month < now ;
         month.add(1, 'month')) {
        months.push(month.format("YYYY-MM"));
    }

    return months;
}

module.exports.toWeekDate = function(dateStr) {
    var d = new Date(dateStr);
    var wDay = ['dimanche', 'lundi', 'mardi', 'mercredi',
            'jeudi', 'vendredi', 'samedi'][d.getDay()];

    wDay += " " + d.getDate();
    return wDay;
}

module.exports.fGen1P = function(param, f) {
    return function(callback) {
        f(param, callback);
    }
};

module.exports.displayMonth = function(month) {
    y_m = month.split('-');
    var monthMap = {
        '01': 'janvier',
        '02': 'février',
        '03': 'mars',
        '04': 'avril',
        '05': 'mai',
        '06': 'juin',
        '07': 'juillet',
        '08': 'août',
        '09': 'septembre',
        '10': 'octobre',
        '11': 'novembre',
        '12': 'décembre',
        };

    return monthMap[y_m[1]] + " " + y_m[0] ;
};

module.exports.appNameNVersion = function() {
    var pkg = require('../../package.json');
    return pkg.name + ':' + pkg.version;
};

module.exports.touch = function(callback) {
    var cozydb = require('cozydb');
    cozydb.api.getCozyTimezone(function(err, timezone) {
        module.exports.cozyTimezone = timezone || 'UTC';
        if (callback) { callback(); }
    });
};
