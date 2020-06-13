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
})({"../src/hooks/useGenerators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _react = require("react");

var _findPlugins = _interopRequireDefault(require("find-plugins"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

const useGenerators = (search = '*') => {
  /**
   * project .bud
   */
  const [project, setProject] = (0, _react.useState)([]);
  const [checkedProject, setCheckedProject] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    (async () => {
      setCheckedProject(false);
      const files = await (0, _globby.default)([`${cwd}/.bud/budfiles/**/${search}.bud.js`]);
      setProject(files.map(result => ({
        name: _path.default.basename(result).replace('.bud.js', ''),
        path: result
      })));
      setCheckedProject(true);
    })();
  }, [search]);
  /**
   * node_modules
   */

  const [plugin, setPlugin] = (0, _react.useState)([]);
  const [checkedPlugin, setCheckedPlugin] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    (async () => {
      setCheckedPlugin(false);
      const files = (0, _findPlugins.default)({
        keyword: 'bud-generators'
      }).map(match => `${match.dir}/**/${search}.bud.js`);
      const results = await (0, _globby.default)(files);
      setPlugin(results.map(result => ({
        name: _path.default.basename(result).replace('.bud.js', ''),
        path: result
      })));
      setCheckedPlugin(true);
    })();
  }, [search]);
  /**
   * @roots/bud-generators
   */

  const [core, setCore] = (0, _react.useState)([]);
  const [checkedCore, setCheckedCore] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    (async () => {
      setCheckedCore(false);
      const files = (0, _findPlugins.default)({
        keyword: 'bud-core-generators'
      }).map(match => `${match.dir}/**/${search}.bud.js`);
      const results = await (0, _globby.default)(files);
      setCore(results.map(result => ({
        name: _path.default.basename(result).replace('.bud.js', ''),
        path: result
      })));
      setCheckedCore(true);
    })();
  }, [search]);
  return {
    project,
    plugin,
    core,
    complete: {
      project: checkedProject,
      core: checkedCore,
      plugin: checkedPlugin
    }
  };
};

var _default = useGenerators;
exports.default = _default;
},{}],"../src/hooks/useSearch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _useGenerators = _interopRequireDefault(require("./useGenerators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use Search
 *
 * @param {string} generatorName
 */
const useSearch = (generatorName = '*') => {
  const {
    core,
    plugin,
    project,
    complete
  } = (0, _useGenerators.default)(generatorName);
  const [budfile, setBudfile] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (project && project.length > 0) {
      setBudfile(project[0]);
    } else if (plugin && plugin.length > 0) {
      setBudfile(plugin[0]);
    } else if (core && core.length > 0) {
      setBudfile(core[0]);
    }
  }, [core, plugin, project, complete]);
  return {
    core,
    plugin,
    project,
    budfile,
    complete: complete.core && complete.project && complete.plugin
  };
};

var _default = useSearch;
exports.default = _default;
},{"./useGenerators":"../src/hooks/useGenerators.js"}],"../src/components/Banner.js":[function(require,module,exports) {
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
},{}],"list/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkDivider = _interopRequireDefault(require("ink-divider"));

var _useSearch = _interopRequireDefault(require("./../../src/hooks/useSearch"));

var _Banner = _interopRequireDefault(require("./../../src/components/Banner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Command: bud list */
/// List available budfiles
const List = () => {
  const {
    core,
    plugin,
    project,
    complete
  } = (0, _useSearch.default)();
  const buds = [...project, ...plugin, ...core];
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    width: "103",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 1
  }, /*#__PURE__*/_react.default.createElement(_Banner.default, {
    label: 'List budfiles'
  }), /*#__PURE__*/_react.default.createElement(_inkDivider.default, {
    padding: 0,
    width: 100
  }), buds.map((bud, id) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
    key: id,
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-start"
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, null, bud.name))));
};

var _default = List;
exports.default = _default;
},{"./../../src/hooks/useSearch":"../src/hooks/useSearch.js","./../../src/components/Banner":"../src/components/Banner.js"}]},{},["list/index.js"], null)
//# sourceMappingURL=/list/index.js.map