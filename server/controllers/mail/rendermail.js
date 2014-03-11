var CozyInstance = require('../../models/cozyinstance');
var Client = require('request-json').JsonClient
var async = require('async');

var Main = require("../main");

module.exports = Mail = {

mail : function(req, res) {
    Mail.compose(null, function(err, html) {
    res.send(200, html);
    });
},

compose : function(mms, callback) {
   if (!mms) { // stub
    var mms = {

    "cursors": [
        {
            "origin": "intermarche",
            "minLabel": "végétarien",
            "maxLabel": "carnivore",
            "balance": 16.67313574931714,
            "color": "Red"
        },
        {
            "origin": "intermarche",
            "minLabel": "célibataire",
            "maxLabel": "famille nombreuse",
            "balance": 32.44000000000001,
            "color": "Blue"
        }
    ],
    "numbers": [
        {
            "origin": "intermarche",
            "type": "v",
            "label": "Quantité de fromage que vous avez acheté",
            "count": "12.1 kg"
        },
        {
            "origin": "intermarche",
            "type": "v",
            "label": "Quantité de viande que vous avez acheté",
            "count": "2.0 kg"
        },
        {
            "origin": "intermarche",
            "type": "v",
            "label": "Quantité de surgelés que vous avez acheté",
            "count": "0.9 kg"
        },
        {
            "origin": "intermarche",
            "type": "v",
            "label": "Quantité de lait que vous avez acheté",
            "count": "9.0 L"
        },
        {
            "origin": "intermarche",
            "type": "v",
            "label": "Quantité de vin que vous avez acheté",
            "count": "0 L"
        }
    ],
    "viz": [
        {
            "type": "viz_top3",
            "title": "Top 3 de vos courses",
            "bars": [
                {
                    "percent": 100,
                    "label": "ranou sdw jambon beurre ",
                    "valueLabel": "x5"
                },
                {
                    "percent": 80,
                    "label": "1er prix emmental rape ",
                    "valueLabel": "x4"
                },
                {
                    "percent": 60,
                    "label": "pains blancs / boulangerie tr",
                    "valueLabel": "x3"
                }
            ]
        },
        {
            "type": "viz_top5",
            "title": "Vos articles préférés",
            "bars": [
                {
                    "percent": 100,
                    "label": "ranou sdw jambon beurre ",
                    "valueLabel": "x5"
                },
                {
                    "percent": 80,
                    "label": "1er prix emmental rape ",
                    "valueLabel": "x4"
                },
                {
                    "percent": 60,
                    "label": "pains blancs / boulangerie tr",
                    "valueLabel": "x3"
                },
                {
                    "percent": 40,
                    "label": "signal bad croissance 3/6 ans",
                    "valueLabel": "x2"
                },
                {
                    "percent": 40,
                    "label": "president pointe de brie ",
                    "valueLabel": "x2"
                },
                {
                    "percent": 40,
                    "label": "mdc senseo dx 36d ",
                    "valueLabel": "x2"
                },
                {
                    "percent": 40,
                    "label": "aix les bains ",
                    "valueLabel": "x2"
                },
                {
                    "percent": 40,
                    "label": "ranou eminces 5%mg fum ",
                    "valueLabel": "x2"
                },
                {
                    "percent": 40,
                    "label": "poulet jaune pac s/f 1k3",
                    "valueLabel": "x2"
                },
                {
                    "percent": 20,
                    "label": "paturages yt nat l ent ",
                    "valueLabel": "x1"
                }
            ]
        }
    ],
    "moimois": {
        "date": "2013-03",
        "userName": "John Doe"
    },
    "badges": [
        {
            "type": "calls_duration",
            "label": "0 ème",
            "value": 0,
            "month": "2013-03"
        },
        {
            "type": "contacts_count",
            "label": "41 articles",
            "value": 41,
            "month": "2013-03"
        },
        {
            "type": "top_distance",
            "label": "1 retraits",
            "value": 1,
            "month": "2013-03"
        }
    ]
    
};  
    }

    var jade = require('jade');
    
    async.parallel([
        //function(cb) { fs.readFile(__dirname + '/templates/moimail.jade', 'utf8', cb); },
        CozyInstance.one,
        ],
        function(err, results) {
            if (err) throw err;

            //var fn = jade.compile(results[0], { filename: __dirname + "/templates/moimail.jade"});
            mms.baseUrl = "https://" + results[0].domain + "/public/mesinfos-moi" ;
            mms.filename = __dirname + "/templates/moimail.jade" ;

            jade.renderFile(__dirname + '/templates/moimail.jade', mms, callback);
//                function(err, html) {
//                    res.send(200, html);
//                }
//            );

            //var html = fn(mms);
            //res.send(200, html);
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
    Main.all(function(err, moiByMonth) {
        Mail.compose(moiByMonth[month], 
            function(err, html) {
                Mail.send(JSON.stringify(moiByMonth), html);
            });
    });
},

report : function() {
    Main.all(function(err, instances) {

    Mail.compose(instances[4], function(err, html) {
        res.send(200, html);
    });
    });
    setNextReport();
},

setNextReport : function() {
    var dt = { 
            day: 4, // Thruday ?
            hour: 12,  // between 12 and 14.
            };
    var now = new Date();
    
    // TODO : check it's work!
    var msBefore = (7 - (7 + dt.day - now.getDay()) % 7) * 24 * 3600 * 1000 ;
    msBefore += dt.hour - now.getHours() * 3600 * 1000 ;

    setTimeout(report, msBefore);
},

/*    var template = require('templates/moimail.jade')
    var jade = require('jade');
    var fn = jade.compile(template);
    var html = fn(mms);
*/
    //res.render('./templates/moimail.jade', mms);
    //, function(err, html) {
    //    console.log(html);
    //});
    
}
