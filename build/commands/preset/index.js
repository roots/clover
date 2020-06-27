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
})({"../src/components/input/select-input/Indicator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _figures = _interopRequireDefault(require("figures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Indicator = ({
  isSelected
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
  marginRight: 1
}, /*#__PURE__*/_react.default.createElement(_ink.Text, {
  color: "blue"
}, isSelected ? _figures.default.pointer : ''));

Indicator.propTypes = {
  isSelected: _propTypes.default.bool
};
Indicator.defaultProps = {
  isSelected: false
};
var _default = Indicator;
exports.default = _default;
},{}],"../src/components/input/select-input/Item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Item = ({
  isSelected,
  label
}) => /*#__PURE__*/_react.default.createElement(_ink.Text, {
  blue: isSelected
}, label);

Item.propTypes = {
  isSelected: _propTypes.default.bool,
  label: _propTypes.default.string.isRequired
};
Item.defaultProps = {
  isSelected: false
};
var _default = Item;
exports.default = _default;
},{}],"../src/components/input/select-input/SelectInput.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Indicator", {
  enumerable: true,
  get: function () {
    return _Indicator.default;
  }
});
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function () {
    return _Item.default;
  }
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _arrRotate = _interopRequireDefault(require("arr-rotate"));

var _ink = require("ink");

var _Indicator = _interopRequireDefault(require("./Indicator"));

var _Item = _interopRequireDefault(require("./Item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ARROW_UP = '\u001B[A';
const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

class SelectInput extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      rotateIndex: 0,
      selectedIndex: this.props.initialIndex
    });

    _defineProperty(this, "handleInput", data => {
      const {
        items,
        focus,
        onSelect,
        onHighlight
      } = this.props;
      const {
        rotateIndex,
        selectedIndex
      } = this.state;
      const hasLimit = this.hasLimit();
      const limit = this.getLimit();

      if (focus === false) {
        return;
      }

      const s = String(data);

      if (s === ARROW_UP || s === 'k') {
        const lastIndex = (hasLimit ? limit : items.length) - 1;
        const atFirstIndex = selectedIndex === 0;
        const nextIndex = hasLimit ? selectedIndex : lastIndex;
        const nextRotateIndex = atFirstIndex ? rotateIndex + 1 : rotateIndex;
        const nextSelectedIndex = atFirstIndex ? nextIndex : selectedIndex - 1;
        this.setState({
          rotateIndex: nextRotateIndex,
          selectedIndex: nextSelectedIndex
        });
        const slicedItems = hasLimit ? (0, _arrRotate.default)(items, nextRotateIndex).slice(0, limit) : items;
        onHighlight(slicedItems[nextSelectedIndex]);
      }

      if (s === ARROW_DOWN || s === 'j') {
        const atLastIndex = selectedIndex === (hasLimit ? limit : items.length) - 1;
        const nextIndex = hasLimit ? selectedIndex : 0;
        const nextRotateIndex = atLastIndex ? rotateIndex - 1 : rotateIndex;
        const nextSelectedIndex = atLastIndex ? nextIndex : selectedIndex + 1;
        this.setState({
          rotateIndex: nextRotateIndex,
          selectedIndex: nextSelectedIndex
        });
        const slicedItems = hasLimit ? (0, _arrRotate.default)(items, nextRotateIndex).slice(0, limit) : items;
        onHighlight(slicedItems[nextSelectedIndex]);
      }

      if (s === ENTER) {
        const slicedItems = hasLimit ? (0, _arrRotate.default)(items, rotateIndex).slice(0, limit) : items;
        onSelect(slicedItems[selectedIndex]);
      }
    });

    _defineProperty(this, "hasLimit", () => {
      const {
        limit,
        items
      } = this.props;
      return typeof limit === 'number' && items.length > limit;
    });

    _defineProperty(this, "getLimit", () => {
      const {
        limit,
        items
      } = this.props;

      if (this.hasLimit()) {
        return Math.min(limit, items.length);
      }

      return items.length;
    });
  }

  render() {
    const {
      items,
      indicatorComponent,
      itemComponent
    } = this.props;
    const {
      rotateIndex,
      selectedIndex
    } = this.state;
    const limit = this.getLimit();
    const slicedItems = this.hasLimit() ? (0, _arrRotate.default)(items, rotateIndex).slice(0, limit) : items;
    return /*#__PURE__*/_react.default.createElement(_ink.Box, {
      flexDirection: "column"
    }, slicedItems.map((item, index) => {
      const isSelected = index === selectedIndex;
      return /*#__PURE__*/_react.default.createElement(_ink.Box, {
        key: item.key || item.value
      }, _react.default.createElement(indicatorComponent, {
        isSelected
      }), _react.default.createElement(itemComponent, { ...item,
        isSelected
      }));
    }));
  }

  componentDidMount() {
    const {
      stdin,
      setRawMode
    } = this.props;
    setRawMode(true);
    stdin.on('data', this.handleInput);
  }

  componentWillUnmount() {
    const {
      stdin,
      setRawMode
    } = this.props;
    stdin.removeListener('data', this.handleInput);
    setRawMode(false);
  }

  componentDidUpdate(prevProps) {
    if (!(0, _lodash.default)(prevProps.items, this.props.items)) {
      this.setState({
        // eslint-disable-line react/no-did-update-set-state
        rotateIndex: 0,
        selectedIndex: 0
      });
    }
  }

}

