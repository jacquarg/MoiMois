var CozyInstance = require('../models/cozyinstance');
var EditionOfMoi = require('../models/editionofmoi');
var Client = require('request-json').JsonClient
var async = require('async');

var Main = require("./main");

module.exports = Mail = {

mail : function(req, res) {
    EditionOfMoi.ofMonth("2013-12", function(err, mm) {
            console.log(mm.toJSON());
        Mail.compose(mm.toJSON(), function(err, html) {
            console.log(err);
            res.send(200, html);
        });
    });
},

compose : function(mm, callback) {
  // if (!mms) { // stub
  //  var mms = {
  //  }

    var jade = require('jade');
    
    async.parallel([
        CozyInstance.one,
        ],
        function(err, results) {
            if (err) throw err;

            mm.baseUrl = "https://" + results[0].domain + "/public/mesinfos-moi" ;
            mm.miURL = "https://" + results[0].domain ;
            mm.filename = __dirname + "/../views/templates/moimail.jade" ;
            jade.renderFile(__dirname + '/../views/templates/moimail.jade', mm, callback);
      });
},

testSend : function(req, res) {
    Mail.compose(null, function(err, html) {
        
        Mail.send("Test mail.", html);
        res.send(200, "done ?");
    });
},

send : function(textContent, htmlContent) {
    data = {
            from: "Moi (Le mag) <moi-noreply@cozycloud.cc>",
            subject: "Moi, des nouvelles fraiches sur vous", // Z : meilleur sujet.
            content: textContent,
            html: htmlContent,
        }

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

sendReportReq : function(req, res) {
    Mail.sendReport(req.params.month);
    res.send(200);
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
    
    // which report ?
    var reportsMap = {
        "2014-03-13": "2014-02",
        "2014-03-20": "2014-02",
        "2014-03-27": "2014-01",
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
            Mail.sendReport(reportsMap[now.toISOString().slice(0, 11)]);
            //console.log("send report: " + reportsMap[now.toISOString().slice(0, 10)]);
            //Mail.sendReport(reportsMap["2014-05-01"]);
            Mail.setNextReport();

        }, msBefore);
},

}

Mail.setNextReport();
