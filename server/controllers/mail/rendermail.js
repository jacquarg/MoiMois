module.exports.mail = function(req, res) {
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
    var jade = require('jade'),
    fs = require('fs');

    fs.readFile(__dirname + '/templates/moimail.jade', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
    var fn = jade.compile(data, { filename: __dirname + "/templates/moimail.jade"});
    var html = fn(mms);
    console.log(html);
    res.send(200, html);
});


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
