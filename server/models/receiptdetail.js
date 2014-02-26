americano = require('americano');

module.exports = ReceiptDetail = americano.getModel('receiptdetail', {
 'origin': String,
 'order': Number,
 'barcode': String,
 'label': String,
 'family': String,
 'familyLabel': String,
 'section': String,
 'sectionLabel': String,
 'amount': Number,
 'price': Number,
 'type': String,
 'typeLabel': String,
 'receiptId': String,
 'intermarcheShopId': String,
 'timestamp': Date,
 'isOnlineBuy': Boolean,

//
 'aggregatedSection': String,
 'quantityUnit': String,
 'quantityAmount': Number,
 'quantityWeight': String,
 'quantityLabel': String,
 'name': String,
 'computedWeight' : Number, // kg (kilogrammes)
 'computedVolume': Number,  // L (Litter).


 });

ReceiptDetail.touch = function() {
    var cbGen = function(reqName) {
        var startTime = Date.now();

        return function() {
            console.log("Touch " + reqName + " in " + (Date.now() - startTime) + "ms");
        };
    }

    var params = { 
        limit: 1,
        reduce: false
    };

    ReceiptDetail.rawRequest("byBarcode", params, cbGen("receiptdetail/byBarcode"));
    ReceiptDetail.rawRequest("byReceiptId", params, cbGen("receiptdetail/byReceiptId"));  
    ReceiptDetail.rawRequest("totalsByMonthBySection", params, cbGen("receiptdetail/totalsByMonthBySection"));
    ReceiptDetail.rawRequest("totalsByMonthByProduct", params, cbGen("receiptdetail/totalsByMonthByProduct"));

};


ReceiptDetail._ean13CheckSum = function(rdet) {
    if (rdet.barcode && rdet.barcode.length == 12) {
        // last checksum digit is needed
        // cf : http://fr.wikipedia.org/wiki/Code-barres_EAN#Cl.C3.A9_de_contr.C3.B4le
        
        var even = 0 ;
        var odd = 0 ;

        for (var i=0; i<6; i++) {
            odd += parseInt(rdet.barcode[2 * i]);
            even += parseInt(rdet.barcode[2 * i + 1]);
        }
        var checksum = 10 - ( 3 * even + odd ) % 10 ;

        rdet.barcode = rdet.barcode + checksum.toString() ;
    }
};

ReceiptDetail._enrichReceiptDetail = function(rdet) {
                // Parse quantity
                // Match parterns : 3x20cl ; 8x1l ; 70cl ; 6x50 cl ; 180gx3
                
                // 3x : (\d+)x
                // 3x or not : (?:(\d+)x|())
                // 
                // units : (cl|g|l|ml|m)
                //
                // x3 : (?:x(\d+)|())
                
                // g1 : mult
                // g2 : quantity
                // g3 : unit
                // g4 : mult

    reg = /(?:(\d+)x|)(\d+)(cl|g|l|ml|m|kg)(?:x(\d+)|)/i ;
    
    unitMap = {
        "CL": "cL",
        "ML": "mL",
        "M": "mL",
        "L": "L", 
        "G": "g",
        "KG": "kg",
    }
    
    grs = reg.exec(rdet.label);
    if (grs) {
        
        rdet.quantityUnit = (grs[3] in unitMap) ? unitMap[grs[3]] : grs[3] ;
        rdet.quantityAmount = parseInt(grs[1]?grs[1]:grs[4]);
        rdet.quantityWeight = parseInt(grs[2]);
        rdet.quantityLabel = grs[0];

        if (rdet.quantityAmount) {
            rdet.quantityTotalWeight = rdet.quantityWeight * rdet.quantityAmount;

            rdet.quantityLabel = rdet.quantityAmount + "x" + rdet.quantityWeight + rdet.quantityUnit;
        } else {
            rdet.quantityTotalWeight = rdet.quantityWeight;   

            rdet.quantityLabel = rdet.quantityWeight + rdet.quantityUnit;
        }
        
        if (rdet.quantityUnit == 'cL') {
            rdet.computedWeight = rdet.quantityTotalWeight *  0.01 ;
            rdet.computedVolume = rdet.quantityTotalWeight * 0.01 ;
        } else if (rdet.quantityUnit == 'mL'
            || rdet.quantityUnit == 'g' ) {
            rdet.computedWeight = rdet.quantityTotalWeight * 0.001 ;
            rdet.computedVolume = rdet.quantityTotalWeight * 0.001 ;
        } else if (rdet.quantityUnit == 'L' 
            || rdet.quantityUnit == 'kg' ) {
            rdet.computedWeight = rdet.quantityTotalWeight ;
            rdet.computedVolume = rdet.quantityTotalWeight ;
        }
        
        
       
        // remove from label 
        //rdet.name = rdet.label.substring(grs['index'], grs[0].length);
        rdet.name = rdet.label.substring(0, grs['index']);


    } else if (rdet.label == "NR" || rdet.label == "NA" || !rdet.label ) {
        rdet.name = rdet.familyLabel;
    } else {
        rdet.name = rdet.label;
    }
    
    // Vegetables !!
    if (rdet.section == '34') {
         rdet.computedWeight = rdet.price / 3.0 ; // prix moyen 3.0 E/kg.
         rdet.computedVolume = rdet.computedWeight ; // Water density.

    }

    
    // Clean name look.
    // to lower.
    // points -> spaces.
    if (rdet.name) {
        rdet.name = rdet.name.toLowerCase().replace('.', ' ');
    }

    rdet.aggregatedSection = ReceiptDetail.aggregateSections(rdet.section);
    
    //console.log(rdet.label);
    //console.log(rdet.name);
    //console.log(rdet.quantityLabel);
    //console.log('/n');

    return rdet;
};


