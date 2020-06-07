// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/components/Banner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _inkLink = _interopRequireDefault(require("ink-link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Banner component.
 *
 * @prop {string} label
 */
const Banner = ({
  label
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  marginBottom: 1,
  flexDirection: "row",
  justifyContent: "space-between"
}, label && /*#__PURE__*/_react.default.createElement(_ink.Text, null, label), /*#__PURE__*/_react.default.createElement(_ink.Box, {
  flexDirection: "row"
}, /*#__PURE__*/_react.default.createElement(_ink.Text, null, `🌱`), /*#__PURE__*/_react.default.createElement(_ink.Text, {
  bold: true
}, /*#__PURE__*/_react.default.createElement(_inkLink.default, {
  url: "https://roots.io/bud"
}, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  green: true
}, '  Bud')))));

var _default = Banner;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _Banner = _interopRequireDefault(require("./../src/components/Banner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Command: bud */
/// Bud information
const Bud = () => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  width: "103",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: 1
}, /*#__PURE__*/_react.default.createElement(_Banner.default, {
  label: 'Bud'
}), /*#__PURE__*/_react.default.createElement(_ink.Text, null, "To get started run ", /*#__PURE__*/_react.default.createElement(_ink.Color, {
  green: true
}, "npx @roots/bud init ", `{project-dir}`)));

var _default = Bud;
exports.default = _default;
},{"./../src/components/Banner":"../src/components/Banner.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map