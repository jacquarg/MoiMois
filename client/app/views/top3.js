module.exports = Top3 = Backbone.View.extend({
    
    // Model
    // { title,
    //   bars : [
    //     {percent, valueLabel, label },    
    //   ]
    //

//    tagName: 'div',
    template: require('../templates/top3'),

    render: function() {
        this.$el.html(this.template({
            top3: this.model
        }));

        var tInit = 1 * Math.PI; //rad.
        // M 86.13915685039895,46.75715439829325 A 115.09995,115.09995 0 """0/1""" 1 268.89317,139.87497
        var tMax = 3 / 2 * Math.PI ; // 3/4 de tours.
        var data = [
            //{percent : 20, valueLabel: "x8", label: "Pastiseu" },
        ];

        for (var i=0;i<3;i++) {
            var data = this.model.bars[i] ;
            var arc = this.$el.find(".arc_" + i);
            var R = parseFloat(arc.attr('sodipodi:rx'));
            var cx = parseFloat(arc.attr('sodipodi:cx'));
            var cy = parseFloat(arc.attr('sodipodi:cy'));

            var t = tInit + data.percent * (tMax - tInit) / 100 ;
            // Polaire vers cartesiennes : 
            // x = r * cos(t);
            // y = r * sin(t);
              
            var x = R * Math.cos(t) + cx;
            var y = R * Math.sin(-t) + cy; //repère indirect.
            
            var dStr = arc.attr('d');
            dStr = dStr.slice(dStr.indexOf('A'));
            dStr = "M " + x + ',' + y + ' ' + dStr;
            arc.attr('d', dStr);

            // value str.
            var value = this.$el.find(".value_" + i);
            var marginTop = 10;
            var tv = t + marginTop / R ;

            value.attr('x', R * Math.cos(tv) + cx);
            value.attr('y', R * Math.sin(-tv) + cy);

            value[0].textContent = data.valueLabel;

            this.$el.find('.label_' + i)[0].textContent = data.label ;
        }
    },

});