ReceiptDetail.afterInitialize = function() {
    ReceiptDetail._enrichReceiptDetail(this);
    ReceiptDetail._ean13CheckSum(this);

};


ReceiptDetail.sectionsIdLabelMap = {
'12' :'BOUL PAT TRAD',
'10' :'FROMAGE TRAD',
'70' :'NON COMMERCIALE',
'38' :'SURGELES',
'66' :'PRESTATION DE SERVICE',
'50' :'TEXTILE',
'28' :'SAURISSERIE',
'44' :'ALIMENTATION POUR ANIMAUX',
'48' :'D.P.H.',
'60' :'BAZAR LEGER',
'30' :'CREMERIE LS',
'22' :'BOUCHERIE FRAIS EMB.',
'32' :'PAIN PAT LS INDUS',
'20' :'BOUCHERIE LS',
'34' :'FRUITS ET LEGUMES',
'26' :'CHARCUTERIE TRAITEUR LS',
'36' :'FLEURS ET PLANTES',
'24' :'VOLAILLE LS',
'2' :'BOUCHERIE / VOLAILLE TRAD',
'46' :'LIQUIDES',
'4' :'CHARCUTERIE TRAD',
'6' :'TRAITEUR TRAD',
'88' :'BOUTIQUE SERVICES',
'8' :'PRODUITS DE LA MER TRAD',
'40' :'EPICERIE SUCREE',
'42' :'EPICERIE SALEE',
'64' :'PRODUITS CULTURELS',
'80' :'BOUTIQUE STATION',
'82' :'BOUTIQUE PRESSE',
'62' :'BAZAR TECHNIQUE',
'200': 'BOUCHERIE',
'120': 'BOULANGERIE',
'260': 'CHARCUTERIE',
'280': 'POISSONERIE'
};

ReceiptDetail.getSectionLabel = function(sectionId) {
    var sectionId = String(sectionId);
    if (sectionId in ReceiptDetail.sectionsIdLabelMap) {
        return ReceiptDetail.sectionsIdLabelMap[sectionId];
    } else {
        return 'AUTRE';
    }

};

ReceiptDetail.aggregateSections = function(sectionId) {

    var aggSectionMap = {

        //"VOLAILLE LS": "BOUCHERIE",
        '24': '200',
        //"BOUCHERIE LS": "BOUCHERIE",
        '20': '200',
        //"BOUCHERIE FRAIS EMB.": "BOUCHERIE",
        '22': '200', 
        //"BOUCHERIE / VOLAILLE TRAD": "BOUCHERIE",
        '2': '200',

        //"BOUL PAT TRAD": "BOULANGERIE",
        '12': '120',
        //"PAIN PAT LS INDUS": "BOULANGERIE",
        '32': '120',

        //"CHARCUTERIE TRAITEUR LS": "CHARCUTERIE",
        '26': '260',
        //"CHARCUTERIE TRAD": "CHARCUTERIE",
        '4': '260',

        //"PRODUITS DE LA MER TRAD": "POISSONERIE",
        '8': '280',
        //"SAURISSERIE": "POISSONERIE"
        '28': '280',

    };
    if (sectionId in aggSectionMap) {
        return aggSectionMap[sectionId];
    } else {
        return sectionId;
    }
};

ReceiptDetail.ofMonth = function(month, callback) {
    ReceiptDetail.request(
        "byDate", 
        {
            startkey: [month, null, null],
            endkey: [month, {}, {}]
        },
        function(err, instances) {
            if (err) {
                callback(err, null);
            } else if (instances.length == 0) {
                callback("No receiptdetails", null);
            } else {
                callback(null, instances);
            }
        }
        
    );
};

/*ReceiptDetail.getOneByBarCode = function(barcode, callback) {
    ReceiptDetail.request(
        "byBarcode", 
        { key: barcode, limit: 1 },
        callback
    );
}; 


ReceiptDetail.withReceiptId = function(receiptId, callback) {
    ReceiptDetail.request(
        "byReceiptId", 
        { keys: [receiptId,  receiptId.slice(0, -1)] },
        function(err, instances) {
            callback(null, instances);
        }
    );
};


/*ReceiptDetail.sectionsTotalsOfMonth = function(month, callback) {
   ReceiptDetail.rawRequest(
        "totalsByMonthBySection", 
        {
             group: true,
             startkey: [month, null],
             endkey: [month, {}]
        },
        callback
    );
};


ReceiptDetail.mostBoughtProductOfMonth = function(month, callback) {
   ReceiptDetail.rawRequest(
        "totalsByMonthByProduct", 
        {
         descending: false,
         group: true,
         startkey: [month, null],
         endkey: [month, {}]
        },
        function(err, kvs) {
            if (err) {
                callback(err, null);
            } else {
                if (kvs.length == 0) {
                    callback(null, null);

                } else {
                    var max = kvs[0];
                    for (var idx=0; idx<kvs.length; idx++) {
                        if (max.value.count < kvs[idx].value.count) {
                            max = kvs[idx];
                        }
                    }
                    callback(null, max);
                }
            }
        });
}
*/
