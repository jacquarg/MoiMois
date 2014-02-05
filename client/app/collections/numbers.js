
module.exports = Numbers = Backbone.Collection.extend({
    model: require('../models/numberviz'),
    url: 'numbers'
});