_defineProperty(SelectInput, "propTypes", {
  items: _propTypes.default.array,
  focus: _propTypes.default.bool,
  initialIndex: _propTypes.default.number,
  indicatorComponent: _propTypes.default.func,
  itemComponent: _propTypes.default.func,
  limit: _propTypes.default.number,
  stdin: _propTypes.default.object.isRequired,
  setRawMode: _propTypes.default.func.isRequired,
  onSelect: _propTypes.default.func,
  onHighlight: _propTypes.default.func
});

_defineProperty(SelectInput, "defaultProps", {
  items: [],
  focus: true,
  initialIndex: 0,
  indicatorComponent: _Indicator.default,
  itemComponent: _Item.default,
  limit: null,

  onSelect() {},

  onHighlight() {}

});

const SelectInputWithStdin = props => {
  const {
    stdin,
    setRawMode
  } = (0, _ink.useStdin)();
  return /*#__PURE__*/_react.default.createElement(SelectInput, _extends({}, props, {
    stdin: stdin,
    setRawMode: setRawMode
  }));
};

var _default = SelectInputWithStdin;
exports.default = _default;
},{"./Indicator":"../src/components/input/select-input/Indicator.js","./Item":"../src/components/input/select-input/Item.js"}],"../src/components/input/select-input/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _SelectInput.default;
  }
});
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function () {
    return _SelectInput.Item;
  }
});
Object.defineProperty(exports, "Indicator", {
  enumerable: true,
  get: function () {
    return _SelectInput.Indicator;
  }
});

var _SelectInput = _interopRequireWildcard(require("./SelectInput"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./SelectInput":"../src/components/input/select-input/SelectInput.js"}],"../src/components/Banner.js":[function(require,module,exports) {
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
},{"./Banner":"../src/components/Banner.js","./Loading":"../src/components/Loading.js"}],"../src/hooks/useConfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fsExtra = require("fs-extra");

/**
 * Use config
 */
const useConfig = cwd => {
  const configFile = (0, _path.join)(cwd, '.bud/bud.config.json');
  const config = (0, _fsExtra.existsSync)(configFile) ? require(configFile) : null;
  return {
    config
  };
};

var _default = useConfig;
exports.default = _default;
},{}],"../src/hooks/useData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _enquirer = require("enquirer");

/**
 * Use prompts
 */
const useData = generator => {
  const [data, setData] = (0, _react.useState)(null);
  const [promptsInitialized, setPromptsInitialized] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (generator && !data && !promptsInitialized) {
      setPromptsInitialized(true);
      generator.prompts ? (0, _enquirer.prompt)(generator.prompts).then(data => setData(data)) : setData({});
    }
  }, [generator, data, promptsInitialized]);
  return {
    data
  };
};

var _default = useData;
exports.default = _default;
},{}],"../src/hooks/usePreset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _react = require("react");

