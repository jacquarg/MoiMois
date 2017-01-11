BadgesCollection = require('../collections/badges');
NumbersCollection = require('../collections/numbers');
CursorsCollection = require('../collections/cursors');
BargraphsCollection = require('../collections/bargraphs');
Badge = require('./badge');
NumberViz = require('./numberviz');
Cursor = require('./cursor');
Viz = require('./viz');
Ad = require('./ad');


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
        console.log(this.model);
        console.log(this.model.toJSON());
        this.$el.html(this.template({ mm: this.model.toJSON()}));

        // badges
        if (this.model.attributes.badges) {
            this._renderGroup(this.model.attributes.badges,
                Badge,
                '.badge_',
                3);
        }

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
        this._renderGroup(this.model.attributes.ads,
            Ad,
            '.ad_',
            1);
        // TODO : render spider.

    },

});
