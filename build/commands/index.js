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
exports.useModuleGenerators = exports.useProjectGenerators = exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _react = require("react");

var _findPlugins = _interopRequireDefault(require("find-plugins"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
/**
 * Process globby matches into expected object
 */

const fromMatches = matches => matches.map(generator => ({
  name: _path.default.basename(generator).replace('.bud.js', ''),
  path: generator
}));
/**
 * Generators sourced from project .bud dir
 */


const useProjectGenerators = () => {
  const [generators, setGenerators] = (0, _react.useState)([]);
  const [checked, setChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      setChecked(false);
      const matches = await (0, _globby.default)([`${cwd}/.bud/budfiles/**/*.bud.js`]);
      setGenerators(fromMatches(matches));
      setChecked(true);
    })();
  }, []);
  return [generators, checked];
};
/**
 * Generators sourced from node_modules
 *
 * @param {string} keyword package.json keywords match
 */


exports.useProjectGenerators = useProjectGenerators;

const useModuleGenerators = keyword => {
  const [generators, setGenerators] = (0, _react.useState)([]);
  const [checked, setChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      setChecked(false);
      const packages = (0, _findPlugins.default)({
        dir: _path.default.resolve(_path.default.join(cwd, 'node_modules')),
        scanAllDirs: true,
        keyword
      }).map(plugin => _path.default.join(plugin.dir, '/**/*.bud.js'));

      const matches = _globby.default.sync(packages);

      setGenerators(fromMatches(matches));
      setChecked(true);
    })();
  }, [keyword]);
  return [generators, checked];
};
/**
 * useGenerators hook
 */


exports.useModuleGenerators = useModuleGenerators;

const useGenerators = () => {
  const [project, checkedProject] = useProjectGenerators();
  const [core, checkedCore] = useModuleGenerators('bud-core-generators');
  const [plugin, checkedPlugin] = useModuleGenerators('bud-generator');
  return {
    project,
    plugin,
    core,
    status: {
      project: checkedProject,
      plugin: checkedPlugin,
      core: checkedCore
    },
    complete: checkedCore && checkedProject && checkedPlugin
  };
};

var _default = useGenerators;
exports.default = _default;
},{}],"../src/components/Banner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _inkGradient = _interopRequireDefault(require("ink-gradient"));

var _inkBigText = _interopRequireDefault(require("ink-big-text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Banner = () => /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_inkGradient.default, {
  name: "teen"
}, /*#__PURE__*/_react.default.createElement(_inkBigText.default, {
  text: "Bud",
  font: "simple3d"
})));

var _default = Banner;
exports.default = _default;
},{}],"../package.json":[function(require,module,exports) {
module.exports = {
  "name": "@roots/bud",
  "version": "1.0.0-rc.5",
  "repository": {
    "type": "git",
    "url": "git://github.com/roots/bud.git"
  },
  "bin": {
    "bud": "build/cli.js"
  },
  "engines": {
    "node": ">=12"
  },
  "scripts": {
    "bud": "bud",
    "build": "pastel build",
    "dev": "pastel dev",
    "docs": "bud generate readme",
    "lint": "npm-run-all -c lint:*",
    "lint:eslint": "eslint .",
    "lint:prettier": "prettier --write ."
  },
  "files": ["assets", "build", "src"],
  "dependencies": {
    "@roots/bud": "roots/bud#v1.0.0-rc.5",
    "@roots/bud-generators": "roots/bud-generators#master",
    "enquirer": "^2.3.5",
    "esm": "^3.2.25",
    "execa": "^4.0.2",
    "find-plugins": "^1.1.7",
    "fs-extra": "^9.0.1",
    "globby": "^11.0.1",
    "handlebars": "^4.7.6",
    "handlebars-helpers": "^0.10.0",
    "ink": "^2.7.1",
    "ink-ascii": "^0.0.4",
    "ink-big-text": "^1.1.0",
    "ink-box": "^1.0.0",
    "ink-divider": "^2.0.1",
    "ink-gradient": "^1.0.0",
    "ink-image": "^2.0.0",
    "ink-link": "^1.1.0",
    "ink-quicksearch-input": "^1.0.0",
    "ink-spinner": "^3.0.1",
    "ink-table": "^2.0.1",
    "ink-text-input": "^3.2.2",
    "ink-use-stdout-dimensions": "^1.0.5",
    "pastel": "^1.0.3",
    "prettier": "2.0.5",
    "prop-types": "^15.7.2",
    "react": "^16.13.1",
    "rxjs": "^6.5.5"
  },
  "devDependencies": {
    "babel-eslint": "^10.1.0",
    "eslint": "^7.2.0",
    "eslint-plugin-react": "^7.20.0",
    "eslint-plugin-react-hooks": "^4.0.4",
    "husky": "^4.2.5",
    "markdownlint-cli": "^0.23.1",
    "npm-run-all": "^4.1.5"
  },
  "licenses": [{
    "type": "MIT",
    "url": "http://opensource.org/licenses/MIT"
  }]
};
},{}],"../src/components/Footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _package = _interopRequireDefault(require("./../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Footer = ({
  label,
  width
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  width: width,
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 1,
  marginBottom: 0,
  paddingBottom: 0,
  paddingTop: 0
}, /*#__PURE__*/_react.default.createElement(_ink.Box, null, label !== null && label !== void 0 ? label : '    '), /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Text, {
  bold: true
}, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  green: true
}, "\u26A1\uFE0F ", _package.default.name, " [", _package.default.version, "]"))));

