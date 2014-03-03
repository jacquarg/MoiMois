module.exports = Bargraph = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/bargraphdays'),

    render: function() {
        
        this.$el.html(this.template({
            bargraph: this.model
        }));
        
        for (var i=0;i<7;i++) {
            var bar = this.model.bars[i] ;

            var g = this.$el.find(".d" + i);
            g.children("rect")
                .attr("height", 2 * bar.percent)
                .attr("y", 78.32 + 200 - 2 * bar.percent);

            var txt = g.children("text");
            txt.attr("y", 70 + 200 - 2 * bar.percent);
            txt[0].textContent = bar.label;
        }

    },

});
