GeoPoint = require('./geopoint');
// InsuranceClaim = require('./insuranceclaim');
BankOperation = require('./bankoperation');
// TODO PhoneCommunicationLog = require('./phonecommunicationlog');
async = require('async');
utils = require('./utils');

module.exports = AdData = {

all: function(cbNoErr) {
    async.parallel({
        hasGeoPoint: GeoPoint.hasDocuments,
        hasBankOperation: BankOperation.hasDocuments,
    }, function(err, results) {
        if (err) {
           log.error(err);
            results = {};
        }

        var ads = [];
        if (!results.hasGeoPoint) {
            ads.push({
                origin: 'orange',
                type: 'top_distance',
                label: 'Vous y avez cru ! Récupérez vos données Orange pour en apprendre plus sur vous !',
                instructions: 'Si vous êtes client Orange Mobile, activez le Konnecteur !',
                link: '/#apps/konnectors/konnector/orange_mobile',
                viz: 'badge',
                badge: {
                    type: "top_distance",
                    origin: "orange",
                    label:  '😲 2 m',
                    value: 0.002,
                    //month: month,
                    explanationLabel: "votre distance max. en 30min.",
                },
            });

            ads.push({
                origin: 'orange',
                type: 'top_speed',
                label: 'Vous y avez cru ! Récupérez vos données Orange pour en apprendre plus sur vous !',
                instructions: 'Si vous êtes client Orange Mobile, activez le Konnecteur !',
                link: '/#apps/konnectors/konnector/orange_mobile',
                viz: 'badge',
                badge: {
                    type: "top_speed",
                    origin: "orange",
                    label: '😲 2 312 km/h',
                    value: 2312,
                    //month: month,
                    explanationLabel: "votre vitesse max.",
                },
            });

            ads.push({
                origin: 'orange',
                type: 'traveled_distance',
                label: 'Vous y avez cru ! Récupérez vos données Orange pour en apprendre plus sur vous !',
                instructions: 'Si vous êtes client Orange Mobile, activez le Konnecteur !',
                link: '/#apps/konnectors/konnector/orange_mobile',
                viz: 'badge',
                badge: {
                    type: "traveled_distance",
                    origin: "orange",
                    label: '😲 2 000 000 km',
                    value: 2000000,
                    //month: month,
                    explanationLabel: "parcourus à vol d'oiseau",
                },
            });

        }

        if (!results.hasBankOperation) {
            ads.push({
                origin: 'kresus',
                type: 'top_dab_count',
                label: 'Vous y avez cru ! Récupérez vos données bancaires pour en apprendre plus sur vous !',
                instructions: 'Configurez Kresus pour exploiter vos données bancaires !',
                link: '/#apps/kresus',
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