cozydb = require('cozydb');

module.exports = RiskVehicle = cozydb.getModel('riskvehicle', {
    'origin': String,
    'idMesInfos': String,
    'contractId' : String,
    'power': String,
    'parkingType': String,
    'firstRegistrationDate': Date,
    'horsePower': Number,
    'drivingLicenceDate': Date,
    'registrationDate': Date,
    'axaDTEXP': Date,
    'owningDuration': Number,
    'kilometers': Number,
    'prevVehicleAge': Number,
    'axaKMSAN': Number,
    'axaTXBON': Number,
    'registration': String,
    'axaCDGEN': String,
    'tattoo': Boolean,
    'axaIDACH': String,
    'parking': Boolean,
    'fuel': String,
    'axaCDVIL': String,
    'axaCDQUA': Boolean,
    'axaNBEXT': Number,
    'axaCDEXT': Boolean,
    'gearbox': String,
    'axaIDDEP': Boolean,
    'axaCDGAS': Boolean,
    'axaCDGPJ': Boolean,
    'axaCDGRF': Boolean,
    'axaCDIVL': Boolean,
    'axaCDBAG': Boolean,
    'axaCDGNM': Boolean,
    'axaIDGAD': Boolean,
    'axaIDGAG': String,
    'axaCDIPT': Boolean,
    'axaIDGAC': Boolean,
    'axaIDGAT': Boolean,
    'axaIDGDC': Boolean,
    'axaIDCAS': Boolean,
    'axaCDCPP': String,
    'axaCDVEH': String,
    'axaIDGKL': Boolean,
    'axaCDKLM': Boolean,
    'value': Number,
    'axaVALCONVH': Number,
    'axaGPSRA': String,
    'motor': String,
    'axaTYPROUE': String,
    'technicalCheck': Boolean,
    'axaPANMC': Boolean,
});