var _resolvePkg = _interopRequireDefault(require("resolve-pkg"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make a preset
 */
const make = file => (0, _fs.existsSync)(file) ? require(file) : null;

const makeGeneratorTemplateDir = generatorFile => (0, _path.join)((0, _path.dirname)(generatorFile), 'templates');
/**
 * Use Preset
 *
 * Returns a consolidated generator from a preset file path.
 */


const usePreset = presetFile => {
  const preset = make(presetFile);
  const [generator, setGenerator] = (0, _react.useState)({
    prompts: [],
    tasks: []
  });
  const [steps, setSteps] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      var _generator$prompts, _current$prompts, _generator$tasks, _current$tasks;

      const step = preset.generators[steps];
      if (!step) return;
      const pkg = await (0, _resolvePkg.default)(step.pkg);
      const results = await (0, _globby.default)([`${pkg}/generators/${step.name}/*.bud.js`]);
      const current = make(results[0]);
      const templateDir = makeGeneratorTemplateDir(results[0]);

      if (current) {
        current.tasks = current.tasks.map(task => ({ ...task,
          templateDir
        }));
      }

      setGenerator({
        prompts: [...((_generator$prompts = generator === null || generator === void 0 ? void 0 : generator.prompts) !== null && _generator$prompts !== void 0 ? _generator$prompts : []), ...((_current$prompts = current === null || current === void 0 ? void 0 : current.prompts) !== null && _current$prompts !== void 0 ? _current$prompts : [])],
        tasks: [...((_generator$tasks = generator === null || generator === void 0 ? void 0 : generator.tasks) !== null && _generator$tasks !== void 0 ? _generator$tasks : []), ...((_current$tasks = current === null || current === void 0 ? void 0 : current.tasks) !== null && _current$tasks !== void 0 ? _current$tasks : [])]
      });
      setSteps(1 + steps);
    })();
  }, [preset, steps]);
  const [complete, setComplete] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    steps && steps >= preset.generators.length && (() => {
      setComplete(true);
    })();
  }, [steps]);
  /**
   * Return aggregated generators
   */

  return complete ? generator : false;
};

var _default = usePreset;
exports.default = _default;
},{}],"../src/bud/compiler/helpers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Templating helpers
 */
const helpers = data => [{
  helper: 'array',
  fn: function () {
    return Array.prototype.slice.call(arguments, 0, -1);
  }
}, {
  helper: 'has',
  fn: function (object, component, options) {
    if (data[object].indexOf(component) > -1) {
      return options.fn(this);
    }

    return options.inverse(this);
  }
}, {
  helper: 'hasAny',
  fn: function (object, components, options) {
    let hasInstance = false;

    if (components) {
      components.forEach(component => {
        if (data[object].indexOf(component) > -1) {
          hasInstance = true;
        }
      });
    }

    return hasInstance ? options.fn(this) : options.inverse(this);
  }
}, {
  helper: 'raw',
  fn: function (options) {
    return options.fn();
  }
}];

var _default = helpers;
exports.default = _default;
},{}],"../src/bud/compiler/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _helpers = _interopRequireDefault(require("./helpers"));

var _handlebarsHelpers = _interopRequireDefault(require("handlebars-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compiler.
 *
 * @param {handlebars} handlebars
 */
const makeCompiler = ({
  generator,
  data
}) => {
  (0, _handlebarsHelpers.default)({
    handlebars: _handlebars.default
  });
  generator.registerHelpers && generator.registerHelpers.forEach(helper => {
    _helpers.default.push(helper);
  });
  (0, _helpers.default)(data).forEach(({
    helper,
    fn
  }) => {
    _handlebars.default.registerHelper(helper, fn);
  });
  return {
    compiler: _handlebars.default,

    /**
     * Make template.
     *
     * @param {string} path
     */
    make: function (path) {
      return this.compiler.compile(path);
    }
  };
};

var _default = makeCompiler;
exports.default = _default;
},{"./helpers":"../src/bud/compiler/helpers/index.js"}],"../src/bud/config/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Config
 *
 * @param {string} projectDir
 */
