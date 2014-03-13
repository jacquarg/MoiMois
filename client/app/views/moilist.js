MoiMoisCollection = require('../collections/moimois');
MoiMois = require('./moimois');

module.exports = MoiList = Backbone.View.extend({
    //el : $( "#allbadges" ),


    collection: new MoiMoisCollection(),
    template : require('../templates/moilist'),
    
    currentMonth: null,
    events: {
        "click .amonth": "onClickMonth",
        "click #bymail": "onClickShareMail",
        //"click #testmail": "sendTestMail",
    },
    initialize: function() {

        this.listenTo(this.collection, "add", this.onItemAdded);
        this.collection.fetch();

    },

    render: function() {
        this.$el.html(this.template({
//            : this.model.toJSON()
        }));

        /*var self = this;        
        this.collection.forEach(function(model) {
            self.onItemAdded(model);
            });
        */
    },
    
    /*collectionFetch: function() {
        var that = this;
        //that.$el.find('.nodata').hide();

        this.collection.fetch({
            success : function(collection, response, options) {
                //that.showLoader(false);
        
                //if (collection.length == 0) {
                //    that.$el.find('.nodata').show();
                //}
            },
            error: function(collection, response, options) {
                that.stopLoader();
            }
        });
    },*/


    onItemAdded: function(instance) {
        this.$el.find('.moimmonth').append('<a class="amonth" id="bbcid_' + instance.cid + '">' + instance.attributes.displayDate + '</a>  ~  ');
        //this.$el.find('.moimmonth').append('<option value="bbcid_' + instance.cid + '">' + instance.attributes.moimois.date + '</option>');
        //console.log(this.$el.find('.moimmonth').html());
        this.displayMoi(instance);
    },


    onClickMonth: function(ev) {
        var moiId = ev.target.id.split('_')[1];
        var instance = this.collection.get(moiId);
        this.displayMoi(instance);
    },

    displayMoi: function(instance) {
        var moimoisView = new MoiMois({
            model: instance
        });
        moimoisView.render();
        this.$el.find('#moi').html(moimoisView.$el);
        this.month = instance.attributes.ofMonth;
    },

    onClickShareMail: function(ev) {
        $.get(this.month + "/sendmail/");
        console.log(this.month + "/sendmail/ sended.");
    },
    
    //sendTestMail: function(ev) {
    //    $.get("test/");
    //    console.log("test mail sended ?");
    //},
});

