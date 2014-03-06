BadgesCollection = require('../collections/badges');
NumbersCollection = require('../collections/numbers');
CursorsCollection = require('../collections/cursors');
BargraphsCollection = require('../collections/bargraphs');
Badge = require('./badge');
NumberViz = require('./numberviz');
Cursor = require('./cursor');
Viz = require('./viz');


module.exports = MoiMois = Backbone.View.extend({

//    tagName: 'div',
    template: require('../templates/moimois'),
    
    _renderGroup: function(data, viewClass, classBase, count) {
        for (var i=0;i<Math.min(count, data.length);i++) {
            var view = new viewClass({ model: data[i] });

            view.render();
            this.$el.find(classBase + i).html(view.$el);
        }

    },
    render: function() {
        this.$el.html(this.template({ mm: this.model.attributes.moimois}));

        // badges
       /* this._renderGroup(this.model.attributes.badges,
            Badge,
            '.badge_',
            3); */

//        for (var i=0;i<3;i++) {
//           var badgeView = new Badge({ model: instance });
//
//            badgeView.render();
//            this.$el.fing('.badge_' + i).html(badgeView.$el);
//        }
        this._renderGroup(this.model.attributes.badges,
            Badge,
            '.badge_',
            3);

        this._renderGroup(this.model.attributes.numbers,
            NumberViz,
            '.number_',
            5);

        this._renderGroup(this.model.attributes.cursors,
            Cursor,
            '.cursor_',
            2);
        
        this._renderGroup(this.model.attributes.viz,
            Viz,
            '.viz_',
            2); 
        // TODO : render spider.

    },
        
});
