americano = require('americano');

module.exports = Receipt = americano.getModel('receipt', {
    'receiptId': String,
    'transactionCode': String,
    'transaction': String,
    'transactionId': String,
    'timestamp': Date,
    'checkoutId': String,
    'checkoutReceiptId': String,
    'cashierId': String,
    'articlesCount': Number,
    'amount': Number,
    'loyaltyBalance': Number,
    'convertedPoints': Number,
    'acquiredPoints': Number,
    'intermarcheShopId': String,
    'total': Number,
    'paidAmound': Number,
    'isOnline': Boolean,
    'snippet': String
});

Receipt.totalsOfMonth = function(month, callback) {
   Receipt.rawRequest(
        "totals", 
        { 
          group_level: 1,
          startkey: [month, null, null],
          endkey: [month, {}, {}],
        },
        function(err, kv) {
            if (err) {
                callback(err, null);
                //TODO defensive ?
            } else if (kv.length == 0) {
                callback("No receipts this month.", null);
            } else {
                callback(null, kv[0].value);    
            }
        }
    );
};

Receipt.upToMonth = function(month, callback) {
     Receipt.request(
        "byDate",
        {
            startkey: [null, null],
            endkey: [month, {}]
        },
        function(err, rs) {
                console.log(err);

            if (err) {
                callback(err, null);
            } else if (rs.length == 0) {
                callback("No receiptdetails", null);
            } else {
                callback(null, rs);
            }
        });
};

