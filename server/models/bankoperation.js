moment = require('moment');

OperationType = require('./operationtype');

cozydb = require('cozydb');

log = require('printit')({ prefix: 'BankOperation', date: true});

module.exports = BankOperation = cozydb.getModel('bankoperation', {
    'dateImport': Date,
    'operationTypeID': String,
    'operationType': String,
    'bankAccount': String,
    'date': Date,
    'title': String,
    'raw': String,
    'amount': Number,
});


BankOperation.cast = function(attrs, target) {
  target = cozydb.CozyModel.cast.call(this, attrs, target);
  target.operationType = OperationType.byId[attrs.operationTypeID];
  return target; 
};

BankOperation._family = function(bop) {
    var types = {
        withdrawals: [
         //TODO !
          // SG
          /^CARTE \w+ RETRAIT DAB.* (0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012]).*/g,
          /^CARTE \w+ (0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012]).* RETRAIT DAB.*/g,
          /^CARTE RETRAIT .*/g,
          // CC
          /RETRAIT DAB (0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012]).*/g,
        ],

        //"^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4} ([01][0-9]|2[0-3]):([0-5][0-9])$"
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        // '^CARTE \w+ RETRAIT DAB.* (?P<dd>\d{2})/(?P<mm>\d{2})( (?P<HH>\d+)H(?P<MM>\d+))? (?P<text>.*)'
        // '^CARTE \w+ (?P<dd>\d{2})/(?P<mm>\d{2})( A (?P<HH>\d+)H(?P<MM>\d+))? RETRAIT DAB (?P<text>.*)'
        // '^CARTE RETRAIT (?P<text>.*)'
        //-------- Crédit coopératif /
        // '^(?P<text>RETRAIT DAB) (?P<dd>\d{2})-(?P<mm>\d{2})-([\d\-]+)'
        // '^RETRAIT DAB (?P<dd>\d{2})-(?P<mm>\d{2})-([\d\-]+) (?P<text>.*)'
        // Banque postale
        // '^CARTE \w+ (?P<dd>\d{2})/(?P<mm>\d{2})/(?P<yy>\d{2}) A (?P<HH>\d+)H(?P<MM>\d+) (?P<category>RETRAIT DAB) (?P<text>.*)'
        // '^(?P<category>RETRAIT DAB) (?P<dd>\d{2})/(?P<mm>\d{2})/(?P<yy>\d{2}) (?P<HH>\d+)H(?P<MM>\d+) (?P<text>.*)'
        // 'Remboursements'
        payback: [
          /^CARTE \w+ REMBT (0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012]).*/g,
        ],

        //------------------------------PYTHON PATTERNS--------------------------
        //-------- Société générale
        // '^CARTE \w+ REMBT (?P<dd>\d{2})/(?P<mm>\d{2})( A (?P<HH>\d+)H(?P<MM>\d+))? (?P<text>.*)'
        // BP
        //        (re.compile('^(?P<category>REMBOURST)(?P<text>.*)'), FrenchTransaction.TYPE_PAYBACK),

        // "CB"
        card: [
          /^CARTE \w+ (0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012]) .*/g,
          /^CARTE (0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012]).* \d+ .*/g,
        ],
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        // '^(?P<category>CARTE) \w+ (?P<dd>\d{2})/(?P<mm>\d{2}) (?P<text>.*)'
        // '^(?P<dd>\d{2})(?P<mm>\d{2})/(?P<text>.*?)/?(-[\d,]+)?$'
        //-------- Crédit coopératif / Banque postale
        // '^CARTE (?P<dd>\d{2})(?P<mm>\d{2}) \d+ (?P<text>.*)'
        // BP
        //        (re.compile(r'^(?P<category>ACHAT CB) (?P<text>.*) (?P<dd>\d{2})\.(?P<mm>\d{2}).(?P<yy>\d{2})'),
        //                                                    FrenchTransaction.TYPE_CARD),


        // Banque Postale


        // 'Prélèvements'
        orders: [
          /^(COTISATION|PRELEVEMENT|TELEREGLEMENT|TIP) .*/g,
          /^(PRLV|PRELEVEMENT) .*$/g,
          /^.* QUITTANCE .*/g,
        ],
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        // '^(?P<category>(COTISATION|PRELEVEMENT|TELEREGLEMENT|TIP)) (?P<text>.*)'
        //-------- Crédit coopératif / Banque postale
        // '^(PRLV|PRELEVEMENT) (?P<text>.*?)(- .*)?$'
        // '^(?P<text>.*)( \d+)? QUITTANCE .*'
        // BP
        //        (re.compile('^(?P<category>(PRELEVEMENT DE|TELEREGLEMENT|TIP)) (?P<text>.*)'),
        //                                                    FrenchTransaction.TYPE_ORDER),

        // 'Virements'
        transfer: [
          /^(\d+ )?VIR (PERM )?POUR: (.*?) (REF: \d+ )?MOTIF: (.*)/g,
          /^(VIR(EMEN)?T?) \w+ (.*)/g,
          /^VIR COOPA (0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012]) (.*)/g,
          /^VIR(EMENT|EMT)? (.*?)(- .*)?$/g,
        ],


        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        //'^(\d+ )?VIR (PERM )?POUR: (.*?) (REF: \d+ )?MOTIF: (?P<text>.*)'
        //'^(?P<category>VIR(EMEN)?T? \w+) (?P<text>.*)'
        //-------- Crédit coopératif / Banque postale
        //'^VIR COOPA (?P<dd>\d{2})/(?P<mm>\d{2}) (?P<text>.*)'
        //'^VIR(EMENT|EMT)? (?P<text>.*?)(- .*)?$'
        // BP
        //        (re.compile('^(?P<category>VIR(EMEN)?T?) (DE |POUR )?(?P<text>.*)'),
        //                                                    FrenchTransaction.TYPE_TRANSFER),



        // "Chèques"
        check: [
          /^(CHEQUE) (.*)/g,
          /^CHEQUE.*/g,
        ],
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        //'^(CHEQUE) (?P<text>.*)'
        //-------- Crédit coopératif / Banque postale
        //'^CHEQUE.*'
        // BP
        //    PATTERNS = [(re.compile(u'^(?P<category>CHEQUE) (?P<text>.*)'), FrenchTransaction.TYPE_CHECK),

      // "Frais bancaires"
      bank: [
          /^(FRAIS) (.*)/g,
          /^(AGIOS \/|FRAIS) (.*)/g,
          /^ABONNEMENT (.*)/g,
        ],
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        //'^(FRAIS) (?P<text>.*)'
        //-------- Crédit coopératif / Banque postale
        // '^(AGIOS /|FRAIS) (?P<text>.*)'
        // '^ABONNEMENT (?P<text>.*)'
        // BP
        //        (re.compile('^(?P<category>COMMISSIONS)(?P<text>.*)'), FrenchTransaction.TYPE_BANK),
        //        (re.compile('^(?P<text>(?P<category>REMUNERATION).*)'), FrenchTransaction.TYPE_BANK),

      // "Prêts"
      loan_payment: [
          /^ECHEANCEPRET(.*)/g,
        ],
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        //'^(?P<category>ECHEANCEPRET)(?P<text>.*)'
        // BP
        //        (re.compile('^(?P<category>ECHEANCEPRET)(?P<text>.*)'), FrenchTransaction.TYPE_LOAN_PAYMENT),

      //'Remise de chèques'
      deposit: [
          /^REMISE CHEQUES(.*)/g,
          /^REMISE (.*)/g,
        ],
        //------------------------------PYTHON PATTERNS:-------------------------
        //-------- Société générale
        //'^(?P<category>REMISE CHEQUES)(?P<text>.*)'
        //-------- Crédit coopératif / Banque postale
        //'^REMISE (?P<text>.*)'
        // BP
        //       (re.compile('^(?P<category>REMISE DE CHEQUE) (?P<text>.*)'), FrenchTransaction.TYPE_DEPOSIT),


    };

    for (var opType in types) {
        types[opType].some(function(pattern) {
            if (pattern.test(bop.raw)) {
                bop.family = opType ;
                return true;
            }
          });
    }

};


// BankOperation.afterInitialize = function() {
//     BankOperation._family(this);
// };


BankOperation.ofMonth = function(month, callback) {
    BankOperation.request(
        "byDate",
        {
            startkey: [month, null],
            endkey: [month, {}]
        },
        function(err, instances) {
            if (err) {
                callback(err, null);
            } else if (instances.length == 0) {
                callback("No bankoperations", null);
            } else {
                callback(null, instances);
            }
        }
    );
};


BankOperation.upToMonth = function(month, callback) {
    BankOperation.request(
        "byDate",
        {
            startkey: [null, null],
            endkey: [month, {}]
        },
        function(err, instances) {
            if (err) {
                callback(err, null);
            } else if (instances.length == 0) {
                callback("No bankoperations", null);
            } else {
                callback(null, instances);
            }
        }
    );
};

BankOperation.firstMonth = function(cbNeverErr) {
    BankOperation.request("byDate", { limit: 1 },
        function(err, results) {
            if (err || results.length === 0) {
                log.info("No bank operations", err);
                return cbNeverErr(null, moment().format('YYYY-MM'));
            }
            cbNeverErr(null, moment(results[0].date).format('YYYY-MM'));
        });
}
