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
buf.push('<div class="mmbargraph col-lg-6"><div class="frame"><div class="title">');
var __val__ = bargraph.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="svg"><?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n\n<svg\n   xmlns:dc="http://purl.org/dc/elements/1.1/"\n   xmlns:cc="http://creativecommons.org/ns#"\n   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n   xmlns:svg="http://www.w3.org/2000/svg"\n   xmlns="http://www.w3.org/2000/svg"\n   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n   width="300"\n   height="350"\n   id="svg3582"\n   version="1.1"\n   inkscape:version="0.48.4 r9939"\n   sodipodi:docname="barres.svg">\n  <defs\n     id="defs3584">\n    <clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath226">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 0,841.89 595.28,0 L 595.28,0 0,0 0,841.89 z"\n         id="path228" />\n    </clipPath>\n    <clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath226-9">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 0,841.89 595.28,0 L 595.28,0 0,0 0,841.89 z"\n         id="path228-5" />\n    </clipPath>\n  </defs>\n  <sodipodi:namedview\n     id="base"\n     pagecolor="#ffffff"\n     bordercolor="#666666"\n     borderopacity="1.0"\n     inkscape:pageopacity="0.0"\n     inkscape:pageshadow="2"\n     inkscape:zoom="0.7"\n     inkscape:cx="188.24219"\n     inkscape:cy="60.504537"\n     inkscape:document-units="px"\n     inkscape:current-layer="layer1"\n     showgrid="false"\n     inkscape:window-width="1024"\n     inkscape:window-height="744"\n     inkscape:window-x="0"\n     inkscape:window-y="0"\n     inkscape:window-maximized="1" />\n  <metadata\n     id="metadata3587">\n    <rdf:RDF>\n      <cc:Work\n         rdf:about="">\n        <dc:format>image/svg+xml</dc:format>\n        <dc:type\n           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\n        <dc:title />\n      </cc:Work>\n    </rdf:RDF>\n  </metadata>\n  <g\n     inkscape:label="Calque 1"\n     inkscape:groupmode="layer"\n     id="layer1">\n    <g\n       id="g4476"\n       class="d1">\n      <rect\n         y="84.750282"\n         x="30.000406"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24"\n         style="fill:#ec6652;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0"\n         y="73.295998"\n         x="37.563999"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#ec6652;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-317.44095"\n       y="42.556408"\n       id="text4003"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005"\n         x="-317.44095"\n         y="42.556408">Lundi</tspan></text>\n    <g\n       id="g4484"\n       class="d2">\n      <rect\n         y="84.750282"\n         x="70.850471"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-4"\n         style="fill:#f49c82;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-0"\n         y="73.295998"\n         x="78.253979"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#f49c82;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-319.49753"\n       y="83.406471"\n       id="text4003-2"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-6"\n         x="-319.49753"\n         y="83.406471">Mardi</tspan></text>\n    <g\n       id="g4492"\n       class="d3">\n      <rect\n         y="84.750282"\n         x="107.54045"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-0"\n         style="fill:#2f6f7f;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-3"\n         y="73.295998"\n         x="115.0"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#2f6f7f;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-336.71237"\n       y="120.09645"\n       id="text4003-20"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-2"\n         x="-336.71237"\n         y="120.09645">Mercredi</tspan></text>\n    <g\n       id="g4500"\n       class="d4">\n      <rect\n         y="84.750282"\n         x="144.23047"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-1"\n         style="fill:#51bfcd;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-1"\n         y="73.295998"\n         x="151.50"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#51bfcd;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-313.96231"\n       y="156.78647"\n       id="text4003-5"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-8"\n         x="-313.96231"\n         y="156.78647">Jeudi</tspan></text>\n    <g\n       id="g4508"\n       class="d5">\n      <rect\n         y="84.750282"\n         x="180.92043"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-5"\n         style="fill:#cae6e4;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-5"\n         y="73.295998"\n         x="188.3"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#cae6e4;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-336.02682"\n       y="193.47643"\n       id="text4003-8"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-1"\n         x="-336.02682"\n         y="193.47643">Vendredi</tspan></text>\n    <g\n       id="g4516"\n       class="d6">\n      <rect\n         y="84.750282"\n         x="217.61044"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-15"\n         style="fill:#6eaaa6;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-9"\n         y="73.295998"\n         x="215.9"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#6eaaa6;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-327.54636"\n       y="230.16644"\n       id="text4003-1"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-60"\n         x="-327.54636"\n         y="230.16644">Samedi</tspan></text>\n    <g\n       id="g4524"\n       class="d0">\n      <rect\n         y="84.750282"\n         x="254.30042"\n         height="193.57141"\n         width="15.7"\n         id="rect3105-24-8"\n         style="fill:#268365;fill-opacity:1" />\n      <text\n         sodipodi:linespacing="125%"\n         id="text3946-0-8"\n         y="73.295998"\n         x="261.6"\n         style="font-size:16px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#268365;fill-opacity:1;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic Medium"\n         xml:space="preserve"></text>\n    </g>\n    <text\n       xml:space="preserve"\n       style="font-size:13px;font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;text-align:start;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook Medium"\n       x="-342.827"\n       y="266.84991"\n       id="text4003-9"\n       sodipodi:linespacing="125%"\n       transform="matrix(0,-1,1,0,0,0)"><tspan\n         sodipodi:role="line"\n         id="tspan4005-15"\n         x="-342.827"\n         y="266.84991">Dimanche</tspan></text>\n  </g>\n</svg>\n</div></div></div>');
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

