var ParametersModel = require('../models/parameters');

module.exports = Parameters = Backbone.View.extend({

    template: require('../templates/parameters'),

    model: null, 

    events: {
        'change input': 'save',
    },

    initialize: function() {
        var self = this;
        ParametersModel.fetchSingleton(function(err, model) {
            console.log(model);
            self.model = model;
            self.render();
            self.listenTo(self.model, 'all', self.render);
        });
    },

    render: function() {
        this.$el.html(this.template(this.model ? this.model.toJSON() : {}));        
        return this.$el;
    },

    save: function() {
        this.hold();
        var self = this;
        this.model.save({
            sendMail: this.$el.find('input#inputsendmail').is(':checked'),
        }, { success: this.unHold.bind(this), });
    },

    hold: function() {
        this.$el.find('input').attr('readonly', 'readonly');
    },

    unHold: function() {
        this.$el.find('input').attr('readonly', undefined);
    },


});