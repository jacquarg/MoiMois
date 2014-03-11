MoiMoisCollection = require('../collections/moimois');
MoiMois = require('./moimois');

module.exports = MoiList = Backbone.View.extend({
    //el : $( "#allbadges" ),
    /*collection : new MoiMoisCollection(
[

    {
        "moimois": {
            "date": "2013-01",
            "userName": "John Doe"
        },
        "badges": [ ],
        "numbers": [ ],
        "cursors": [ ],
        "viz": [ ]
    },
    {
        "moimois": {
            "date": "2013-02",
            "userName": "John Doe"
        },
        "badges": [ ],
        "numbers": [ ],
        "cursors": [ ],
        "viz": [ ]
    },
    {
        "moimois": {
            "date": "2013-03",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_fromage",
                "label": "0 ème",
                "value": 0,
                "month": "2013-03"
            },
            {
                "type": "top_articles_count",
                "label": "41 articles",
                "value": 41,
                "month": "2013-03"
            },
            {
                "type": "top_dab_count",
                "label": 1,
                "value": 1,
                "month": "2013-03"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "12.1 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "2.0 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "0.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "9.0 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 16.67313574931714,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 32.44000000000001,
                "color": "Blue"
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
        ]
    },
    {
        "moimois": {
            "date": "2013-04",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_accrued_amount",
                "label": 140,
                "value": 140,
                "month": "2013-04"
            },
            {
                "type": "top_dab_count",
                "label": 3,
                "value": 3,
                "month": "2013-04"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "32.4 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "3.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "3.7 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "16.6 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 12.868379368049569,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 74.83166666666664,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_top3",
                "title": "Top 3 de vos courses",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    }
                ]
            },
            {
                "type": "viz_top5",
                "title": "Vos articles préférés",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "chabrior kh kanoe abric ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "kiri gouter 8 portions ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "ids jambon sec italien 6t ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "t budget yrt aromat.",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "pastis 51 45d ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "top budget saint paulin ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "gotxoki tomate concasse bte1/2",
                        "valueLabel": "x3"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2013-05",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 4,
                "value": 4,
                "month": "2013-05"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 190,
                "value": 190,
                "month": "2013-05"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "12.1 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "2.0 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "0.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "9.0 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 16.67313574931714,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 32.44000000000001,
                "color": "Blue"
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
        ]
    },
    {
        "moimois": {
            "date": "2013-06",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 6,
                "value": 6,
                "month": "2013-06"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 280,
                "value": 280,
                "month": "2013-06"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "32.4 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "3.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "3.7 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "16.6 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 12.868379368049569,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 74.83166666666664,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_top3",
                "title": "Top 3 de vos courses",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    }
                ]
            },
            {
                "type": "viz_top5",
                "title": "Vos articles préférés",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "chabrior kh kanoe abric ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "kiri gouter 8 portions ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "ids jambon sec italien 6t ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "t budget yrt aromat.",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "pastis 51 45d ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "top budget saint paulin ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "gotxoki tomate concasse bte1/2",
                        "valueLabel": "x3"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2013-07",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 7,
                "value": 7,
                "month": "2013-07"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 330,
                "value": 330,
                "month": "2013-07"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "12.1 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "2.0 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "0.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "9.0 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 16.67313574931714,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 32.44000000000001,
                "color": "Blue"
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
        ]
    },
    {
        "moimois": {
            "date": "2013-08",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 9,
                "value": 9,
                "month": "2013-08"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 420,
                "value": 420,
                "month": "2013-08"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "32.4 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "3.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "3.7 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "16.6 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 12.868379368049569,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 74.83166666666664,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_top3",
                "title": "Top 3 de vos courses",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    }
                ]
            },
            {
                "type": "viz_top5",
                "title": "Vos articles préférés",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "chabrior kh kanoe abric ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "kiri gouter 8 portions ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "ids jambon sec italien 6t ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "t budget yrt aromat.",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "pastis 51 45d ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "top budget saint paulin ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "gotxoki tomate concasse bte1/2",
                        "valueLabel": "x3"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2013-09",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 10,
                "value": 10,
                "month": "2013-09"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 470,
                "value": 470,
                "month": "2013-09"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "12.1 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "2.0 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "0.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "9.0 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 16.67313574931714,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 32.44000000000001,
                "color": "Blue"
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
        ]
    },
    {
        "moimois": {
            "date": "2013-10",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 12,
                "value": 12,
                "month": "2013-10"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 560,
                "value": 560,
                "month": "2013-10"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "32.4 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "3.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "3.7 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "16.6 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 12.868379368049569,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 74.83166666666664,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_top3",
                "title": "Top 3 de vos courses",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    }
                ]
            },
            {
                "type": "viz_top5",
                "title": "Vos articles préférés",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "chabrior kh kanoe abric ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "kiri gouter 8 portions ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "ids jambon sec italien 6t ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "t budget yrt aromat.",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "pastis 51 45d ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "top budget saint paulin ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "gotxoki tomate concasse bte1/2",
                        "valueLabel": "x3"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2013-11",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 13,
                "value": 13,
                "month": "2013-11"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 610,
                "value": 610,
                "month": "2013-11"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "12.1 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "2.0 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "0.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "9.0 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 16.67313574931714,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 32.44000000000001,
                "color": "Blue"
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
        ]
    },
    {
        "moimois": {
            "date": "2013-12",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 15,
                "value": 15,
                "month": "2013-12"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 700,
                "value": 700,
                "month": "2013-12"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "32.4 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "3.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "3.7 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "16.6 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 12.868379368049569,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 74.83166666666664,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_top3",
                "title": "Top 3 de vos courses",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    }
                ]
            },
            {
                "type": "viz_top5",
                "title": "Vos articles préférés",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "chabrior kh kanoe abric ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "kiri gouter 8 portions ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "ids jambon sec italien 6t ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "t budget yrt aromat.",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "pastis 51 45d ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "top budget saint paulin ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "gotxoki tomate concasse bte1/2",
                        "valueLabel": "x3"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2014-01",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_distance",
                "label": "34 km",
                "value": 34.39026948533664,
                "month": "2014-01"
            },
            {
                "type": "top_speed",
                "label": "138 km/h",
                "value": 137.56107794134655,
                "month": "2014-01"
            },
            {
                "type": "traveled_distance",
                "label": "1600 km",
                "value": 16,
                "month": "2014-01"
            }
        ],
        "numbers": [
            {
                "type": "vc",
                "label": "Votre temps d'appel",
                "count": "1h2",
                "compareLabel": "Équivalent à 37 km parcourus à pleine vitesse par Usain Bolt, champion du monde de 100m."
            },
            {
                "type": "vc",
                "label": "Votre consommation internet sur mobile",
                "count": "238 Mo",
                "compareLabel": "Équivalent à 166 disquettes."
            },
            {
                "type": "vvc",
                "label": "Le numéro le plus appelé",
                "count": "+33 6 79 51 98 74",
                "count2": "25 min",
                "compareLabel": "Équivalent à la cuisson de 6 oeufs coques."
            },
            {
                "type": "vv",
                "label": "Votre jour le plus bavard",
                "count": "2014-01-21",
                "count2": 32
            },
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "12.1 kg"
            }
        ],
        "cursors": [
            {
                "minLabel": "muet",
                "maxLabel": "pipelette",
                "balance": 3,
                "color": "Red"
            },
            {
                "minLabel": "récepteur",
                "maxLabel": "émetteur",
                "balance": 97.82608695652173,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_bargraph",
                "title": "Répartition de vos temps d'appel cumulés sur les jours de la semaine",
                "bars": [
                    {
                        "percent": 17.59211209133368,
                        "label": "",
                        "valueLabel": "6 min"
                    },
                    {
                        "percent": 100,
                        "label": "",
                        "valueLabel": "32 min"
                    },
                    {
                        "percent": 3.1655422937208098,
                        "label": "",
                        "valueLabel": "1 min"
                    },
                    {
                        "percent": 2.9579657498702647,
                        "label": "",
                        "valueLabel": "1 min"
                    },
                    {
                        "percent": 0,
                        "label": "",
                        "valueLabel": "0 min"
                    },
                    {
                        "percent": 23.819408406850027,
                        "label": "",
                        "valueLabel": "8 min"
                    },
                    {
                        "percent": 46.652828230409966,
                        "label": "",
                        "valueLabel": "15 min"
                    }
                ]
            },
            {
                "type": "viz_bargraph",
                "title": "Moyenne des km parcourus en fonction des heures de la journée",
                "bars": [
                    {
                        "percent": 100,
                        "label": "",
                        "valueLabel": "391.2 km"
                    },
                    {
                        "percent": 62.65085221662547,
                        "label": "",
                        "valueLabel": "245.1 km"
                    },
                    {
                        "percent": 42.479180263298524,
                        "label": "",
                        "valueLabel": "166.2 km"
                    },
                    {
                        "percent": 69.5219824155161,
                        "label": "",
                        "valueLabel": "272.0 km"
                    },
                    {
                        "percent": 20.76581021243439,
                        "label": "",
                        "valueLabel": "81.2 km"
                    },
                    {
                        "percent": 54.49228745410684,
                        "label": "",
                        "valueLabel": "213.2 km"
                    },
                    {
                        "percent": 38.7156165668291,
                        "label": "",
                        "valueLabel": "151.5 km"
                    },
                    {
                        "percent": 0,
                        "label": "",
                        "valueLabel": "0.0 km"
                    },
                    {
                        "percent": 4.221554373067259,
                        "label": "",
                        "valueLabel": "16.5 km"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2014-02",
            "userName": "John Doe"
        },
        "badges": [
            {
                "type": "top_dab_count",
                "label": 18,
                "value": 18,
                "month": "2014-02"
            },
            {
                "type": "top_dab_accrued_amount",
                "label": 840,
                "value": 840,
                "month": "2014-02"
            }
        ],
        "numbers": [
            {
                "type": "v",
                "label": "Quantité de fromage que vous avez acheté",
                "count": "32.4 kg"
            },
            {
                "type": "v",
                "label": "Quantité de viande que vous avez acheté",
                "count": "3.9 kg"
            },
            {
                "type": "v",
                "label": "Quantité de surgelés que vous avez acheté",
                "count": "3.7 kg"
            },
            {
                "type": "v",
                "label": "Quantité de lait que vous avez acheté",
                "count": "16.6 L"
            },
            {
                "type": "v",
                "label": "Quantité de vin que vous avez acheté",
                "count": "0 L"
            }
        ],
        "cursors": [
            {
                "minLabel": "végétarien",
                "maxLabel": "carnivore",
                "balance": 12.868379368049569,
                "color": "Red"
            },
            {
                "minLabel": "célibataire",
                "maxLabel": "famille nombreuse",
                "balance": 74.83166666666664,
                "color": "Blue"
            }
        ],
        "viz": [
            {
                "type": "viz_top3",
                "title": "Top 3 de vos courses",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    }
                ]
            },
            {
                "type": "viz_top5",
                "title": "Vos articles préférés",
                "bars": [
                    {
                        "percent": 100,
                        "label": "t budget compote pomme ",
                        "valueLabel": "x7"
                    },
                    {
                        "percent": 85.71428571428571,
                        "label": "pains blancs / boulangerie tr",
                        "valueLabel": "x6"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "1er prix emmental rape ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 57.14285714285714,
                        "label": "chabrior kh kanoe abric ",
                        "valueLabel": "x4"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "kiri gouter 8 portions ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "ids jambon sec italien 6t ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "t budget yrt aromat.",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "pastis 51 45d ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "top budget saint paulin ",
                        "valueLabel": "x3"
                    },
                    {
                        "percent": 42.857142857142854,
                        "label": "gotxoki tomate concasse bte1/2",
                        "valueLabel": "x3"
                    }
                ]
            }
        ]
    },
    {
        "moimois": {
            "date": "2014-03",
            "userName": "John Doe"
        },
        "badges": [ ],
        "numbers": [ ],
        "cursors": [ ],
        "viz": [ ]
    }

]
),*/

    collection: new MoiMoisCollection(),
    template : require('../templates/moilist'),
    
    currentMonth: null,
    events: {
        "click .amonth": "onClickMonth",
        "click #bymail": "onClickShareMail",
    },
    initialize: function() {

        this.listenTo(this.collection, "add", this.onItemAdded);
        this.collection.fetch();

    },

    render: function() {
        this.$el.html(this.template({
//            : this.model.toJSON()
        }));

        /*var self = this;        
        this.collection.forEach(function(model) {
            self.onItemAdded(model);
            });
        */
    },
    
    /*collectionFetch: function() {
        var that = this;
        //that.$el.find('.nodata').hide();

        this.collection.fetch({
            success : function(collection, response, options) {
                //that.showLoader(false);
        
                //if (collection.length == 0) {
                //    that.$el.find('.nodata').show();
                //}
            },
            error: function(collection, response, options) {
                that.stopLoader();
            }
        });
    },*/


    onItemAdded: function(instance) {
        this.$el.find('.moimmonth').append('<a class="amonth" id="bbcid_' + instance.cid + '">' + instance.attributes.moimois.date + '</a> ');
        //this.$el.find('.moimmonth').append('<option value="bbcid_' + instance.cid + '">' + instance.attributes.moimois.date + '</option>');
        //console.log(this.$el.find('.moimmonth').html());
        this.displayMoi(instance);
    },


    onClickMonth: function(ev) {
        var moiId = ev.target.id.split('_')[1];
        var instance = this.collection.get(moiId);
        this.displayMoi(instance);
    },

    displayMoi: function(instance) {
        var moimoisView = new MoiMois({
            model: instance
        });
        moimoisView.render();
        this.$el.find('#moi').html(moimoisView.$el);
        this.month = instance.attributes.moimois.date;
    },

    onClickShareMail: function(ev) {
        $.get(this.month + "/sendmail/");
        console.log(this.month + "/sendmail/ sended.");
    },
    
});