var _default = Footer;
exports.default = _default;
},{"./../../package.json":"../package.json"}],"../src/components/Tasks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tasks
 *
 * @prop {object} status
 * @prop {object} sprout
 * @prop {bool}   complete
 */
const Tasks = ({
  status,
  complete
}) => {
  if (complete) {
    return /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
      green: true
    }, "\uD83C\uDFC1", '  ', "Done"));
  }

  if (!status) {
    return [];
  }

  return !complete ? /*#__PURE__*/_react.default.createElement(_ink.Box, null, status && /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null)), ' ', status.toString())) : [];
};

var _default = Tasks;
exports.default = _default;
},{}],"../src/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _Tasks = _interopRequireDefault(require("./components/Tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bud application
 *
 * @prop {string} status
 * @prop {array}  sprout
 * @prop {bool} complete
 */
const App = ({
  status,
  sprout,
  complete
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  width: "103",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingTop: 1,
  paddingBottom: 1
}, /*#__PURE__*/_react.default.createElement(_Tasks.default, {
  status: status,
  sprout: sprout,
  complete: complete
}));

var _default = App;
exports.default = _default;
},{"./components/Tasks":"../src/components/Tasks.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkQuicksearchInput = _interopRequireDefault(require("ink-quicksearch-input"));

var _inkUseStdoutDimensions = _interopRequireDefault(require("ink-use-stdout-dimensions"));

var _useGenerators = _interopRequireDefault(require("./../src/hooks/useGenerators"));

var _Banner = _interopRequireDefault(require("./../src/components/Banner"));

var _Footer = _interopRequireDefault(require("./../src/components/Footer"));

var _App = _interopRequireDefault(require("./../src/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Command: bud */
/// Bud
const Bud = () => {
  const [columns, rows] = (0, _inkUseStdoutDimensions.default)();
  const padding = 4;
  const appDimensions = {
    height: rows - padding,
    width: columns - padding
  };
  const {
    core,
    plugin,
    project,
    complete
  } = (0, _useGenerators.default)();
  const [buds, setBuds] = (0, _react.useState)(null);
  const [selection, setSelection] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    complete && setBuds([...project, ...plugin, ...core].map(bud => ({
      value: bud.path,
      label: bud.name
    })));
  }, [complete]);
  return !selection ? /*#__PURE__*/_react.default.createElement(_ink.Box, {
    paddingLeft: 2,
    paddingRight: 2,
    height: appDimensions.height,
    flexDirection: "column",
    justifyContent: "space-around"
  }, /*#__PURE__*/_react.default.createElement(_Banner.default, null), buds && !selection && /*#__PURE__*/_react.default.createElement(_inkQuicksearchInput.default, {
    label: "Select a generator",
    items: buds,
    onSelect: selection => setSelection(selection)
  }), /*#__PURE__*/_react.default.createElement(_Footer.default, null)) : /*#__PURE__*/_react.default.createElement(_App.default, {
    budfile: selection.value
  });
};

var _default = Bud;
exports.default = _default;
},{"./../src/hooks/useGenerators":"../src/hooks/useGenerators.js","./../src/components/Banner":"../src/components/Banner.js","./../src/components/Footer":"../src/components/Footer.js","./../src/App":"../src/App.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map