Bargraph = require('./bargraph');
Top3 = require('./top3');
Top5 = require('./top5');

module.exports = Viz = Backbone.View.extend({



//    tagName: 'div',
    template: require('../templates/badge'),

    render: function() {
        var vizMap = {
            "viz_bargraph": Bargraph,
            "viz_top3": Top3,
            "viz_top5": Top5,
        };

        var viewClass = vizMap[this.model.type];
        console.log(this.model.type);
        var view = new viewClass({ model: this.model });
        view.render();
        
        this.$el.html(view.$el);
    },

});
