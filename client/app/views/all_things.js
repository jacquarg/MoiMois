BadgesCollection = require('../collections/badges');
NumbersCollection = require('../collections/numbers');
Badge = require('./badge');
NumberViz = require('./numberviz');

module.exports = AllTHingsView = Backbone.View.extend({
    //el : $( "#allbadges" ),
    collection : new BadgesCollection(),
    collectionN : new NumbersCollection(),
    //modelView : require('./badge'),
    template : require('../templates/allbadges'),

//    appendView: (view) ->
//        @$el.append view.el

//    tagName: 'div',
//    events: {
        //"click .toggle": "toggleSectionsNoDefault"    
//    },

    initialize: function() {
//        this.collection = new SectionCollection([], { receiptId: this.model.attributes.receiptId });
        //this.listenTo(this.collection, "add", this.onItemAdded);
        //this.collection.fetch();
        this.listenTo(this.collectionN, "add", this.onNumberVizAdded);
        this.collectionN.fetch();
    },

//    render: function() {
//        this.$el.html(this.template({
//            receipt: this.model.toJSON()
//        }));
//    },
    
    onItemAdded: function(instance) {
        // render the specific element
        //badgeView = new this.modelView({
        var badgeView = new Badge({
            model: instance
        });
        badgeView.render();
        this.$el.append(badgeView.$el);
    },
    
    onNumberVizAdded: function(instance) {
        // render the specific element
        var itemView = new NumberViz({
            model: instance
        });
        itemView.render();
        this.$el.append(itemView.$el);
    },
});

