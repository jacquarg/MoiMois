module.exports = Bargraph = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/spider'),

    render: function() {
        
        this.$el.html(this.template({
            spider: this.model.toJSON()
        }));

        
        var spider = this.$el.find(".spider");
            
        var R = 175;
        var tInit = 0.29; //rad.
        var nbAxes = 7;
        var cx = 300;
        var cy = 203;
            
        var dStr = "M";
        for (var i=0;i<nbAxes;i++) {
            var t = (tInit + i * 2 * Math.PI / nbAxes) ;
            var r = R * this.model.attributes.bars[i].percent / 100;
                
            var x = r * Math.cos(t) + cx ;
            var y = r * Math.sin(t) + cy ;
                
            dStr += ' ' + x + ',' + y ;
            
            // points précis.
            this.$el.find(".point_" + i)
                .attr("cx", x)
                .attr("cy", y);
            }
            
            dStr += ' z';
            
            spider.attr('d', dStr);
            

        /*for (var i=0;i<7;i++) {
            var bar = this.model.attributes.bars[i] ;

            var g = this.$el.find(".d" + i);
            g.children("rect")
                .attr("height", 2 * bar.percent)
                .attr("y", 78.32 + 200 - 2 * bar.percent);

            var txt = g.children("text");
            txt.attr("y", 70 + 200 - 2 * bar.percent);
            console.log(txt);
            txt[0].textContent = bar.label;
        }*/

    },

});
