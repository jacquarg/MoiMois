module.exports = Ad = Backbone.View.extend({

//    tagName: 'div',
    template: require('../templates/ad'),

    events: {
        'click .frame': 'configureMoreData',
    },

    render: function() {
        this.$el.html(this.template(this.model));
    },

    configureMoreData: function() {
        if (window.confirm(this.model.instructions)) {
            window.open(this.model.link);
        }
    },

});
