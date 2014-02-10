module.exports = Bargraph = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/bargraphdays'),

    render: function() {
        
        this.$el.html(this.template({
            bargraph: this.model.toJSON()
        }));
        
        for (var i=0;i<7;i++) {
            var bar = this.model.attributes.bars[i] ;

            var g = this.$el.find(".d" + i);
            g.children("rect")
                .attr("height", 2 * bar.percent)
                .attr("y", 78.32 + 200 - 2 * bar.percent);

            g.children("text")
                .attr("y", 65 + 200 - 2 * bar.percent);
        }

    },

});
