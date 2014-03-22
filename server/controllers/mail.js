var CozyInstance = require('../models/cozyinstance');
var EditionOfMoi = require('../models/editionofmoi');
var Client = require('request-json').JsonClient
var async = require('async');

var Main = require("./main");

module.exports = Mail = {

mail : function(req, res) {
    EditionOfMoi.ofMonth("2013-12", function(err, mm) {
            //console.log(mm.toJSON());
        Mail.compose(mm.toJSON(), function(err, data) {
            console.log(data);
            res.send(200, data.html);
        });
    });
},

sendReportReq : function(req, res) {
    Mail.sendReport(req.params.month);
    res.send(200);
},

_generateTextContent : function(mm) {
    var txt = "";

    //header
    txt += "Bonjour " + mm.flName + ",\n\n";
    txt += "Des nouvelles fraîches sur vous ?\n";
    txt += "Feuilletez le magazine qui vous raconte votre propre histoire. Découvrez les gros titres du moments, les petits riens de votre quotidien.\n\n";
    txt += 'En tant que testeur du projet MesInfos via le panel EDEN, nous vous proposons de découvrir la 1ère édition de "moi", votre magazine rien qu\'à vous !\n\n\n';

    //body
    txt += "moi " + mm.displayDate + " : " + mm.miURL + "/#apps/mesinfos-moi " + "\n\n";
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
    txt += "Envie d'aller plus loin et de gagner des points-cadeaux ?\n";
    txt += "- Vous pouvez consulter les anciennes éditions de votre Magazine \"moi\", via l'application \"moi\" dans votre espace personnel : " + mm.miURL + "/#apps/mesinfos-moi .\n";
    txt += "- Pour cela, il est nécessaire de vous connecter à votre espace personnel : " + mm.miURL + " (en suivant les étapes de cette vidéo : http://youtu.be/V6M3-BSeP2s ), vous seuls pouvez le faire car ces données ne concernent que vous !\n";
    txt += "- Un nouveau système de points-cadeaux est mis en place par Eden : en installant votre espace personnel, en installant les 4 autres applications disponibles, en partageant vos impressions... vous cumulerez des points !\n\n";

    txt += "Vie privée\n";
    txt += "Rappel : comme tous les services proposés par MesInfos, vous seuls avez accès à ces données et pouvez les consulter. Ni les enseignes partenaires, ni les animateurs de MesInfos n'y ont accès !\n\n";

    txt += "Pour toutes questions, rendez-vous sur le forum des testeurs MesInfos (animé par Eden) http://mesinfos.edeninsight.net/ \n";

    return txt;
},

compose : function(mm, callback) {
    var jade = require('jade');
    
    CozyInstance.one(function(err, results) {
        if (err) {
            callback(err, null);
        }

        mm.baseUrl = "https://" + results.domain + "/public/mesinfos-moi" ;
        mm.miURL = "https://" + results.domain ;
        mm.filename = __dirname + "/../views/templates/moimail.jade" ;
        jade.renderFile(__dirname + '/../views/templates/moimail.jade', mm,
            function(err, html) {
                data = {
                    from: "Le magazine moi<moi-noreply@cozycloud.cc>",
                    subject: "MesInfos - en " + mm.displayDate + " vous avez été plutôt " + mm.une,
                    content: Mail._generateTextContent(mm),
                    html: html,
                }
            callback(err, data);
            });
    });
},

testSend : function(req, res) {
    Mail.compose(null, function(err, html) {
        
        Mail.send("Test mail.", html);
        res.send(200, "done ?");
    });
},

send : function(err, data) {
    var client = new Client("http://localhost:9101/");
    if (["production", "test"].indexOf(process.env.NODE_ENV) != -1) {
        client.setBasicAuth(process.env.NAME, process.env.TOKEN);
    }
            
    client.post("mail/to-user/", data, function(err, res, body) {
        if (err) {
            msg = "An error occurred while sending an email"
            console.log("#{msg} -- #{err}");
            if (res) { console.log(res.statusCode); }
         } else {
            console.log("Report sent.");
        }
    });
},



sendReport: function(month) {
    if (!month) {
        // uggly spaggeti.
        today = new Date().toISOString().slice(0,10);

        if (today <= "2014-03-20") {
            month = "2013-06";
        } else if (today <= "2014-03-26") {
            month = "2013-12";
        } else if (today <= "2014-04-02") {
            month = "2014-01";
        } else if (today <= "2014-04-09") {
            month = "2014-02";
        } else if (today <= "2014-04-16") {
            month = "2013-11";
        } else if (today <= "2014-04-23") {
            month = "2013-10";
        } else if (today <= "2014-04-30") {
            month = "2014-03";
        } else if (today <= "2014-04-07") {
            month = "2013-09";
        } else if (today <= "2014-04-14") {
            month = "2013-08";
        } else if (today <= "2014-04-21") {
            month = "2013-07";
        }
    }
    //
    
    console.log(new Date() + " - SendReport of " + month);
    EditionOfMoi.touch(function() {
        EditionOfMoi.ofMonth(month, function(err, mm) {
            Mail.compose(mm.toJSON(),

                function(err, html) {
                Mail.send(JSON.stringify(mm), html);
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

}


Mail.setNextReport();

// send reports, after initial touch ! (one hour to be sure.)
// how to avoid flood ? --> if app restart/ flood ...
//setTimeout(Mail.sendReport, 
//    //1 * 3600 * 1000);
//    5 * 60 * 1000);


