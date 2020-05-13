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
})({"../prettier.config.js":[function(require,module,exports) {
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 80,
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
},{}],"../src/bud/helpers.js":[function(require,module,exports) {
/**
 * Handlebars helpers
 */
module.exports = data => {
  return [{
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
};
},{}],"../src/bud/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bud = void 0;

const {
  join
} = require('path');

const fs = require('fs-extra');

const fetch = require('node-fetch');

const execa = require('execa');

const handlebars = require('handlebars');

const prettier = require('prettier');

const {
  Observable,
  from
} = require('rxjs');

const {
  concatMap
} = require('rxjs/operators');

const basePrettierConfig = require('./../../prettier.config.js');

const handlebarsHelpers = require('handlebars-helpers');

const helpers = require('./helpers');
/**
 * Bud Core
 */


const bud = {
  fs,
  fetch,
  execa,
  prettier,
  handlebars,

  /**
   * Initialize
   *
   * @param {string} outDir
   * @param {object} data
   * @param {object} sprout
   * @param {string} templateDir
   * @param {bool}   skipInstall
   */
  init: function ({
    outDir = './',
    data = {},
    sprout,
    templateDir
  }) {
    this.data = data;
    this.sprout = sprout;
    this.projectDir = outDir;
    this.execaOptions = {
      cwd: this.projectDir
    };
    this.templateDir = templateDir;
    this.registerActions();
    this.registerHelpers();
    return this;
  },

  /**
   * Get config.
   *
   * @return {object}
   */
  getConfig: function () {
    return {
      path: `${process.cwd()}/${this.projectDir}/.bud/bud.config.json`,
      data: require(`${process.cwd()}/${this.projectDir}/.bud/bud.config.json`)
    };
  },

  /**
   * Get data.
   *
   * @return {object}
   */
  getData: function () {
    return this.data;
  },

  /**
   * Set data.
   *
   * @param  {object} data
   * @return {void}
   */
  setData: function (data) {
    this.data = data;
  },

  /**
   * Get template contents.
   *
   * @param  {string} template
   * @return {array}
   */
  getTemplate: async function (template) {
    const path = join(this.templateDir, template);
    const contents = await fs.readFile(path, 'utf8');
    return {
      path,
      contents
    };
  },

  /**
   * Register actions
   */
  registerActions: function () {
    this.sprout.registerActions && this.sprout.registerActions.forEach(action => {
      this[`${action.handle}`] = action.callback;
    });
  },

  /**
   * Register helpers
   */
  registerHelpers: function () {
    // lib helpers
    handlebarsHelpers({
      handlebars: this.handlebars
    }); // plugin registered helpers

    this.sprout.registerHelpers && this.sprout.registerHelpers.length > 0 && this.sprout.registerHelpers.forEach(helper => {
      helpers.push(helper);
    }); // roots/bud helpers

    helpers(this.getData()).forEach(({
      helper,
      fn
    }) => {
      this.handlebars.registerHelper(helper, fn);
    });
  },

  /**
   * Format
   *
   * @param  {object|string} content
   * @param  {parser} string
   * @return {string}
   */
  format: function (content, parser) {
    return this.prettier.format(typeof content !== 'string' ? JSON.stringify(content) : content, { ...basePrettierConfig,
      parser: parser || 'babel'
    });
  },

  /**
   * Actions
   *
   * @return {Observable}
   */
  actions: function () {
    const bud = { ...this
    };
    return new Observable(function (observer) {
      from(bud.sprout.actions).pipe(concatMap(function (task) {
        return new Observable(async function (observer) {
          return bud[task.action](task, observer, bud);
        });
      })).subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: complete => observer.complete(complete)
      });
    });
  },

  /**
   * Scaffold directories
   *
   * @param  {array} paths
   * @return {Observable}
   */
  scaffold: function ({
    paths
  }, observer) {
    observer.next(`Creating directories`);
    from(paths).pipe(concatMap(path => {
      return new Observable(async observer => {
        await this.mkDir({
          path
        }, observer);
      });
    })).subscribe({
      next: next => observer.next(next),
      complete: () => observer.complete()
    });
  },

  /**
   * Make directory
   *
   * @param  {string}     path
   * @param  {Observable} observer
   * @return {Observable}
   */
  mkDir: async function ({
    path
  }, observer) {
    const pathTemplate = this.handlebars.compile(path);
    const dirPath = join(this.projectDir, pathTemplate(this.getData()));
    await fs.ensureDir(dirPath).then(() => {
      observer.complete();
    });
  },

  /**
   * Action: template
   *
   * @param  {string} parser
   * @param  {string} path
   * @param  {string} template
   * @return {Observable}
   */
  template: async function ({
    parser,
    path,
    template
  }, observer) {
    const {
      contents
    } = await this.getTemplate(template);
    const dest = join(this.projectDir, this.handlebars.compile(path)(this.getData()));
    observer.next(`Writing ${dest.split('/')[dest.split('/').length - 1]}`);
    const compiled = this.handlebars.compile(contents)(this.getData());
    const outputContents = parser ? this.format(compiled, parser) : compiled;
    fs.outputFile(dest, outputContents).then(() => observer.complete());
  },

  /**
   * Action: Modules
   *
   * @param  {array} pkgs
   * @param  {bool}  dev
   * @return {Observable}
   */
  addDependencies: async function ({
    repo,
    pkgs,
    dev
  }, observer) {
    let installation;
    observer.next(`Installing packages from ${repo}...`);

    if (repo !== 'npm' && repo !== 'packagist') {
      observer.error(`Incorrect package repo specified.`);
    }

    if (repo == 'npm') {
      installation = this.execa.command(`yarn add ${dev ? `-D` : ``} ${pkgs.join(' ')}`, this.execaOptions);
    }

    if (repo == 'packagist') {
      installation = this.execa.command(`composer require ${pkgs.join(' ')} ${dev ? `--development` : ``}`, this.execaOptions);
    }

    installation.stdout.on('data', status => {
      observer.next(status);
    });
    installation.then(() => observer.complete());
  },

  /**
   * Action: Install from package files
   *
   * @param  {string} repo
   * @return {Observable}
   */
  install: async function ({
    repo
  }, observer) {
    let installation;
    observer.next(`Installing packages from ${repo}...`);

    if (repo !== 'npm' && repo !== 'packagist') {
      observer.error(`Incorrect package repo specified.`);
    }

    if (repo == 'npm') {
      installation = this.execa.command(`yarn`, this.execaOptions);
    }

    if (repo == 'packagist') {
      installation = this.execa.command(`composer install`, this.execaOptions);
    }

    installation.stdout.on('data', status => {
      observer.next(status);
    });
    installation.then(() => observer.complete());
  },

  /**
   * Expose project JSON
   */
  json: async function ({
    file,
    merge
  }, observer) {
    const json = require(`${this.projectDir}/${file}`);

    observer.next(`Writing JSON to ${file}`);

    try {
      const output = merge(json);
      await fs.outputFile(`${this.projectDir}/${file}`, this.format(output, 'json'));
      observer.complete();
    } catch (err) {
      observer.error(`There was a problem writing to ${file}`);
    }
  }
};
exports.bud = bud;
},{"./../../prettier.config.js":"../prettier.config.js","./helpers":"../src/bud/helpers.js"}],"../src/components/BudCLI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fs = require("fs");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkLink = _interopRequireDefault(require("ink-link"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

