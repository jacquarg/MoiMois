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
        // TODO: stub !
        // if (!results.hasGeolocationLog) {
        if (false) {
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

        // TODO: stub !
        //if (!results.hasBankOperation) {
        if (true) {
            ads.push({
                origin: 'kresus',
                type: 'top_dab_count',
                label: 'Vous y avez cru ! Récupérez vos données bancaires pour en apprendre plus sur vous !',
                instructions: 'Configurez Kresus pour exploiter vos données bancaires !',
                link: '/apps/kresus',
                viz: 'badge',
                badge: {
                    type: "top_dab_count",
                    origin: "bank",
                    label: "😲 42 retraits",
                    value: 42,
                    //month: month,
                    explanationLabel: "au distributeur automatique",
                }
            });

            ads.push({
                origin: 'kresus',
                type: 'top_dab_accrued_amount',
                label: 'Vous y avez cru ! Récupérez vos données bancaires pour en apprendre plus sur vous !',
                instructions: 'Configurez Kresus pour exploiter vos données bancaires !',
                link: '/apps/kresus',
                viz: 'badge',
                badge: {
                    type: "top_dab_accrued_amount",
                    origin: "bank",
                    label: "😲 2 000 000 000 €",
                    value: 200000,
                    //month: month,
                    explanationLabel: "retirés au distributeur automatique",
                }
            });

            ads.push({
                origin: 'kresus',
                type: 'top_dab_amount',
                label: 'Vous y avez cru ! Récupérez vos données bancaires pour en apprendre plus sur vous !',
                instructions: 'Configurez Kresus pour exploiter vos données bancaires !',
                link: '/apps/kresus',
                viz: 'badge',
                badge:{
                    type: "top_dab_amount",
                    origin: "bank",
                    label: "😲 137 725 €",
                    value: 137725,
                    //month: month,
                    explanationLabel: "d'un coup",
                }
            });

            ads.push({
                origin: 'kresus',
                type: 'top_cb',
                label: 'Vous y avez cru ! Récupérez vos données bancaires pour en apprendre plus sur vous !',
                instructions: 'Configurez Kresus pour exploiter vos données bancaires !',
                link: '/apps/kresus',
                viz: 'badge',
                badge: {
                    type: "top_cb",
                    origin: "bank",
                    label: "😲 30 000 000 €",
                    value: 30000000,
                    //month: month,
                    explanationLabel: "votre plus grosse dépense",
                }
            });
        }
        cbNoErr(null, ads);
    });

},

};