const makeConfig = ({
  projectDir,
  config
}) => ({
  projectDir,
  ...config,
  execa: {
    cwd: projectDir
  }
});

var _default = makeConfig;
exports.default = _default;
},{}],"../src/bud/data/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Make data
 *
 * @type   {func}
 * @prop   {object} data
 * @return {object}
 */
const makeData = ({
  config,
  data,
  generator
}) => {
  const setData = ({
    key,
    value
  }) => {
    data[key] = value;
  };

  return { ...(config ? config.project : []),
    ...data,
    ...(generator.data ? generator.data : []),
    setData
  };
};

var _default = makeData;
exports.default = _default;
},{}],"../src/bud/util/command.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Task runner
 *
 * @param  {object} config
 *
 * @return {func}
 */
const command = config => {
  return cmd => _execa.default.command(cmd, config.execa);
};

var _default = command;
exports.default = _default;
},{}],"../src/bud/util/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _command = _interopRequireDefault(require("./command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make util
 *
 * @prop   {object} config
 * @return {object}
 */
const makeUtil = ({
  config
}) => ({
  command: (0, _command.default)(config)
});

var _default = makeUtil;
exports.default = _default;
},{"./command":"../src/bud/util/command.js"}],"../src/bud/pipes/actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

/**
 * Curried actions
 *
 * @prop {Observer} observer
 * @prop {object}   generator
 * @prop {object}   task
 * @prop {object}   actionProps
 */
const actions = ({
  observer,
  generator,
  actions,
  ...props
}) => {
  (0, _rxjs.from)(generator.tasks).pipe((0, _operators.concatMap)(task => new _rxjs.Observable(async observer => {
    actions[task.task]({
      task,
      actions,
      observer,
      ...props
    });
  }))).subscribe({
    next: next => observer.next(next),
    error: error => observer.error(error),
    complete: () => observer.complete()
  });
};

var _default = actions;
exports.default = _default;
},{}],"../src/bud/pipes/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actions = _interopRequireDefault(require("./actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make Pipes
 *
 * @return {object}
 */
const pipes = [_actions.default];
var _default = pipes;
exports.default = _default;
},{"./actions":"../src/bud/pipes/actions.js"}],"../src/bud/actions/addDependencies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Action: Add dependencies
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   util
 *
 * @return {void}
 */
const addDependencies = async ({
  task,
  observer,
  util
}) => {
  const cmdStr = () => {
    switch (task.repo) {
      case 'npm':
        return `yarn add ${task.dev ? `-D` : ``} ${task.pkgs.join(' ')}`;

      case 'packagist':
        return `composer require ${task.pkgs.join(' ')} ${task.dev ? `--development` : ``}`;

      default:
        observer.error(`Incorrect package repo specified.`);
    }
  };

  observer.next(`Installating packages from ${task.repo}`);
  const {
    command,
    exitCode,
    stderr
  } = await util.command(cmdStr());
  command && observer.next(command);
  exitCode == 0 ? observer.complete() : observer.error(stderr);
};

var _default = addDependencies;
exports.default = _default;
},{}],"../src/bud/actions/command.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Action: Arbitrary command
 *
 * @prop   {object}   task
 * @prop   {Observer} observer
 * @prop   {object}   util
 *
 * @return {Observable}
 */
const command = async ({
  task,
  observer,
  util
}) => {
  task.msg && observer.next(`${task.msg}`);
  const {
    exitCode,
    stderr
  } = await util.command(task.run);
  exitCode == 0 ? observer.complete() : observer.error(stderr);
};

var _default = command;
exports.default = _default;
},{}],"../src/bud/actions/compile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fsExtra = require("fs-extra");

/**
 * Action: template
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   data
 * @param  {object}   config
 * @param  {object}   util
 * @param  {object}   prettier
 * @param  {object}   compiler
 * @return {void}
 */
const compile = async ({
  task,
  observer,
  data,
  prettier,
  compiler,
  config
}) => {
  observer.next(`Write file: ${task.src}`);
  const src = await (0, _fsExtra.readFile)((0, _path.join)(task.templateDir, task.src), 'utf8');
  const dest = compiler.make(task.dest)(data);
  const template = compiler.make(src)(data);
  observer.next(`Writing file ${dest}`);
  await (0, _fsExtra.outputFile)((0, _path.join)(config.projectDir, dest), task.parser ? prettier.format(template, task.parser) : template);
  observer.complete();
};

