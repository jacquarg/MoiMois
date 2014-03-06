module.exports = Cursor = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/cursor'),

    render: function() {
        
        this.$el.html(this.template({
            cursor: this.model
        }));
        
        var bal = this.model.balance * 1.8 ;

        this.$el.find(".aiguille")
            .attr("transform", "rotate(" + bal + ", 153, 149.5)");
                   style="fill:url(#linearGradientBlue);stroke:none"

        this.$el.find(".arc")
            .attr("style", "fill:url(#linearGradient" + this.model.color + ");stroke:none");
    },

});
