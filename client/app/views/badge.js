module.exports = Badge = Backbone.View.extend({

//    tagName: 'div',
    className: 'col-xs-4',
    template: require('../templates/badge'),

    render: function() {
        this.$el.html(this.template({
            badge: this.model
        }));
    },

});