var _default = compile;
exports.default = _default;
},{}],"../src/bud/actions/copy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fsExtra = require("fs-extra");

/**
 * Action: copy
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   config
 *
 * @return {void}
 */
const copy = async ({
  task,
  config,
  observer
}) => {
  const src = (0, _path.join)(task.templateDir, task.src);
  const dest = (0, _path.join)(config.projectDir, task.dest);
  observer.next(`Copying file`);
  await (0, _fsExtra.copy)(src, dest);
  observer.complete();
};

var _default = copy;
exports.default = _default;
},{}],"../src/bud/actions/ensureDir.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Make directory
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   config
 * @param  {object}   data
 * @param  {object}   compiler
 *
 * @return {void}
 */
const ensureDir = async ({
  task,
  observer,
  config,
  data,
  compiler
}) => {
  const path = (0, _path.join)(config.projectDir, compiler.make(task.path)(data));
  observer.next(`Writing directory ${path}`);
  await _fsExtra.default.ensureDir(path);
  observer.complete();
};

var _default = ensureDir;
exports.default = _default;
},{}],"../src/bud/actions/ensureDirs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

/**
 * Scaffold directories
 *
 * @prop   {task array} dirs
 * @return {Observable}
 */
const ensureDirs = ({
  task,
  observer,
  actions,
  config,
  data,
  compiler
}) => {
  (0, _rxjs.from)(task.dirs).pipe((0, _operators.concatMap)(path => new _rxjs.Observable(observer => {
    actions.ensureDir({
      task: {
        path
      },
      config,
      data,
      compiler,
      observer
    });
  }))).subscribe({
    next: next => observer.next(next),
    error: error => observer.error(error),
    complete: () => observer.complete()
  });
};

var _default = ensureDirs;
exports.default = _default;
},{}],"../src/bud/actions/git/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Action: git clone
 *
 * @prop {object}   task
 * @prop {Observer} observer
 * @prop {object}   util
 */
const clone = async ({
  observer,
  task,
  util
}) => {
  observer.next(`Cloning ${task.repo} to ${task.dest}`);
  const clone = util.command(`git clone git@github.com:${task.repo} ${task.dest}`);
  clone.stdout.on('data', () => observer.next(observer.next(`Cloning ${task.repo} to ${task.dest}}`)));
  clone.then(() => observer.complete());
};

var _default = clone;
exports.default = _default;
},{}],"../src/bud/actions/git/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clone = _interopRequireDefault(require("./clone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Action: Github
 *
 * @prop   {object}   task
 * @prop   {Observer} observer
 * @prop   {object}   util
 */
const git = async ({
  task,
  observer,
  ...props
}) => {
  if (task.action == 'clone') {
    (0, _clone.default)({
      task,
      observer,
      ...props
    });
  }
};

var _default = git;
exports.default = _default;
},{"./clone":"../src/bud/actions/git/clone.js"}],"../src/bud/actions/install.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Action: Install from package files
 *
 * @prop   {object}   task
 * @prop   {Observer} observer
 * @prop   {object}   util
 *
 * @return {Observable}
 */
const install = async ({
  task,
  observer,
  util
}) => {
  const cmdStr = () => {
    switch (task.repo) {
      case 'npm':
        return 'yarn';

      case 'packagist':
        return 'composer install';

      default:
        observer.error(`Incorrect package repo specified.`);
    }
  };

  observer.next(`Installating packages from ${task.repo}`);
  const {
    command,
    exitCode,
    stderr
  } = await util.command(cmdStr());
  command && observer.next(command);
  exitCode == 0 ? observer.complete() : observer.error(stderr);
};

var _default = install;
exports.default = _default;
},{}],"../src/bud/actions/json.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = require("fs-extra");

/**
 * Action: Manipulate project JSON
 *
 * @prop {object}   task
 * @prop {Observer} observer
 * @prop {Prettier} prettier
 */
