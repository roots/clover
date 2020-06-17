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
},{}],"../src/hooks/usePresets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModulePresets = exports.useProjectPresets = exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _react = require("react");

var _findPlugins = _interopRequireDefault(require("find-plugins"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
/**
 * Util: Format matched presets
 *
 * @param {array} matches
 * @return {array}
 */

const fromMatches = matches => matches.map(generator => ({
  name: _path.default.basename(generator).replace('.bud.js', ''),
  path: generator
}));
/**
 * Presets sourced from project
 */


const useProjectPresets = () => {
  const [presets, setPresets] = (0, _react.useState)([]);
  const [checked, setChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      setChecked(false);
      const matches = await (0, _globby.default)([`${cwd}/.bud/budfiles/**/*-preset.bud.js`]);
      setPresets(fromMatches(matches));
      setChecked(true);
    })();
  }, []);
  return [presets, checked];
};
/**
 * Presets sourced from node_modules
 *
 * @param {string} keyword package.json keywords match
 */


exports.useProjectPresets = useProjectPresets;

const useModulePresets = keyword => {
  const [presets, setPresets] = (0, _react.useState)([]);
  const [checked, setChecked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    keyword && (async () => {
      setChecked(false);
      const packages = (0, _findPlugins.default)({
        keyword
      }).map(plugin => `${plugin.dir}/**/*-preset.bud.js`);
      const matches = await (0, _globby.default)(packages);
      setPresets(fromMatches(matches));
      setChecked(true);
    })();
  }, [keyword]);
  return [presets, checked];
};
/**
 * useGenerators hook
 */


exports.useModulePresets = useModulePresets;

const useGenerators = () => {
  const [project, checkedProject] = useProjectPresets();
  const [core, checkedCore] = useModulePresets('bud-core-presets');
  const [plugin, checkedPlugin] = useModulePresets('bud-preset');
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
},{}],"../src/components/Tasks.js":[function(require,module,exports) {
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
},{"./components/Tasks":"../src/components/Tasks.js"}],"preset/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _inkQuicksearchInput = _interopRequireDefault(require("ink-quicksearch-input"));

var _useGenerators = _interopRequireDefault(require("../../src/hooks/useGenerators"));

var _usePresets = _interopRequireDefault(require("../../src/hooks/usePresets"));

var _App = _interopRequireDefault(require("../../src/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Command: bud preset */
/// Run a preset.
const Preset = ({
  inputArgs
}) => {
  var _inputArgs$;

  const [name] = (0, _react.useState)((_inputArgs$ = inputArgs[1]) !== null && _inputArgs$ !== void 0 ? _inputArgs$ : null);
  const [selection, setSelection] = (0, _react.useState)(null);
  /**
   * All resolvable presets
   */

  const {
    core: corePresets,
    plugin: pluginPresets,
    project: projectPresets,
    complete: presetsComplete
  } = (0, _usePresets.default)();
  /**
   * All resolvable generators
   */

  const {
    core: coreGenerators,
    plugin: pluginGenerators,
    project: projectGenerators,
    complete: generatorsComplete
  } = (0, _useGenerators.default)();
  /**
   * Format generator results
   */

  const [generators, setGenerators] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    generatorsComplete && setGenerators([...projectGenerators, ...pluginGenerators, ...coreGenerators].map(generator => ({
      value: generator.path,
      label: generator.name
    })));
  }, [generatorsComplete]);
  /**
   * Format preset results
   */

  const [presets, setPresets] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    presetsComplete && setPresets([...projectPresets, ...pluginPresets, ...corePresets].map(preset => ({
      value: preset.path,
      label: preset.name
    })));
  }, [presetsComplete]);
  /**
   * Resolve preset if one was passed via CLI
   */

  (0, _react.useEffect)(() => {
    if (name && presets && presetsComplete) {
      const match = presets.filter(preset => preset.label == name);
      setSelection(match[0]);
    }
  }, [presetsComplete, presets, name]);
  /**
   * From a selection (either by argument or interface)
   * Source the preset data.
   */

  const [preset, setPreset] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    selection && !preset && setPreset({ ...selection,
      data: require(selection.value)
    });
  }, [selection]);
  /**
   * Filter generators based on specs of selected preset
   */

  const [generatorQueue, setGeneratorQueue] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (preset && generatorsComplete) {
      const presetGenerators = generators.filter(generator => preset.data.buds[`${generator.name}`]);
      setGeneratorQueue(presetGenerators);
    }
  }, [preset, generatorsComplete]);
  /**
   * Aggregate all prompts from all generators
   */

  const [prompts, setPrompts] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const promptsReducer = (acc, {
      prompts
    }) => [...acc, ...prompts];

    setPrompts(prompts.reduce(promptsReducer, []));
  });
  /**
   * There were no presets found.
   */

  const noResults = presetsComplete && (!presets || !presets.length > 0);
  return /*#__PURE__*/_react.default.createElement(_ink.Box, null, noResults && /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    red: true
  }, "No presets found")), !name && !selection && (presets === null || presets === void 0 ? void 0 : presets.length) > 0 && /*#__PURE__*/_react.default.createElement(_inkQuicksearchInput.default, {
    label: "Select a preset",
    items: presets,
    onSelect: selection => setSelection(selection)
  }), generatorQueue.length > 0 && /*#__PURE__*/_react.default.createElement(_App.default, {
    queue: generatorQueue
  }));
};

Preset.propTypes = {
  inputArgs: _propTypes.default.array
};
var _default = Preset;
exports.default = _default;
},{"../../src/hooks/useGenerators":"../src/hooks/useGenerators.js","../../src/hooks/usePresets":"../src/hooks/usePresets.js","../../src/App":"../src/App.js"}]},{},["preset/index.js"], null)
//# sourceMappingURL=/preset/index.js.map