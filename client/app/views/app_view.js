//var AllThingsView = require('./all_things');
var MoiList = require('./moilist');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        //console.log("Initialize")
        
        //update view in db.
        //$.get('touch');
    },

    events : {
        "click #splash": "toggleSplash"
    
    },
    render: function() {

        // we render the template
        this.$el.html(this.template());

//        allbadgesView = new AllThingsView();
//        allbadgesView.render();
        moilist = new MoiList();
        moilist.render();
        this.$el.find('#allbadges').append(moilist.$el);
//        var personView = new PersonView();
//        personView.render();

//        this.$el.find('#fix').append(personView.$el);
    },

    toggleSplash: function() {
        //this.$el.find('#splash').css('display: none;');
        this.$el.find('#splash').hide();
        //this.$el.find('#allbadges').css('display: block;');
        this.$el.find('#allbadges').show();
    },

});