var _enquirer = require("enquirer");

var _bud = require("./../bud");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULT_BUDFILE = {
  actions: [],
  label: 'Budfile',
  prompts: []
};
/**
 * Bud CLI
 *
 * @prop {string} label
 * @prop {string} budFile
 * @prop {string} outDir
 * @prop {object} values
 * @prop {object} children
 */

const BudCLI = ({
  label,
  templateDir,
  sprout = DEFAULT_BUDFILE,
  outDir,
  values = null,
  inert = false,
  children
}) => {
  /**
   * Parse values from .bud/bud.config.json
   */
  const config = (0, _path.join)(process.cwd(), '.bud/bud.config.json');
  const [configData] = (0, _react.useState)((0, _fs.existsSync)(config) ? require(config) : null);
  /**
   * Parse values from prompt
   */

  const [prompts, setPrompts] = (0, _react.useState)(!values && sprout.prompts ? sprout.prompts : null);
  const {
    exit
  } = (0, _ink.useApp)();
  const [data, setData] = (0, _react.useState)(null);
  const [status, setStatus] = (0, _react.useState)(null);
  const [complete, setComplete] = (0, _react.useState)(false);
  const [budSubscription, setBudSubscription] = (0, _react.useState)(false);
  /**
   * Assemble data from config files, prompt & cli args/flags.
   */

  (0, _react.useEffect)(() => {
    prompts ? (0, _enquirer.prompt)(prompts).then(data => {
      setPrompts(null);
      setData({ ...(configData && configData.project ? configData.project : []),
        ...(configData && configData.dev ? configData.dev : []),
        ...data,
        ...(values ? values : [])
      });
    }) : (() => {
      setPrompts(null);
      setData({ ...(configData && configData.project ? configData.project : []),
        ...(configData && configData.dev ? configData.dev : []),
        ...(values ? values : [])
      });
    })();
  }, []);
  /**
   * Run the budfile actions
   */

  (0, _react.useEffect)(() => {
    data && !inert && !budSubscription && setBudSubscription(_bud.bud.init({
      data,
      templateDir,
      sprout,
      outDir
    }).actions().subscribe({
      next: next => setStatus(next),
      complete: () => setComplete(true)
    }));
  }, [data, status]);
  (0, _react.useEffect)(() => {
    complete && (async () => {
      await budSubscription.unsubscribe();
      exit();
    })();
  }, [complete, budSubscription]);
  /**
   * Render TTY
   */

  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, {
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
  }, '  Bud'))))), /*#__PURE__*/_react.default.createElement(Tasks, {
    data: data,
    status: status,
    complete: complete
  }), children && children);
};