const json = async function ({
  task,
  observer,
  prettier,
  config
}) {
  const json = require(`${config.projectDir}/${task.file}`);

  observer.next(`Writing JSON to ${task.file}`);

  try {
    const output = task.merge(json);
    await (0, _fsExtra.outputFile)(`${config.projectDir}/${task.file}`, prettier.format(output, 'json'));
    observer.complete();
  } catch (err) {
    console.log(`There was a problem writing to ${task.file}`);
  }
};

var _default = json;
exports.default = _default;
},{}],"../src/bud/actions/touch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = require("fs-extra");

var _path = require("path");

/**
 * Action: Touch
 *
 * @prop   {object}   task
 * @prop   {object}   config
 * @prop   {object}   compiler
 * @prop   {object}   data
 * @prop   {Observer} observer
 */
const touch = async ({
  task,
  config,
  compiler,
  data,
  observer
}) => {
  const path = (0, _path.join)(config.projectDir, compiler.make(task.path)(data));

  try {
    await (0, _fsExtra.ensureFile)(path).then(() => {
      observer.next();
    });
    observer.complete();
  } catch (error) {
    observer.error();
  }
};

var _default = touch;
exports.default = _default;
},{}],"../src/bud/actions/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addDependencies = _interopRequireDefault(require("./addDependencies"));

var _command = _interopRequireDefault(require("./command"));

var _compile = _interopRequireDefault(require("./compile"));

var _copy = _interopRequireDefault(require("./copy"));

var _ensureDir = _interopRequireDefault(require("./ensureDir"));

var _ensureDirs = _interopRequireDefault(require("./ensureDirs"));

var _git = _interopRequireDefault(require("./git"));

var _install = _interopRequireDefault(require("./install"));

var _json = _interopRequireDefault(require("./json"));

var _touch = _interopRequireDefault(require("./touch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Actions
 *
 * @type {object}
 */
const actions = {
  addDependencies: _addDependencies.default,
  command: _command.default,
  compile: _compile.default,
  copy: _copy.default,
  ensureDir: _ensureDir.default,
  ensureDirs: _ensureDirs.default,
  git: _git.default,
  install: _install.default,
  json: _json.default,
  touch: _touch.default,
  register: function ({
    action
  }) {
    this[`${action.handle}`] = action.callback;
  }
};
var _default = actions;
exports.default = _default;
},{"./addDependencies":"../src/bud/actions/addDependencies.js","./command":"../src/bud/actions/command.js","./compile":"../src/bud/actions/compile.js","./copy":"../src/bud/actions/copy.js","./ensureDir":"../src/bud/actions/ensureDir.js","./ensureDirs":"../src/bud/actions/ensureDirs.js","./git":"../src/bud/actions/git/index.js","./install":"../src/bud/actions/install.js","./json":"../src/bud/actions/json.js","./touch":"../src/bud/actions/touch.js"}],"../src/bud/prettier/inferParser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Prettier parsers.
 * @type {object}
 */
const parsers = {
  js: 'babel',
  jsx: 'babel',
  graphql: 'graphql',
  css: 'css',
  json: 'json',
  md: 'markdown',
  html: 'html',
  htm: 'html',
  ts: 'typescript',
  tsx: 'typescript',
  yml: 'yaml',
  yaml: 'yaml',
  less: 'less'
};
/**
 * Infer parser.
 *
 * @type  {async func}
 * @param {string} file
 */

const inferParser = async function (file) {
  var _parsers$;

  const ext = file.split('.')[file.split('.').length - 1];
  return (_parsers$ = parsers[`${ext}`]) !== null && _parsers$ !== void 0 ? _parsers$ : null;
};

var _default = inferParser;
exports.default = _default;
},{}],"../prettier.config.js":[function(require,module,exports) {
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 70,
  singleQuote: true,
  jsxBracketSameLine: true,
  useTabs: false,
  trailingComma: 'all',
  semi: false,
  overrides: [{
    files: ['*.md'],
    options: {
      parser: 'markdown'
    }
  }, {
    files: ['*.json'],
    options: {
      parser: 'json'
    }
  }]
};
},{}],"../src/bud/prettier/format.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prettier = _interopRequireDefault(require("prettier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = require('../../../prettier.config.js');
/**
 * Format
 *
 * @type   {func}
 * @param  {object|string} content
 * @param  {parser} string
 * @return {string}
 */