;require.register("templates/spider", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="mmspider col-lg-12"><div class="frame"><div class="title">');
var __val__ = spider.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="svg"><?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n\n<svg\n   xmlns:dc="http://purl.org/dc/elements/1.1/"\n   xmlns:cc="http://creativecommons.org/ns#"\n   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n   xmlns:svg="http://www.w3.org/2000/svg"\n   xmlns="http://www.w3.org/2000/svg"\n   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n   width="600"\n   height="400"\n   id="svg3654"\n   version="1.1"\n   inkscape:version="0.48.4 r9939"\n   sodipodi:docname="spider.svg">\n  <defs\n     id="defs3656">\n    <clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath92">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 0,841.89 595.28,0 L 595.28,0 0,0 0,841.89 z"\n         id="path94" />\n    </clipPath>\n    <clipPath\n       clipPathUnits="userSpaceOnUse"\n       id="clipPath104">\n      <path\n         inkscape:connector-curvature="0"\n         d="m 132.158,694.138 110.2,0 0,-91.043 -110.2,0 0,91.043 z"\n         id="path106" />\n    </clipPath>\n  </defs>\n  <sodipodi:namedview\n     id="base"\n     pagecolor="#ffffff"\n     bordercolor="#666666"\n     borderopacity="1.0"\n     inkscape:pageopacity="0.0"\n     inkscape:pageshadow="2"\n     inkscape:zoom="2.191254"\n     inkscape:cx="159.127"\n     inkscape:cy="274.95992"\n     inkscape:current-layer="layer1"\n     inkscape:document-units="px"\n     showgrid="false"\n     inkscape:window-width="1920"\n     inkscape:window-height="1056"\n     inkscape:window-x="0"\n     inkscape:window-y="0"\n     inkscape:window-maximized="1" />\n  <metadata\n     id="metadata3659">\n    <rdf:RDF>\n      <cc:Work\n         rdf:about="">\n        <dc:format>image/svg+xml</dc:format>\n        <dc:type\n           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\n        <dc:title></dc:title>\n      </cc:Work>\n    </rdf:RDF>\n  </metadata>\n  <g\n     id="layer1"\n     inkscape:label="Layer 1"\n     inkscape:groupmode="layer">\n    <g\n       id="g24"\n       transform="matrix(1.8369426,0,0,-1.8369426,459.67964,250.02152)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 18.322,0"\n         style="fill:none;stroke:#51bfcd;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path26" />\n    </g>\n    <g\n       id="g28"\n       transform="matrix(1.8369426,0,0,-1.8369426,439.12352,107.38219)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 18.322,0"\n         style="fill:none;stroke:#2f6f7f;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path30" />\n    </g>\n    <g\n       id="g32"\n       transform="matrix(1.8369426,0,0,-1.8369426,300.33753,202.41164)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 86.868,-26.365"\n         style="fill:none;stroke:#51bfcd;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path34" />\n    </g>\n    <g\n       id="g36"\n       transform="matrix(1.8369426,0,0,-1.8369426,439.53426,107.1489)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 -75.776,-51.859"\n         style="fill:none;stroke:#2f6f7f;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path38" />\n    </g>\n    <g\n       id="g40"\n       transform="matrix(1.8369426,0,0,-1.8369426,300.33753,202.41164)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 -46.109,-77.215"\n         style="fill:none;stroke:#6eaaa6;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path42" />\n    </g>\n    <g\n       id="g44"\n       transform="matrix(1.8369426,0,0,-1.8369426,308.52662,223.44684)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 -4.458,11.451"\n         style="fill:none;stroke:#cae6e4;stroke-width:1.875;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path46" />\n    </g>\n    <g\n       id="g48"\n       transform="matrix(1.8369426,0,0,-1.8369426,358.85959,356.02945)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 17.014,0"\n         style="fill:none;stroke:#cae6e4;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path50" />\n    </g>\n    <g\n       id="g52"\n       transform="matrix(1.8369426,0,0,-1.8369426,185.10337,344.2508)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 17.015,0"\n         style="fill:none;stroke:#6eaaa6;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path54" />\n    </g>\n    <g\n       id="g56"\n       transform="matrix(1.8369426,0,0,-1.8369426,104.80897,223.71227)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 17.014,0"\n         style="fill:none;stroke:#48b594;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path58" />\n    </g>\n    <g\n       id="g60"\n       transform="matrix(1.8369426,0,0,-1.8369426,148.47934,85.751463)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 17.013,0"\n         style="fill:none;stroke:#ec6652;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path62" />\n    </g>\n    <g\n       id="g64"\n       transform="matrix(1.8369426,0,0,-1.8369426,283.23101,34.065953)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 17.015,0"\n         style="fill:none;stroke:#f49c82;stroke-width:0.54400003;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path66" />\n    </g>\n    <g\n       id="g68"\n       transform="matrix(1.8369426,0,0,-1.8369426,302.33761,207.54938)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 31.535,-81.014"\n         style="fill:none;stroke:#cae6e4;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path70" />\n    </g>\n    <g\n       id="g72"\n       transform="matrix(1.8369426,0,0,-1.8369426,300.33753,202.41164)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 -66.097,63.742"\n         style="fill:none;stroke:#ec6652;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path74" />\n    </g>\n    <g\n       id="g76"\n       transform="matrix(1.8369426,0,0,-1.8369426,134.93372,223.6298)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 90.043,11.551"\n         style="fill:none;stroke:#48b594;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path78" />\n    </g>\n    <g\n       id="g80"\n       transform="matrix(1.8369426,0,0,-1.8369426,300.33753,202.41164)">\n      <path\n         inkscape:connector-curvature="0"\n         d="M 0,0 7.702,91.961"\n         style="fill:none;stroke:#f49c82;stroke-width:3.75;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n         id="path82" />\n    </g>\n    <text\n       style="font-size:22.04331207px"\n       y="35.878643"\n       x="235.40495"\n       id="text84">\n      <tspan\n         style="font-size:12.99085808px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="235.40495 242.38103 248.42177 252.89062 255.99544 262.29602 268.44067 271.5455"\n         y="35.878643"\n         sodipodi:role="line"\n         id="tspan86">Écrivain</tspan>\n    </text>\n    <path\n       id="center"\n       style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"\n       d="m 308.89439,203.1256 c -0.39862,4.73196 -4.55194,8.23685 -9.27105,7.84374 -4.72094,-0.39861 -8.23134,-4.54275 -7.84007,-9.27839 0.39678,-4.71911 4.55194,-8.22767 9.27105,-7.8364 4.72278,0.39862 8.23318,4.55011 7.84007,9.27105"\n       inkscape:connector-curvature="0" />\n    <path\n       id="spider"\n       style="fill:#ffffff;fill-opacity:0.70196078;stroke:#5c5c5b;stroke-width:6.88853455;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n       d="m 204.15449,112.17894 102.1781,18.63762 100.25297,-1.68264 -60.49235,87.19048 -15.36603,63.09898 L 286.77466,224.6733 217.6303,213.08587 204.15449,112.17894 z"\n       inkscape:connector-curvature="0"\n       class="spider" />\n    <circle \n        id="point_0"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_0"\n    />\n<circle \n        id="point_1"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_1"\n    />\n    <circle \n        id="point_2"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_2"\n    />\n    <circle \n        id="point_3"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_3"\n    />\n    <circle \n        id="point_4"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_4"\n    />\n    <circle \n        id="point_5"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_5"\n    />\n    <circle \n        id="point_6"\n        cx="50" cy="50" r="7" \n        style="fill:#5c5c5b;fill-opacity:1;stroke:#5c5c5b;stroke-width:5.1673193;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"\n        class="point_6"\n    />\n    <text\n       style="font-size:22.04331207px"\n       y="358.64951"\n       x="394.21268"\n       id="text176">\n      <tspan\n         style="font-size:12.99085808px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="394.21268 402.43588 409.37302 416.29712 423.22125 429.65173 435.69247 440.53809"\n         y="358.64951"\n         sodipodi:role="line"\n         id="tspan178">Connecté</tspan>\n      <tspan\n         style="font-size:12.99085808px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="495.64529 504.58301 507.70081 514.63794 521.71796 528.14838 532.99402 537.46283 544.39996 549.24554 554.09119 560.52167"\n         y="254.4498"\n         sodipodi:role="line"\n         id="tspan180">Globetrotter</tspan>\n      <tspan\n         style="font-size:12.99085808px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="475.6004 485.40851 489.87735 496.02203 500.86761 507.29807 514.22223"\n         y="110.86185"\n         sodipodi:role="line"\n         id="tspan182">Orateur</tspan>\n      <tspan\n         style="font-size:12.99085808px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="127.25052 134.46046 138.92929 142.03413 148.95825 154.99902 161.42949 167.2104 172.99138"\n         y="346.87979"\n         sodipodi:role="line"\n         id="tspan184">Princesse</tspan>\n      <tspan\n         style="font-size:12.99085808px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="27.896441 34.872528 41.796673 46.642235 51.111107 57.541595 64.634583 69.103455 75.53392 82.458069 88.888527 95.812675"\n         y="226.28564"\n         sodipodi:role="line"\n         id="tspan186">Entrepreneur</tspan>\n    </text>\n    <text\n       style="font-size:21.68772888px"\n       y="90.425674"\n       x="99.772766"\n       transform="scale(1.0163956,0.98386887)"\n       id="text188">\n      <tspan\n         style="font-size:13.20385075px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBook;-inkscape-font-specification:LuxSansBook"\n         x="99.772766 103.19256 110.2302 115.03641 118.20534 125.24299 131.7789 138.81654"\n         y="90.425674"\n         sodipodi:role="line"\n         id="tspan190">Influent</tspan>\n    </text>\n    <text\n       style="font-size:22.04331207px"\n       y="103.75404"\n       x="35.678749"\n       id="text192">\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="35.678749 40.211761 45.614246 47.812366 51.290272 56.370365 61.772839 66.110466 69.63723 72.206596 77.28669 82.689163 84.887283 90.358154 95.672707 97.870827 103.2733 108.35339 116.58903 121.75704 125.20564 129.73866 131.93678 137.40765 141.94066"\n         y="103.75404"\n         sodipodi:role="line"\n         id="tspan194">en fonction du nombre de</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="35.678749 40.016373 45.096466 50.49894 54.025703 59.516129 63.853729 67.380493 71.268723 73.466843 78.957245 84.115509 89.273743 93.806747 96.42495 100.95795 104.84618 109.34013 114.83052 119.98878 125.14703 129.68005 132.29825 137.78865 143.19113 146.7179 150.60612"\n         y="115.47733"\n         sodipodi:role="line"\n         id="tspan196">contacts appelés/appelants</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="35.678749 41.149616 43.718983 47.196884 50.674809 55.207809 58.656406 63.189407 68.591904 72.118668"\n         y="127.20063"\n         sodipodi:role="line"\n         id="tspan198">différents</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="209.33983 214.74228 219.8224 228.05801 233.22604 236.67462 241.20764 243.40579 248.87662 253.40964 255.60777 259.496 267.7316"\n         y="46.788601"\n         sodipodi:role="line"\n         id="tspan200">nombre de sms</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="485.03262 490.43512 495.51517 503.75082 508.91885 512.36743 516.90045 519.09857 524.5694 527.03131 532.52173 537.67999 542.8382 547.37128 549.98944"\n         y="122.47222"\n         sodipodi:role="line"\n         id="tspan202">nombre d’appels</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="485.03262 490.43512 495.51517 503.75082 508.91885 512.36743 516.90045 519.09857 524.5694 529.10248 531.30054 536.4588 541.53888 544.10822 549.51074 553.03748 556.92572"\n         y="265.30106"\n         sodipodi:role="line"\n         id="tspan204">nombre de points</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="485.03262 490.50351 495.03653 497.23462 502.40265 506.93567 512.01575 514.63397 519.71405 524.05164"\n         y="277.02432"\n         sodipodi:role="line"\n         id="tspan206">de géoloc</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="485.03262 490.50351 493.07285 496.55078 500.02869 504.56168 508.01028 512.54333 517.94574 521.47253 525.36072 527.5589 533.02972 537.56281 539.76086 544.91913 547.53729 552.85187 556.74011"\n         y="288.74765"\n         sodipodi:role="line"\n         id="tspan208">différents de plus</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="485.03262 490.50351 495.03653 497.23462 499.78442 502.33423 504.88406 509.77853"\n         y="300.47095"\n         sodipodi:role="line"\n         id="tspan210">de ...km</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="393.84494 398.93481 404.24936 409.73978 415.14224 418.66901 421.23837 424.76514 429.29816 431.49625 436.9671 441.50015 443.69824 449.1691 454.65952 458.18628 463.6767"\n         y="374.52304"\n         sodipodi:role="line"\n         id="tspan212">quantité de datas</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="121.63982 128.77148 133.85158 142.08719 147.2552 150.7038 155.23683 157.43495 162.90582 165.36771 170.85811 176.01634 181.17461 185.70761 188.32581"\n         y="363.26868"\n         sodipodi:role="line"\n         id="tspan214">Nombre d’appel</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="121.63982 126.17281 131.57532 135.10205 138.55064 144.04108 149.44356"\n         y="374.992"\n         sodipodi:role="line"\n         id="tspan216">entrant</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="24.795626 31.927299 37.007381 45.243004 50.411018 53.859634 58.392635 60.590755 66.061623 68.523514 74.013916 79.172173 84.330414 88.863441 91.481644"\n         y="240.36951"\n         sodipodi:role="line"\n         id="tspan218">Nombre d’appel</tspan>\n      <tspan\n         style="font-size:9.76941204px;font-variant:normal;font-weight:500;font-stretch:normal;writing-mode:lr-tb;fill:#2b2b2a;fill-opacity:1;fill-rule:nonzero;stroke:none;font-family:LuxSansBookItalic;-inkscape-font-specification:LuxSansBookItalic"\n         x="24.795626 28.683857 33.76395 37.212543 40.739296 46.22971 51.63221"\n         y="252.0928"\n         sodipodi:role="line"\n         id="tspan220">sortant</tspan>\n    </text>\n  </g>\n</svg>\n</div></div></div>');
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
Spider = require('./spider');

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
        //TODO
        //var itemView = new Bargraph({
        var itemView = new Spider({
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

            var txt = g.children("text");
            txt.attr("y", 70 + 200 - 2 * bar.percent);
            console.log(txt);
            txt[0].textContent = bar.label;
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

;require.register("views/spider", function(exports, require, module) {
module.exports = Bargraph = Backbone.View.extend({


//    tagName: 'div',
    template: require('../templates/spider'),

    render: function() {
        
        this.$el.html(this.template({
            spider: this.model.toJSON()
        }));

        
        var spider = this.$el.find(".spider");
            
        var R = 175;
        var tInit = 0.29; //rad.
        var nbAxes = 7;
        var cx = 300;
        var cy = 203;
            
        var dStr = "M";
        for (var i=0;i<nbAxes;i++) {
            var t = (tInit + i * 2 * Math.PI / nbAxes) ;
            var r = R * this.model.attributes.bars[i].percent / 100;
                
            var x = r * Math.cos(t) + cx ;
            var y = r * Math.sin(t) + cy ;
                
            dStr += ' ' + x + ',' + y ;
            
            // points précis.
            this.$el.find(".point_" + i)
                .attr("cx", x)
                .attr("cy", y);
            }
            
            dStr += ' z';
            
            spider.attr('d', dStr);
            

        /*for (var i=0;i<7;i++) {
            var bar = this.model.attributes.bars[i] ;

            var g = this.$el.find(".d" + i);
            g.children("rect")
                .attr("height", 2 * bar.percent)
                .attr("y", 78.32 + 200 - 2 * bar.percent);

            var txt = g.children("text");
            txt.attr("y", 70 + 200 - 2 * bar.percent);
            console.log(txt);
            txt[0].textContent = bar.label;
        }*/

    },

});

});

;
//# sourceMappingURL=app.js.map