const Tasks = ({
  data,
  status,
  complete
}) => {
  const {
    stdout
  } = (0, _ink.useStdout)();
  (0, _react.useEffect)(() => {
    data && stdout.write('\x1B[2J\x1B[0f');
  }, [data]);
  return status ? /*#__PURE__*/_react.default.createElement(_ink.Box, null, complete ? /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, "\u26A1\uFE0F All set.") : /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, {
    type: "dots"
  })), ` ${status}`)) : [];
};

var _default = BudCLI;
exports.default = _default;
},{"./../bud":"../src/bud/index.js"}],"generate/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkTable = _interopRequireDefault(require("ink-table"));

var _BudCLI = _interopRequireDefault(require("../../src/components/BudCLI"));

var _globby = _interopRequireDefault(require("globby"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Budfile glob paths
 */
const rootsBudsGlob = (0, _path.resolve)(__dirname, `../../../src/budfiles/**/*.bud.js`);
const moduleBudsGlob = (0, _path.join)(process.cwd(), `node_modules/**/bud-plugin-*/**/*.bud.js`);
const projectBudsGlob = (0, _path.join)(process.cwd(), `.bud/budfiles/**/*.bud.js`);
/** Command: bud generate */
/// List available budfiles

const GenerateIndex = () => {
  /**
   * Project buds
   */
  const [projectBuds, setProjectBuds] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      const buds = await (0, _globby.default)([projectBudsGlob]);
      buds && setProjectBuds(buds.map(bud => {
        const src = require(bud);

        return {
          command: `bud generate ${src.name}`,
          source: 'project',
          name: src.name,
          description: src.description
        };
      }));
    })();
  }, []);
  /**
   * Module buds
   */

  const [moduleBuds, setModuleBuds] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      const buds = await (0, _globby.default)([moduleBudsGlob]);
      buds && setModuleBuds(buds.map(bud => {
        const src = require(bud);

        return {
          command: `bud generate ${src.name}`,
          source: 'plugin',
          name: src.name,
          description: src.description
        };
      }));
    })();
  }, []);
  /**
   * Module buds
   */

  const [rootsBuds, setRootsBuds] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    ;

    (async () => {
      const buds = await (0, _globby.default)([rootsBudsGlob]);
      buds && setRootsBuds(buds.map(bud => {
        const src = require(bud);

        return src.name !== 'bud' && src.name !== 'init' ? {
          command: `bud generate ${src.name}`,
          source: '@roots/bud',
          name: src.name,
          description: src.description
        } : {};
      }).filter(bud => bud.name));
    })();
  }, []);
  /**
   * Render
   */

  return /*#__PURE__*/_react.default.createElement(_BudCLI.default, {
    label: 'bud generate',
    inert: true
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column",
    marginTop: 1,
    marginBottom: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginBottom: 1
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, "Budfiles available:"))), /*#__PURE__*/_react.default.createElement(_ink.Box, {
    width: 200,
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }, /*#__PURE__*/_react.default.createElement(_inkTable.default, {
    width: 200,
    data: [...projectBuds, ...rootsBuds, ...moduleBuds]
  }))));
};

var _default = GenerateIndex;
exports.default = _default;
},{"../../src/components/BudCLI":"../src/components/BudCLI.js"}]},{},["generate/index.js"], null)
//# sourceMappingURL=/generate/index.js.map