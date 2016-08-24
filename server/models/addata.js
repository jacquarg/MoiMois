GeolocationLog = require('./geolocationlog');
// InsuranceClaim = require('./insuranceclaim');
BankOperation = require('./bankoperation');
// PhoneCommunicationLog = require('./phonecommunicationlog');
async = require('async');
utils = require('./utils');

module.exports = AdData = {

all: function(cbNoErr) {
    async.parallel({
        hasGeolocationLog: GeolocationLog.hasDocuments,
        hasBankOperation: BankOperation.hasDocuments,
    }, function(err, results) {
        if (err) { 
           log.error(err);
            results = {};
        }

        var ads = [];
        if (!results.hasGeolocationLog) {
            ads.push({
                origin: 'orange',
                type: 'top_distance',
                label: 'Avec vos données Orange ...',
                instructions: 'Si vous êtes client Orange Mobile, activez le Konnecteur !',
                link: '/apps/konnectors/orange',
                viz: 'badge',
                badge: {
                    type: "top_distance",
                    origin: "orange",
                    label:  '3 km',
                    value: 3.12,
                    //month: month,
                    explanationLabel: "votre distance max. en 15min.",
                },
            });

            ads.push({
                origin: 'orange',
                type: 'top_speed',
                label: 'Avec vos données Orange ...',
                instructions: 'Si vous êtes client Orange Mobile, activez le Konnecteur !',
                link: '/apps/konnectors/orange',
                viz: 'badge',
                badge: {
                    type: "top_speed",
                    origin: "orange",
                    label: '119 km/h',
                    value: 119.3,
                    //month: month,
                    explanationLabel: "votre vitesse max.",
                },
            });

            ads.push({
                origin: 'orange',
                type: 'traveled_distance',
                label: 'Avec vos données Orange ...',
                instructions: 'Si vous êtes client Orange Mobile, activez le Konnecteur !',
                link: '/apps/konnectors/orange',
                viz: 'badge',
                badge: {
                    type: "traveled_distance",
                    origin: "orange",
                    label: '100 km',
                    value: 1,
                    //month: month,
                    explanationLabel: "parcourus à vol d'oiseau",
                },
            });            

        }

        if (!results.hasBankOperation) {
            ads.push({
                // origin: 'orange',
                type: 'bankoperation',
                label: 'Récupérez vos données bancaires !',
                instructions: 'Configurez Kresus pour exploiter vos données bancaires !',
                link: '/apps/kresus',
            });   
        }
        cbNoErr(null, ads);
    });

},

};