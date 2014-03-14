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
    txt += "Voici le numéro du mois de novembre 2013 de moi, le magazine qui vous raconte votre propre histoire.\n" ;
    txt += "Le magazine virtuel moi est édité automatiquement par votre espace personnel MesInfos *" + mm.miURL + ", et n'est consultable que par vous-même.\n\n\n";

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
    txt += "\n\n";
    // footer
    txt += "Ce message vous a été envoyer par moi, une application de votre espace personnel MesInfos. Venez y découvrir les nouvelles applications.\n";
    //txt += "Votre espace personnel MesInfos : " + mm.miURL  + "\n\n";
    txt += "* Votre espace personnel MesInfos a été créé dans le cadre de l'expérimentation MesInfos, à laquelle vous avez accepté de participer à partir du second semestre 2013, et vous permettant d'accéder à vos données personnelles ainsi qu'à des applications inédites, via un espace sécurisé : " +  mm.miURL + "\n";
    txt += "Pour toutes questions, rendez-vous sur le forum des testeurs MesInfos (animé par Eden) http://mesinfos.edeninsight.net/ .";
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
                    subject: "Votre magazine moi de " + mm.displayDate,
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
    if (now.getDay()) {
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
    msBefore += 10;
    
    // TODO Stub
    //msBefore = 10 * 60 * 1000 ;

    // which report ?
    var reportsMap = {
        "2014-03-14": "2014-01",
        "2014-03-20": "2014-01",
        "2014-03-27": "2014-02",
        "2014-04-03": "2013-12",
        "2014-04-10": "2013-11",
        "2014-04-17": "2013-10",
        "2014-04-24": "2014-03",
        "2014-05-01": "2013-09",
        "2014-05-08": "2013-08",
        "2014-05-15": "2013-07",
    
    };
    console.log("ms before mail: " + msBefore);
    setTimeout(function() {
            Mail.sendReport(reportsMap[now.toISOString().slice(0, 10)]);
            //console.log("send report: " + reportsMap[now.toISOString().slice(0, 10)]);
            //Mail.sendReport(reportsMap["2014-05-01"]);
            Mail.setNextReport();

        }, msBefore);
},

}

Mail.setNextReport();