const format = (content, parser) => {
  content = typeof content !== 'string' ? JSON.stringify(content) : content;
  return _prettier.default.format(content, { ...config,
    parser: parser || 'babel'
  });
};

var _default = format;
exports.default = _default;
},{"../../../prettier.config.js":"../prettier.config.js"}],"../src/bud/prettier/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inferParser = _interopRequireDefault(require("./inferParser"));

var _format = _interopRequireDefault(require("./format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Prettier
 */
const prettier = {
  format: _format.default,
  inferParser: _inferParser.default
};
var _default = prettier;
exports.default = _default;
},{"./inferParser":"../src/bud/prettier/inferParser.js","./format":"../src/bud/prettier/format.js"}],"../src/bud/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _compiler = _interopRequireDefault(require("./compiler"));

var _config = _interopRequireDefault(require("./config"));

var _data = _interopRequireDefault(require("./data"));

var _util = _interopRequireDefault(require("./util"));

var _pipes = _interopRequireDefault(require("./pipes"));

var _actions = _interopRequireDefault(require("./actions"));

var _prettier = _interopRequireDefault(require("./prettier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bud
 *
 * @prop {string} projectDir
 * @prop {object} config
 * @prop {object} data
 * @prop {object} generator
 * @prop {string} templateDir
 * @prop {bool}   logging
 *
 * @return {Observable}
 */
const bud = props => {
  const {
    generator
  } = props;
  const config = (0, _config.default)({ ...props
  });
  const data = (0, _data.default)({ ...props
  });
  const util = (0, _util.default)({
    config
  });
  const compiler = (0, _compiler.default)({
    generator,
    data
  });
  generator.registerActions && generator.registerActions.forEach(action => {
    _actions.default.register({
      action
    });
  });
  return new _rxjs.Observable(observer => {
    const props = {
      config,
      data,
      actions: _actions.default,
      compiler,
      prettier: _prettier.default,
      util,
      generator
    };
    (0, _rxjs.from)(_pipes.default).pipe((0, _operators.concatMap)(job => new _rxjs.Observable(async observer => {
      await job({
        observer,
        ...props
      });
    }))).subscribe({
      next: next => {
        observer.next(next);
      },
      error: error => {
        observer.error(error);
      },
      complete: () => {
        observer.complete();
      }
    });
  });
};

var _default = bud;
exports.default = _default;
},{"./compiler":"../src/bud/compiler/index.js","./config":"../src/bud/config/index.js","./data":"../src/bud/data/index.js","./util":"../src/bud/util/index.js","./pipes":"../src/bud/pipes/index.js","./actions":"../src/bud/actions/index.js","./prettier":"../src/bud/prettier/index.js"}],"../src/hooks/useSubscription.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _ink = require("ink");

var _bud = _interopRequireDefault(require("./../bud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Use subscription.
 */
const useSubscription = ({
  config,
  data,
  projectDir,
  generator
}) => {
  const {
    exit
  } = (0, _ink.useApp)();
  const [subscription, setSubscription] = (0, _react.useState)(false);
  const [status, setStatus] = (0, _react.useState)(null);
  const [error] = (0, _react.useState)(null);
  const [complete, setComplete] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (generator && data && !subscription) {
      setSubscription((0, _bud.default)({
        config,
        data,
        generator,
        projectDir
      }).subscribe({
        next: next => setStatus(next),
        complete: () => setComplete(true)
      }));
    }
  }, [data]);
  (0, _react.useEffect)(() => {
    complete && (() => {
      subscription.unsubscribe();
      exit();
    })();
  }, [complete]);
  return {
    status,
    error,
    complete
  };
};

