(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {

    initialize: function() {
        var Router = require('router');
        this.router = new Router();
        Backbone.history.start();
    }
};
});

;require.register("collections/badges", function(exports, require, module) {
Badge = require('../models/badge');
module.exports = Badges = Backbone.Collection.extend({
    model: Badge,
    url: 'badges'
})

});

;require.register("collections/numbers", function(exports, require, module) {

module.exports = Numbers = Backbone.Collection.extend({
    model: require('../models/numberviz'),
    url: 'numbers'
});

});

;require.register("initialize", function(exports, require, module) {
// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()
});

});

;require.register("models/badge", function(exports, require, module) {
module.exports = Badge = Backbone.Model.extend({

})

});

;require.register("models/numberviz", function(exports, require, module) {
module.exports = NumberViz = Backbone.Model.extend({
});

});

;require.register("router", function(exports, require, module) {
var AppView = require('views/app_view');
//var ReceiptDetailCollection = require('collections/receiptdetails');

//var receiptDetails = new ReceiptDetailCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
  //          collection: receiptDetails
        });
        mainView.render();
    }
});

});

;require.register("templates/allbadges", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div></div>');
}
return buf.join("");
};
});

;require.register("templates/badge", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="mmbadge col-lg-6"><div class="frame"><img');
buf.push(attrs({ 'title':(""), 'src':('img/badges/' + (badge.type) + '_badge.png') }, {"title":true,"src":true}));
buf.push('/><div class="score">');
var __val__ = badge.label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div></div>');
}
return buf.join("");
};
});

;require.register("templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><div id="allbadges"></div></div>');
}
return buf.join("");
};
});

;require.register("templates/numberviz", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="mmnumber col-lg-6"><div class="frame"><div class="lab">');
var __val__ = numberViz.label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><hr/>');
 if (numberViz.type == "vc")
{
buf.push('<div class="vcCount">');
var __val__ = numberViz.count
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
 else if (numberViz.type == "vvc")
{
buf.push('<div class="vvcCount">');
var __val__ = numberViz.count
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="vvcCount2">');
var __val__ = numberViz.count2
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
 else if (numberViz.type == "v")
{
buf.push('<div class="vCount">');
var __val__ = numberViz.count
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
 else if (numberViz.type == "vv")
{
buf.push('<div class="vvCount">');
var __val__ = numberViz.count
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="vvCount2">');
var __val__ = numberViz.count2
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
 if (numberViz.type.indexOf('c') != -1)
{
buf.push('<hr/><div class="labcompare">');
var __val__ = numberViz.compareLabel
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("views/all_things", function(exports, require, module) {
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


});

;require.register("views/allbadges", function(exports, require, module) {
BadgesCollection = require('../collections/badges');

module.exports = AllBadgesView = Backbone.View.extend({
    //el : $( "#allbadges" ),
    collection : new BadgesCollection(),
    modelView : require('./badge'),
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
    },

//    render: function() {
//        this.$el.html(this.template({
//            receipt: this.model.toJSON()
//        }));
//    },
    
    onItemAdded: function(instance) {
        // render the specific element
        badgeView = new this.modelView({
            model: instance
        });
        badgeView.render();
        this.$el.append(badgeView.$el);
    }
    
});


});

;require.register("views/app_view", function(exports, require, module) {
var AllThingsView = require('./all_things');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        //console.log("Initialize")
        
        //update view in db.
        //$.get('touch');
    },
    render: function() {

        // we render the template
        this.$el.html(this.template());

        allbadgesView = new AllThingsView();
        allbadgesView.render();
        this.$el.find('#allbadges').append(allbadgesView.$el);
//        var personView = new PersonView();
//        personView.render();

//        this.$el.find('#fix').append(personView.$el);
    },

});

});

;require.register("views/badge", function(exports, require, module) {
module.exports = Badge = Backbone.View.extend({

//    tagName: 'div',
    template: require('../templates/badge'),

    render: function() {
        this.$el.html(this.template({
            badge: this.model.toJSON()
        }));
    },

});

});

;require.register("views/numberviz", function(exports, require, module) {
module.exports = NumberViz = Backbone.View.extend({

//    tagName: 'div',
    template: require('../templates/numberviz'),

    render: function() {
        this.$el.html(this.template({
            numberViz: this.model.toJSON()
        }));
    },

});

});

;
//# sourceMappingURL=app.js.map