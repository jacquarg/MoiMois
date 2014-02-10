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

;require.register("collections/bargraphs", function(exports, require, module) {
module.exports = Bargraphs = Backbone.Collection.extend({
    model: require('../models/bargraph'),
    url: 'bargraphs'
});

});

;require.register("collections/cursors", function(exports, require, module) {

module.exports = Cursors = Backbone.Collection.extend({
    model: require('../models/cursor'),
    url: 'cursors'
});

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

;require.register("models/bargraph", function(exports, require, module) {
module.exports = Bargraph = Backbone.Model.extend({
});

});

;require.register("models/cursor", function(exports, require, module) {
module.exports = Cursor = Backbone.Model.extend({
});

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

;require.register("templates/bargraphdays", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="mmcursor col-lg-6"><div class="frame"><div class="title">');
var __val__ = bargraph.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="svg"><?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n\n<svg\n   xmlns:dc="http://purl.org/dc/elements/1.1/"\n   xmlns:cc="http://creativecommons.org/ns#"\n   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n   xmlns:svg="http://www.w3.org/2000/svg"\n   xmlns="http://www.w3.org/2000/svg"\n   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n   width="300"\n   height="350"\n   id="svg3582"\n   version="1.1"\n   inkscape:version="0.48.4 r9939"\n   sodipodi:docname="barres.svg">\n  <defs\n     id="defs3584">\n    <clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath226">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 0,841.89 595.28,0 L 595.28,0 0,0 0,841.89 z"\n         id="path228" />\n    </clipPath>\n    <clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath226-9">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 0,841.89 595.28,0 L 595.28,0 0,0 0,841.89 z"\n         id="path228-5" />\n    </clipPath>\n  </defs>\n  <sodipodi:namedview\n     id="base"\n     pagecolor="#ffffff"\n     bordercolor="#666666"\n     borderopacity="1.0"\n     inkscape:pageopacity="0.0"\n     inkscape:pageshadow="2"\n     inkscape:zoom="0.7"\n     inkscape:cx="188.24219"\n     inkscape:cy="60.504537"\n     inkscape:document-units="px"\n     inkscape:current-layer="layer1"\n     showgrid="false"\n     inkscape:window-width="1024"\n     inkscape:window-height="744"\n     inkscape:window-x="0"\n     inkscape:window-y="0"\n     inkscape:window-maximized="1" />\n  <metadata\n     id="metadata3587">\n    <rdf:RDF>\n      <cc:Work\n         rdf:about="">\n        <dc:format>image/svg+xml</dc:format>\n        <dc:type\n           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\n        <dc:title />\n      </cc:Work>\n    </rdf:RDF>\n  </metadata>\n  <g\n     inkscape:label="Calque 1"\n     inkscape:groupmode="layer"\n     id="layer1">\n    <g\n       id="g4476"\n       class="d1">\n      <rect\n         y="84.750282"\n         x="30.000406"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24"\n         style="fill:#ec6652;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0"\n         y="73.295998"\n         x="18.563999"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:middle;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#ec6652;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve">45</text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-317.44095"\n       y="42.556408"\n       id="text4003"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005"\n         x="-317.44095"\n         y="42.556408">Lundi</tspan></text>\n    <g\n       id="g4484"\n       class="d2">\n      <rect\n         y="84.750282"\n         x="70.850471"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-4"\n         style="fill:#f49c82;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-0"\n         y="73.295998"\n         x="55.253979"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#f49c82;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"><tspan\n           y="73.295998"\n           x="55.253979"\n           id="tspan3948-6-7"\n           sodipodi:role="line">45 min</tspan></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-319.49753"\n       y="83.406471"\n       id="text4003-2"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-6"\n         x="-319.49753"\n         y="83.406471">Mardi</tspan></text>\n    <g\n       id="g4492"\n       class="d3">\n      <rect\n         y="84.750282"\n         x="107.54045"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-0"\n         style="fill:#2f6f7f;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-3"\n         y="73.295998"\n         x="91.943962"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#2f6f7f;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"><tspan\n           y="73.295998"\n           x="91.943962"\n           id="tspan3948-6-3"\n           sodipodi:role="line">45 min</tspan></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-336.71237"\n       y="120.09645"\n       id="text4003-20"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-2"\n         x="-336.71237"\n         y="120.09645">Mercredi</tspan></text>\n    <g\n       id="g4500"\n       class="d4">\n      <rect\n         y="84.750282"\n         x="144.23047"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-1"\n         style="fill:#51bfcd;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-1"\n         y="73.295998"\n         x="128.63397"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#51bfcd;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"><tspan\n           y="73.295998"\n           x="128.63397"\n           id="tspan3948-6-4"\n           sodipodi:role="line">45 min</tspan></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-313.96231"\n       y="156.78647"\n       id="text4003-5"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-8"\n         x="-313.96231"\n         y="156.78647">Jeudi</tspan></text>\n    <g\n       id="g4508"\n       class="d5">\n      <rect\n         y="84.750282"\n         x="180.92043"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-5"\n         style="fill:#cae6e4;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-5"\n         y="73.295998"\n         x="165.32393"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#cae6e4;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"><tspan\n           y="73.295998"\n           x="165.32393"\n           id="tspan3948-6-1"\n           sodipodi:role="line">45 min</tspan></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-336.02682"\n       y="193.47643"\n       id="text4003-8"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-1"\n         x="-336.02682"\n         y="193.47643">Vendredi</tspan></text>\n    <g\n       id="g4516"\n       class="d6">\n      <rect\n         y="84.750282"\n         x="217.61044"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-15"\n         style="fill:#6eaaa6;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-9"\n         y="73.295998"\n         x="202.01393"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#6eaaa6;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"><tspan\n           y="73.295998"\n           x="202.01393"\n           id="tspan3948-6-8"\n           sodipodi:role="line">45 min</tspan></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-327.54636"\n       y="230.16644"\n       id="text4003-1"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-60"\n         x="-327.54636"\n         y="230.16644">Samedi</tspan></text>\n    <g\n       id="g4524"\n       class="d0">\n      <rect\n         y="84.750282"\n         x="254.30042"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-8"\n         style="fill:#268365;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-8"\n         y="73.295998"\n         x="238.70392"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#268365;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"><tspan\n           y="73.295998"\n           x="238.70392"\n           id="tspan3948-6-9"\n           sodipodi:role="line">45 min</tspan></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-342.827"\n       y="266.84991"\n       id="text4003-9"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-15"\n         x="-342.827"\n         y="266.84991">Dimanche</tspan></text>\n  </g>\n</svg>\n</div></div></div>');
}
return buf.join("");
};
});

;require.register("templates/cursor", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="mmcursor col-lg-6"><div class="frame"><div class="title">Ce mois-ci vous avez été plutôt</div><div class="svg"><svg\n   width="300"\n   height="200"\n   id="svg8494"\n   version="1.1"\n   >\n  <defs\n     id="defs8496">\n    <!--clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath66">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 74.022,479.847 c -6.197,-2.006 -11.848,-4.925 -16.851,-8.549 l 0,0 c -5.196,-3.763 -9.693,-8.289 -13.384,-13.37 l 0,0 c -3.718,-5.116 -6.615,-10.795 -8.582,-16.808 l 0,0 c -1.947,-5.971 -2.978,-12.273 -2.977,-18.691 l 0,0 10.078,-0.004 c -0.004,5.35 0.845,10.602 2.462,15.577 l 0,0 c 1.633,5.016 4.044,9.752 7.139,14.022 l 0,0 c 3.071,4.236 6.819,8.016 11.151,11.155 l 0,0 c 4.171,3.023 8.883,5.455 14.054,7.131 l 0,0 c 5.171,1.676 10.416,2.466 15.566,2.462 l 0,0 c 5.348,-0.004 10.602,-0.866 15.573,-2.497 l 0,0 c 5.013,-1.645 9.74,-4.067 14.003,-7.175 l 0,0 c 4.228,-3.083 7.997,-6.84 11.13,-11.174 l 0,0 c 3.007,-4.167 5.427,-8.869 7.1,-14.025 l 0,0 c 1.671,-5.159 2.463,-10.385 2.471,-15.524 l 0,0 10.076,-0.004 c 0,6.169 -0.949,12.447 -2.956,18.636 l 0,0 c -2.003,6.191 -4.914,11.831 -8.531,16.831 l 0,0 c -3.762,5.198 -8.291,9.7 -13.371,13.393 l 0,0 c -5.117,3.721 -10.793,6.62 -16.808,8.586 l 0,0 c -5.967,1.952 -12.262,2.981 -18.679,2.985 l 0,0 c -6.177,0.001 -12.463,-0.949 -18.664,-2.957"\n         id="path68" />\n    </clipPath-->\n    <linearGradient\n       x1="0"\n       y1="0"\n       x2="1"\n       y2="0"\n       gradientUnits="userSpaceOnUse"\n       gradientTransform="matrix(120.80273,0,0,-120.80273,229.19043,452.58838)"\n       spreadMethod="pad"\n       id="linearGradient130">\n      <stop\n         style="stop-opacity:1;stop-color:#f49c82"\n         offset="0"\n         id="stop132" />\n      <stop\n         style="stop-opacity:1;stop-color:#ec6651"\n         offset="1"\n         id="stop134" />\n    </linearGradient>\n    <linearGradient\n       inkscape:collect="always"\n       xlink:href="#linearGradient130"\n       id="linearGradientRed"\n       gradientUnits="userSpaceOnUse"\n       gradientTransform="matrix(239.99974,0,0,239.99974,30.000743,89.97234)"\n       spreadMethod="pad"\n       x1="0"\n       y1="0"\n       x2="1"\n       y2="0" />\n    <linearGradient\n       x1="0"\n       y1="0"\n       x2="1"\n       y2="0"\n       gradientUnits="userSpaceOnUse"\n       gradientTransform="matrix(120.80273,0,0,-120.80273,32.228516,452.58838)"\n       spreadMethod="pad"\n       id="linearGradient74">\n      <stop\n         style="stop-opacity:1;stop-color:#51bfcd"\n         offset="0"\n         id="stop76" />\n      <stop\n         style="stop-opacity:1;stop-color:#2f6f7f"\n         offset="1"\n         id="stop78" />\n    </linearGradient>\n    <linearGradient\n       inkscape:collect="always"\n       xlink:href="#linearGradient74"\n       id="linearGradientBlue"\n       gradientUnits="userSpaceOnUse"\n       gradientTransform="matrix(239.99974,0,0,239.99974,30.000743,89.97234)"\n       spreadMethod="pad"\n       x1="0"\n       y1="0"\n       x2="1"\n       y2="0" />\n  </defs>\n  <g\n     inkscape:label="Layer 1"\n     inkscape:groupmode="layer"\n     id="layer1">\n    <path\n       d="m 113.03219,35.81742 c -12.31163,3.98534 -23.538519,9.78454 -33.478018,16.98436 l 0,0 C 69.231238,60.27776 60.297013,69.26961 52.964075,79.36407 l 0,0 c -7.386581,10.16399 -13.142074,21.44652 -17.049927,33.39259 l 0,0 c -3.868121,11.86263 -5.916417,24.38286 -5.91443,37.13355 l 0,0 20.022041,0.008 c -0.0079,-10.62889 1.678769,-21.06308 4.891276,-30.94695 l 0,0 c 3.244294,-9.96533 8.034246,-19.37437 14.183107,-27.85761 l 0,0 c 6.10118,-8.41571 13.54736,-15.92546 22.153779,-22.16174 l 0,0 C 99.53648,62.92632 108.89786,58.09464 119.17111,54.76492 l 0,0 c 10.27327,-3.32972 20.69356,-4.89922 30.9251,-4.89127 l 0,0 c 10.62492,0.008 21.06308,1.72049 30.939,4.9608 l 0,0 c 9.95937,3.26814 19.35053,8.07995 27.81987,14.25464 l 0,0 c 8.3998,6.12502 15.88771,13.58907 22.11206,22.19946 l 0,0 c 5.97403,8.27862 10.78187,17.62012 14.10562,27.86359 l 0,0 c 3.31979,10.24942 4.89327,20.63196 4.90916,30.84165 l 0,0 20.01807,0.008 c 0,-12.25601 -1.88539,-24.72856 -5.87271,-37.02429 l 0,0 c -3.97937,-12.29972 -9.76268,-23.50475 -16.9486,-33.43829 l 0,0 c -7.474,-10.3269 -16.47179,-19.27106 -26.56427,-26.60797 l 0,0 C 210.44842,45.5387 199.17187,39.77924 187.22182,35.87336 l 0,0 c -11.85469,-3.87805 -24.36101,-5.92237 -37.10971,-5.93032 l 0,0 c -12.2719,-0.002 -24.76034,1.88539 -37.07992,5.87469"\n       style="fill:url(#linearGradientBlue);stroke:none"\n       id="path80"\n       class="arc" />\n    <path\n       id="path92"\n       style="fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none"\n       d="m 173.80816,149.89452 c 0,11.10569 -8.99979,20.10548 -20.09753,20.10548 -11.10372,0 -20.09953,-8.99979 -20.09953,-20.10548 0,-11.09775 8.99581,-20.09555 20.09953,-20.09555 11.09774,0 20.09753,8.9978 20.09753,20.09555" />\n    <path\n       id="path96"\n       style="fill:#5c5c5b;fill-opacity:1;fill-rule:nonzero;stroke:none"\n       d="m 152.21424,162.95473 c -7.20777,-1.00528 -12.23812,-7.66472 -11.23681,-14.87845 1.00328,-7.20381 7.6667,-12.23216 14.87248,-11.22887 7.20778,1.00726 12.24012,7.66273 11.23683,14.87249 -1.00329,7.20579 -7.66671,12.23414 -14.8725,11.23483" />\n    <path\n       id="path100"\n       class="aiguille"\n       style="fill:#5c5c5b;fill-opacity:1;fill-rule:nonzero;stroke:none"\n       d="m 152.46172,146.74252 -150.68472,3.817 146.01435,1.86607" />\n    <path\n       id="path104"\n       style="fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none"\n       d="m 154.54047,146.26062 c -2.01253,-0.2841 -3.86812,1.11852 -4.15221,3.13304 -0.28013,2.01055 1.12448,3.86812 3.13502,4.14825 2.01452,0.28211 3.87011,-1.12448 4.15222,-3.13503 0.2841,-2.01452 -1.12448,-3.86812 -3.13503,-4.14626" />\n  </g>\n</svg>\n</div><div class="minLabel">');
var __val__ = cursor.minLabel
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="maxLabel">');
var __val__ = cursor.maxLabel
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
CursorsCollection = require('../collections/cursors');
BargraphsCollection = require('../collections/bargraphs');
Badge = require('./badge');
NumberViz = require('./numberviz');
Cursor = require('./cursor');
Bargraph = require('./bargraph');

module.exports = AllThingsView = Backbone.View.extend({
    //el : $( "#allbadges" ),
    collection : new BadgesCollection(),
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
        //this.listenTo(this.collection, "add", this.onItemAdded);
        //this.collection.fetch();
        //this.listenTo(this.collectionN, "add", this.onNumberVizAdded);
        //this.collectionN.fetch();

//        this.listenTo(this.collectionC, "add", this.onCursorAdded);
//        this.collectionC.fetch();
        this.listenTo(this.collectionB, "add", this.onBargraphAdded);
        this.collectionB.fetch();
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
        var itemView = new Bargraph({
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

;require.register("views/bargraph", function(exports, require, module) {
module.exports = Bargraph = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/bargraphdays'),

    render: function() {
        
        this.$el.html(this.template({
            bargraph: this.model.toJSON()
        }));
        
        for (var i=0;i<7;i++) {
            var bar = this.model.attributes.bars[i] ;

            var g = this.$el.find(".d" + i);
            g.children("rect")
                .attr("height", 2 * bar.percent)
                .attr("y", 78.32 + 200 - 2 * bar.percent);

            g.children("text")
                .attr("y", 65 + 200 - 2 * bar.percent);
        }

    },

});

});

;require.register("views/cursor", function(exports, require, module) {
module.exports = Badge = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/cursor'),

    render: function() {
        
        this.$el.html(this.template({
            cursor: this.model.toJSON()
        }));
        
        var bal = this.model.attributes.balance * 1.8 ;

        this.$el.find(".aiguille")
            .attr("transform", "rotate(" + bal + ", 153, 149.5)");
                   style="fill:url(#linearGradientBlue);stroke:none"

        this.$el.find(".arc")
            .attr("style", "fill:url(#linearGradient" + this.model.attributes.color + ");stroke:none");
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