var _default = useSubscription;
exports.default = _default;
},{"./../bud":"../src/bud/index.js"}],"../src/components/Tasks.js":[function(require,module,exports) {
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
    return /*#__PURE__*/_react.default.createElement(_ink.Text, {
      green: true
    }, "\uD83C\uDFC1", '  ', "Done");
  }

  if (!status || complete) {
    return [];
  }

  return /*#__PURE__*/_react.default.createElement(_ink.Box, null, status && /*#__PURE__*/_react.default.createElement(_ink.Text, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null), " ", status));
};

var _default = Tasks;
exports.default = _default;
},{}],"../src/middleware/PresetMiddleware.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useConfig = _interopRequireDefault(require("./../hooks/useConfig"));

var _useData = _interopRequireDefault(require("./../hooks/useData"));

var _usePreset = _interopRequireDefault(require("../hooks/usePreset"));

var _useSubscription = _interopRequireDefault(require("./../hooks/useSubscription"));

var _Tasks = _interopRequireDefault(require("./../components/Tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
/**
 * Middleware: Preset
 *
 * @prop {string} budfile
 * @prop {string} output
 */

const PresetMiddleware = ({
  presetFile,
  output
}) => {
  const {
    config
  } = (0, _useConfig.default)(cwd);
  const preset = (0, _usePreset.default)(presetFile);
  const {
    data
  } = (0, _useData.default)(preset);
  const {
    status,
    complete
  } = (0, _useSubscription.default)({
    config,
    data,
    generator: preset,
    projectDir: output
  });
  return /*#__PURE__*/_react.default.createElement(_Tasks.default, {
    status: status,
    complete: complete
  });
};

var _default = PresetMiddleware;
exports.default = _default;
},{"./../hooks/useConfig":"../src/hooks/useConfig.js","./../hooks/useData":"../src/hooks/useData.js","../hooks/usePreset":"../src/hooks/usePreset.js","./../hooks/useSubscription":"../src/hooks/useSubscription.js","./../components/Tasks":"../src/components/Tasks.js"}],"../src/hooks/usePresetIndex.js":[function(require,module,exports) {
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
 * Process globby matches into expected object
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
},{}],"preset/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

var _selectInput = _interopRequireDefault(require("../../src/components/input/select-input"));

var _App = _interopRequireDefault(require("./../../src/components/App"));

var _PresetMiddleware = _interopRequireDefault(require("./../../src/middleware/PresetMiddleware"));

var _usePresetIndex = _interopRequireDefault(require("../../src/hooks/usePresetIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const cwd = process.cwd();
/** Command: bud preset */
/// Run a preset.

const Preset = ({
  inputArgs
}) => {
  const name = inputArgs[1] || null;
  const output = inputArgs[2] ? (0, _path.join)(cwd, inputArgs[2]) : cwd;
  const {
    plugin,
    core,
    complete
  } = (0, _usePresetIndex.default)();
  const [presets, setPresets] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    complete && setPresets([...core, ...plugin].map(preset => ({
      value: preset.path,
      label: preset.name
    })));
  }, [name, complete]);
  const [selection, setSelection] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    name && presets && complete && setSelection(presets.filter(preset => (0, _lodash.isEqual)(preset.label, name))[0]);
  }, [complete, presets, name]);
  const isLoading = !name && !presets && !selection;
  const displayQuickSearch = !name && presets && !selection;
  return /*#__PURE__*/_react.default.createElement(_App.default, {
    isLoading: isLoading
  }, displayQuickSearch && /*#__PURE__*/_react.default.createElement(_selectInput.default, {
    label: "Select a preset",
    items: presets,
    onSelect: selection => setSelection(selection)
  }), selection && /*#__PURE__*/_react.default.createElement(_PresetMiddleware.default, {
    output: output,
    presetFile: selection.value
  }));
};

Preset.propTypes = {
  inputArgs: _propTypes.default.array
};
var _default = Preset;
exports.default = _default;
},{"../../src/components/input/select-input":"../src/components/input/select-input/index.js","./../../src/components/App":"../src/components/App.js","./../../src/middleware/PresetMiddleware":"../src/middleware/PresetMiddleware.js","../../src/hooks/usePresetIndex":"../src/hooks/usePresetIndex.js"}]},{},["preset/index.js"], null)
//# sourceMappingURL=/preset/index.js.map