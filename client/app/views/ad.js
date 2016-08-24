module.exports = Ad = Backbone.View.extend({

//    tagName: 'div',
    template: require('../templates/ad'),

    render: function() {
        this.$el.html(this.template(this.model));
    },

});
