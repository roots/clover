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
})({"../src/hooks/useGeneratorIndex.js":[function(require,module,exports) {
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
      const matches = await (0, _globby.default)([`${cwd}/.bud/generators/**/*.bud.js`]);
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
      }).map(plugin => _path.default.join(plugin.dir, '/generators/**/*.bud.js'));
      const matches = await (0, _globby.default)([...packages, '!/**/*.preset.bud.js']);
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

const useGeneratorIndex = () => {
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

var _default = useGeneratorIndex;
exports.default = _default;
},{}],"../src/hooks/usePresetIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModulePresets = exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _react = require("react");

var _findPlugins = _interopRequireDefault(require("find-plugins"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
/**
 * Process glob matches into the format the rest of the application anticipates.
 */

const fromMatches = matches => matches.map(generator => ({
  name: _path.default.basename(generator).replace('.preset.bud.js', ''),
  path: generator
}));
/**
 * Presets sourced from node_modules
 *
 * @param {string} keyword package.json keywords match
 */


const useModulePresets = keyword => {
  const [presets, setPresets] = (0, _react.useState)([]);
  const [checked, setChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      setChecked(false);
      const packages = (0, _findPlugins.default)({
        dir: _path.default.resolve(_path.default.join(cwd, 'node_modules')),
        scanAllDirs: true,
        keyword
      }).map(pkg => _path.default.join(_path.default.join(pkg.dir, 'presets'), '/**/*.preset.bud.js'));
      const matches = await (0, _globby.default)(packages);
      setPresets(fromMatches(matches));
      setChecked(true);
    })();
  }, [keyword]);
  return [presets, checked];
};
/**
 * usePresets hook
 */


exports.useModulePresets = useModulePresets;

const usePresetIndex = () => {
  const [core, checkedCore] = useModulePresets('bud-core-presets');
  const [plugin, checkedPlugin] = useModulePresets('bud-preset');
  return {
    plugin,
    core,
    status: {
      plugin: checkedPlugin,
      core: checkedCore
    },
    complete: checkedCore && checkedPlugin
  };
};

var _default = usePresetIndex;
exports.default = _default;
},{}],"../src/components/Banner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Banner = () => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  flexDirection: "column",
  marginBottom: 1
}, /*#__PURE__*/_react.default.createElement(_ink.Text, {
  color: "green"
}, "\u26A1\uFE0F @roots/bud"));

var _default = Banner;
exports.default = _default;
},{}],"../src/components/Loading.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loading
 *
 * @prop {string} message
 */
const Loading = ({
  message,
  spinnerColor = 'white'
}) => /*#__PURE__*/_react.default.createElement(_ink.Text, {
  color: spinnerColor
}, " ", message);

Loading.propTypes = {
  message: _propTypes.default.string
};
Loading.defaultProps = {
  message: 'Loading'
};
var _default = Loading;
exports.default = _default;
},{}],"../src/components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _Banner = _interopRequireDefault(require("./Banner"));

var _Loading = _interopRequireDefault(require("./Loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bud application.
 *
 * @prop {object} children
 */
const App = ({
  isLoading,
  loadingMessage,
  children
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingTop: 1,
  paddingRight: 1,
  paddingBottom: 0,
  paddingLeft: 1
}, /*#__PURE__*/_react.default.createElement(_Banner.default, null), isLoading && /*#__PURE__*/_react.default.createElement(_Loading.default, {
  spinnerColor: "green",
  message: loadingMessage !== null && loadingMessage !== void 0 ? loadingMessage : 'Loading'
}), children);

var _default = App;
exports.default = _default;
},{"./Banner":"../src/components/Banner.js","./Loading":"../src/components/Loading.js"}],"../src/components/List.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Present an array of objects as a list.
 *
 * @prop {string} label
 * @prop {array}  items
 * @return {ReactElement}
 */
const List = ({
  label,
  items
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  flexDirection: "column",
  marginBottom: 1
}, label && /*#__PURE__*/_react.default.createElement(_ink.Text, {
  color: "black",
  backgroundColor: "green"
}, label), items === null || items === void 0 ? void 0 : items.map((item, id) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  key: id,
  flexDirection: "column"
}, /*#__PURE__*/_react.default.createElement(_ink.Text, null, "\u25E6 ", item.name))));

var _default = List;
exports.default = _default;
},{}],"list/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _useGeneratorIndex = _interopRequireDefault(require("./../../src/hooks/useGeneratorIndex"));

var _usePresetIndex = _interopRequireDefault(require("./../../src/hooks/usePresetIndex"));

var _App = _interopRequireDefault(require("./../../src/components/App"));

var _List = _interopRequireDefault(require("./../../src/components/List"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Command: bud list */
/// List available budfiles
const ListCommand = () => {
  /**
   * Fetch all available generators.
   */
  const {
    core: coreGenerators,
    plugin: pluginGenerators,
    project: projectGenerators,
    complete: generatorsComplete
  } = (0, _useGeneratorIndex.default)();
  const generators = [...projectGenerators, ...pluginGenerators, ...coreGenerators];
  /**
   * Fetch all available presets.
   */

  const {
    core: corePresets,
    plugin: pluginPresets,
    complete: presetsComplete
  } = (0, _usePresetIndex.default)();
  const presets = [...corePresets, ...pluginPresets];
  /**
   * We have all available generators and presets.
   */

  const complete = generatorsComplete && presetsComplete;
  return /*#__PURE__*/_react.default.createElement(_App.default, {
    isLoading: !complete
  }, complete && /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_List.default, {
    label: "Presets",
    items: presets
  }), /*#__PURE__*/_react.default.createElement(_List.default, {
    label: "Generators",
    items: generators
  })));
};

var _default = ListCommand;
exports.default = _default;
},{"./../../src/hooks/useGeneratorIndex":"../src/hooks/useGeneratorIndex.js","./../../src/hooks/usePresetIndex":"../src/hooks/usePresetIndex.js","./../../src/components/App":"../src/components/App.js","./../../src/components/List":"../src/components/List.js"}]},{},["list/index.js"], null)
//# sourceMappingURL=/list/index.js.map