BadgesCollection = require('../collections/badges');
NumbersCollection = require('../collections/numbers');
CursorsCollection = require('../collections/cursors');
BargraphsCollection = require('../collections/bargraphs');
MoiMoisCollection = require('../collections/moimois');
Badge = require('./badge');
NumberViz = require('./numberviz');
Cursor = require('./cursor');
Bargraph = require('./bargraph');
Spider = require('./spider');
Top3 = require('./top3');
Top5 = require('./top5');
MoiMois = require('./moimois');

module.exports = AllThingsView = Backbone.View.extend({
    //el : $( "#allbadges" ),
    collection : new MoiMoisCollection(),
    //collection : new BadgesCollection(),
    collectionN : new NumbersCollection(),
    collectionC : new CursorsCollection(),
    collectionB : new BargraphsCollection(),
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
        this.listenTo(this.collection, "add", this.onItemAdded);
        this.collection.fetch();
        //this.listenTo(this.collectionN, "add", this.onNumberVizAdded);
        //this.collectionN.fetch();

//        this.listenTo(this.collectionC, "add", this.onCursorAdded);
//        this.collectionC.fetch();
        //this.listenTo(this.collectionB, "add", this.onBargraphAdded);
        //this.collectionB.fetch();
    },

//    render: function() {
//        this.$el.html(this.template({
//            receipt: this.model.toJSON()
//        }));
//    },
    
    onItemAdded: function(instance) {
        var moimoisView = new MoiMois({
            model: instance
        });
        moimoisView.render();
        this.$el.append(moimoisView.$el);
    },
    
    onNumberVizAdded: function(instance) {
        // render the specific element
        var itemView = new NumberViz({
            model: instance
        });
        itemView.render();
        this.$el.append(itemView.$el);
    },
        
    onCursorAdded: function(instance) {
        // render the specific element
        var itemView = new Cursor({
            model: instance
        });
        itemView.render();
        this.$el.append(itemView.$el);
    },

    onBargraphAdded: function(instance) {
        // render the specific element
        //TODO
        //var itemView = new Bargraph({
        //var itemView = new Spider({
        //var itemView = new Top3({
        var itemView = new Top5({
            model: instance
        });
        itemView.render();
        this.$el.append(itemView.$el);
    },
});

