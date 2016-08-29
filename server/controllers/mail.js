var async = require('async');
var moment = require('moment');
var cozydb = require('cozydb');

var EditionOfMoi = require('../models/editionofmoi');

var Main = require("./main");

log = require('printit')({
    application: 'EditionOfMoi',
    prefix: 'mail',
    date: true,
});


module.exports = Mail = {

_generateTextContent: function(mm) {
    var txt = "";

    //header
    txt += "Bonjour " + mm.flName + ",\n\n";
    txt += "Des nouvelles fraîches sur vous ?\n";
    txt += "Feuilletez le magazine qui vous raconte votre propre histoire. Découvrez les gros titres du moments, les petits riens de votre quotidien.\n\n";
    txt += 'En tant que testeur dans le pilote MesInfos, nous vous proposons de découvrir la dernière édition de "moi", votre magazine rien qu\'à vous !\n\n\n';

    //body
    txt += "moi " + mm.displayDate + " : " + mm.miURL + "#apps/moimois " + "\n\n";
    txt += "Exploits du mois \n";
    mm.badges.forEach(function(item){
        txt += "- " + item.label + " " + item.explanationLabel + ", \n" ;
        });
    txt += "\n" ;
    txt += "Vous ce mois-ci\n";

    mm.numbers.forEach(function(item) {
        txt += "- " + item.label + " : " + item.count ;
        if (item.type.indexOf("vv") != -1) {
            txt += " " + item.count2 ;
        }
        if (item.type.indexOf("c") != -1) {
            txt += " (" + item.compareLabel + ")" ;
        }
        txt += ".\n";
      });
    mm.cursors.forEach(function(item) {
        txt += "- Ce mois-ci, vous avez été plutôt : " ;
        txt += Math.round(100 - item.balance) + " % " + item.minLabel + ", " ;
        txt += Math.round(item.balance) + " % " + item.maxLabel + ".";
      });
    mm.viz.forEach(function(item) {
        txt += "- " +  item.title + " :\n";

        item.bars.forEach(function(bar) {
            txt += "  * " + bar.label + " : " + bar.valueLabel + ",\n" ;
        });
      });
    txt += "\n\n\n";
    // footer
    txt += "Vous pouvez consulter les anciennes éditions de votre Magazine \"moi\", via l'application \"moi\" dans votre Cozy : " + mm.miURL + "#apps/moimois .\n";
    txt += "\n\n";
    txt += "Vie privée\n";
    txt += "Rappel : comme tous les services proposés sur votre Cozy par MesInfos, vous seuls avez accès à ces données et pouvez les consulter. Ni les enseignes partenaires, ni l'équipe de MesInfos, niles Équipe de Cozy Cloud n'y ont accès !\n\n";

    txt += "Pour toutes questions, rendez-vous sur le forum des testeurs MesInfos http://mesinfos.fing.org/forum/ \n";

    return txt;
},

compose: function(mm, callback) {
    var jade = require('jade');

    cozydb.api.getCozyDomain(function(err, domain) {
        if (err) { return callback(err); }

        mm.baseUrl = domain + "public/moimois" ;
        mm.miURL = domain ;
        mm.filename = __dirname + "/../views/templates/moimail.jade" ;
        jade.renderFile(__dirname + '/../views/templates/moimail.jade', mm,
            function(err, html) {
                data = {
                    from: "Le magazine moi<moi-noreply@cozycloud.cc>",
                    subject: "MesInfos - en " + mm.displayDate + " vous avez été plutôt " + mm.une,
                    content: Mail._generateTextContent(mm),
                    html: html,
                };
                callback(err, data);
            });
    });
},


sendReport: function(month) {
    if (!month) {
        month = moment().add(-1, 'month').format('YYYY-MM');
    }

    console.log(new Date() + " - SendReport of " + month);
    EditionOfMoi.touch(function() {
        EditionOfMoi.ofMonth(month, function(err, mm) {
            if (err) { return log.error(err); }

            if (mm.sent) {
                return log.info("Edition of " + month + " already sent");
            }
            Mail.compose(mm.toJSON(), function(err, message) {
                if (err) { return log.error(err); }

                cozydb.api.sendMailToUser(message, function(err) {
                  if (err) {
                      console.log("An error occurred while sending an email : " +  err.msg);
                  } else {
                      console.log("Report sent.");
                      mm.updateAttributes({ sent: true }, function(err) {
                          if (err) {
                              log.error("Error while setting sent on the edition: " + err);
                          }
                      });
                  }
                });
            });
        });
    });
},


setNextReport : function() {
    var dt = {
            day: 4, // Thursday ?
            hour: 12,  // between 12 and 14.
            };
    var now = new Date();

    var msBefore = null;
    if (now.getDay() == dt.day) {
        // si pour tout à l'heure
        if (dt.day && now.getHours() < dt.hour) {
            msBefore = 0;
        // pour la semaine prochaine
        } else {
            msBefore =  (7 * 24) * 3600 * 1000;
        }

    } else {
        // days
        msBefore = ((7 + dt.day - now.getDay()) % 7) * 24 * 3600 * 1000 ;
    }

    // hours
    msBefore += (dt.hour - now.getHours()) * 3600 * 1000 ;


    // Add some seconds to avoid inside loop.
    msBefore += 10000;

    console.log("ms before mail: " + msBefore);
    setTimeout(function() {
            Mail.sendReport();
            //console.log("send report: " + reportsMap[now.toISOString().slice(0, 10)]);
            //Mail.sendReport(reportsMap["2014-05-01"]);
            Mail.setNextReport();

        }, msBefore);
},


// Test function: to visualise a email in the browser.
mail: function(req, res) {
    EditionOfMoi.ofMonth(req.params.month, function(err, mm) {
        Mail.compose(mm.toJSON(), function(err, data) {
            res.status(200).send(data.html);
        });
    });
},

// Test function: send the specified month edition by email.
sendReportReq: function(req, res) {
    Mail.sendReport(req.params.month);
    res.send(200);
},


}


Mail.setNextReport();

// send reports, after initial touch ! (one hour to be sure.)
// how to avoid flood ? --> if app restart/ flood ...
setTimeout(Mail.sendReport,
    //1 * 3600 * 1000);
    5 * 60 * 1000);
