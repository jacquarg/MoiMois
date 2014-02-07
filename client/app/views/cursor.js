module.exports = Badge = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/cursor'),

    render: function() {
        
        this.$el.html(this.template({
            cursor: this.model.toJSON()
        }));
        
        var bal = this.model.attributes.balance * 1.8 ;

        this.$el.find(".aiguille")
            .attr("transform", "rotate(" + bal + ", 153, 149.5)");

    },

});
