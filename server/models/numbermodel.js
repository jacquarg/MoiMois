//GeolocationLog = require('./geolocationlog');
Vehicle = require('./vehicle');
BankOperation = require('./bankoperation');
PhoneCommunicationLog = require('./phonecommunicationlog');
ReceiptDetail = require('./receiptdetail');
async = require('async');
utils = require('./utils');

module.exports = NumberModel = {

ofMonth : function(month, callback) {
    async.parallel([
        function(callback) {
            PhoneCommunicationLog.monthStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                // Data
                //Total calls duration.
                var hours =  Math.floor(data.callsDuration / 3600);
                var mins = Math.round((data.callsDuration / 60) % 60);
                var mins = (mins < 10) ? "0" + mins : "" + mins;
                // each 10',  + 0.1 , ie / 100 .
                var compare = Math.round(data.callsDuration / 100);
                numbers.push({
                    origin: "orange",
                    type: "vc",
                    label: "Votre temps d'appel",
                    count: hours + "h" + mins,
                    compareLabel: "Équivalent à " + compare + " km parcourus à pleine vitesse par Usain Bolt, champion du monde de 100m." // try U+202F as space ?
                    });
                
                // Total data
                var mo = Math.floor(data.data / 1000000); //(1 MB)
                var compare = Math.round(data.data / 1440000); // (1.44 MB
                numbers.push({
                    origin: "orange",
                    type: "vc",
                    label: "Votre consommation internet sur mobile",
                    count: mo + " Mo",
                    compareLabel: "Équivalent à " + compare + " disquettes." // try U+202F as space ?
                    });

                // Most called contact
                var mins = Math.round(data.mostCalledContactDuration / 60);
                var compare =  Math.round(mins / 4);// each 4'.
                var contact = utils.formatPhoneNumber(data.mostCalledContact);
                numbers.push({
                    origin: "orange",
                    type: "vvc",
                    label: "Le numéro le plus appelé",
                    count: contact,
                    count2: mins + " min",
                    compareLabel: "Équivalent à la cuisson de " + compare + " oeufs coques." // try U+202F as space ?
                });

                callback(null, numbers);
            });
        },
        function(callback) {
            PhoneCommunicationLog.dayStats(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                // Data
                //Top callsDuration day
                //var day = 

                var mins = Math.round(data.value.callsDuration / 60);
                var day = utils.toWeekDate(data.key.join('-'));
                numbers.push({
                    origin: "orange",
                    type: "vv",
                    label: "Votre jour le plus bavard",
                    count: day,
                    count2: mins + " min" ,
                    });

                callback(null, numbers);
            });
        },
        function(callback) {
            ReceiptDetail.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                // FROMAGE
              
                var count = 0;
                //'10' :'FROMAGE TRAD',
                //'30' :'CREMERIE LS',
                data.forEach(function(rdet) {
                    if ((rdet.section == '10' 
                        || rdet.section == '30')
                        && rdet.computedWeight) {
                        count += rdet.computedWeight * rdet.amount ;
                    }
                });

                numbers.push({
                    origin: "intermarche",
                    type: "v",
                    label: "Quantité de fromage que vous avez acheté",
                    count: count.toFixed(1) + ' kg',
                    });

                // VIANDE
                //'200': 'BOUCHERIE',
                //'260': 'CHARCUTERIE',
                count = 0;
                data.forEach(function(rdet) {
                    if ((rdet.aggregatedSection == '200'
                        || rdet.aggregatedSection == '260')
                        && rdet.computedWeight) {
                        count += rdet.computedWeight * rdet.amount;
                    }
                });
                numbers.push({
                    origin: "intermarche",
                    type: "v",
                    label: "Quantité de viande que vous avez acheté",
                    count: count.toFixed(1) + ' kg',
                    });

                // SURGELES
                //'38' :'SURGELES',
                count = 0;
                data.forEach(function(rdet) {
                    if (rdet.aggregatedSection == '38'
                        && rdet.computedWeight) {
                        count += rdet.computedWeight * rdet.amount ;
                    }
                });
                numbers.push({
                    origin: "intermarche",
                    type: "v",
                    label: "Quantité de surgelés que vous avez acheté",
                    count: count.toFixed(1) + ' kg',
                    });

                // LAIT
                // Family :
                //3012  LAIT LS
                //4022  LAITS BOITES ET TUBES
                count = 0;
                //
                data.forEach(function(rdet) {
                    if ((rdet.family == '3012'
                        || rdet.family == '4022')
                        && rdet.computedVolume) {
                        count += rdet.computedVolume * rdet.amount ;
                    }
                });
                numbers.push({
                    origin: "intermarche",
                    type: "v",
                    label: "Quantité de lait que vous avez acheté",
                    count: count.toFixed(1) + ' L',
                    });


                // VIN
                //Family :
                //4606  VINS DE TABLE/PAYS
                //4608  VINS SUPERIEURS ET VINS FINS
                //4614  FOIRE AUX VINS
                //4618  APERITIF / VIN DOUX
                count = 0;

                data.forEach(function(rdet) {
                    if ((rdet.family == '4606'
                        || rdet.family == '4608'
                        || rdet.family == '4614'
                        || rdet.family == '4618')
                        && rdet.computedVolume) {
                        count += rdet.computedVolume ;
                    }
                });
                numbers.push({
                    origin: "intermarche",
                    type: "v",
                    label: "Quantité de vin que vous avez acheté",
                    count: count + ' L',
                    });

                // NOURRITURE
                // cf alimentaire, MesConsos.
                count = 0;

                data.forEach(function(rdet) {
                    if (['12', '10', '38', '28', '30', '22', '32', '20', '34', '26', '24', '2', '46', '4', '6', '8', '40', '42'].indexOf(rdet.aggregatedSection) != -1) {
                        if (rdet.computedWeight) {
                        count += rdet.computedWeight * rdet.amount ;
                        }
                    }
                });

                var eqCount = Math.ceil(count / 1.5) ;
                numbers.push({
                    origin: "intermarche",
                    type: "vc",
                    label: "La masse de nourriture que vous avez acheté",
                    count: count.toFixed(2) + ' kg',
                    compareLabel: 'Équivalent à ' + eqCount + ' poulets',
                    });
                callback(null, numbers);
            });
        },
        function(callback) {
            Vehicle.all(function(err, data) {
                if (err || data.length == 0) {
                    // Silent fail on error.
                    console.log("Error (probably no data): %j", err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                if (data[0].firstRegistrationDate) {
                    var dtStr = data[0].firstRegistrationDate.toISOString();
                } else if (data[0].registrationDate) {
                    var dtStr = data[0].firstRegistrationDate.toISOString();
                } else {
                    callback(null, []);
                    return
                }
                
                var dYears = parseInt(month.slice(0, 4)) - parseInt(dtStr.slice(0, 4));
                var dMonth = dYears * 12 + parseInt(month.slice(5, 7)) - parseInt(dtStr.slice(5, 7));

                var years = Math.ceil(dYears / 12);
                var months = dYears % 12;
                
                
                numbers.push({
                    origin: "axa",
                    type: "vv",
                    label: "Age de votre voiture",
                    count: years + ' ans',
                    count2: months + ' mois',
                    });
                callback(null, numbers);
            });
        },
        function(callback) {
            BankOperation.ofMonth(month, function(err, data) {
                if (err) {
                    // Silent fail on error.
                    console.log(err);
                    callback(null, []);
                    return
                }

                var numbers = [];
                
                var counts = data.reduce(function(acc, bop) {
                    if (bop.family == 'withdrawals') {
                        acc.dab -= bop.amount;

                    } else if (bop.family == 'card') {
                        acc.cb -= bop.amount;
                    }
                    return acc;
                }, 
                { 'dab': 0, 'cb': 0 });

                var compareCount = counts.dab * 0.03 ; // 1E <-> 0.03 g d'or.
                numbers.push({
                    origin: "bank",
                    type: "vc",
                    label: "L'argent que vous avez retiré",
                    count: counts.dab.toFixed(0) + " €",
                    compareLabel: "Équivalent à " + compareCount.toFixed(1) + " g d'or",
                    });

                var compareCount = counts.dab * 0.03 ; // 1E <-> 0.03 g d'or.
                numbers.push({
                    origin: "bank",
                    type: "vc",
                    label: "Vous avez dépensé",
                    count: counts.cb.toFixed(0) + " €",
                    compareLabel: "Équivalent à " + compareCount.toFixed(1) + " g d'or",
                });
                callback(null, numbers);
            });
        },
    ],
    function(err, results) {
        var numbers = [];
        for (var i=0;i<results.length;i++) {
            numbers = numbers.concat(results[i]);
        }

        callback(null, numbers);
    });
},

}
