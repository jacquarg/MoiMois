cozydb = require('cozydb');

module.exports = InsuranceClaim = cozydb.getModel('insuranceclaim', {
    'origin': String,
    'idMesInfos': String,
    'contractId' : String,
    'axaNBSIN0': Number,
    'axaNBSIN1': Number,
    'axaNBSIN2': Number,
    'axaNBSIN3': Number,
    'axaNBSIN4': Number,
    'axaCDRSP': String
});
