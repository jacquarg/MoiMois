americano = require('americano');

module.exports = Vehicle = americano.getModel('vehicle', {
    'origin': String,
    'idMesInfos': String,
    'contractId' : String,
    'power': String,
    'firstRegistrationDate': Date, 
    'horsePower': Number,
    'registrationDate': Date,
    'owningDuration': Number,
    'kilometers': Number,
    'registration': String,
    'axaCDGEN': String,
    'tattoo': Boolean,
    'axaIDACH': String,
    'axaCDACH': String,
    'parking': Boolean,
    'fuel': String,
    'gearbox': String,
    'axaCDVEH': String,
    'value': Number,
    'axaTYPROUE': String,
    'technicalCheck': Boolean,
    'usage': String,

});
