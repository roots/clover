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
})({"../src/bud/compiler/helpers/index.js":[function(require,module,exports) {
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
  sprout,
  data
}) => {
  (0, _handlebarsHelpers.default)({
    handlebars: _handlebars.default
  });
  sprout.registerHelpers && sprout.registerHelpers.forEach(helper => {
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
  templateDir,
  config
}) => ({
  projectDir,
  templateDir,
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
  data
}) => {
  const setData = ({
    key,
    value
  }) => {
    data[`${key}`] = value;
  };

  return { ...(config ? config.project : []),
    ...data,
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
 * @prop {object}   sprout
 * @prop {object}   task
 * @prop {object}   actionProps
 */
const actions = ({
  observer,
  sprout,
  actions,
  ...props
}) => {
  (0, _rxjs.from)(sprout.tasks).pipe((0, _operators.concatMap)(task => new _rxjs.Observable(async observer => {
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
  logger,
  observer,
  util
}) => {
  let installation;
  observer.next(`Installing packages`);

  if (task.repo !== 'npm' && task.repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`);
  }

  if (task.repo == 'npm') {
    logger.info({
      emitter: 'addDependencies',
      task
    });
    installation = util.command(`yarn add ${task.dev ? `-D` : ``} ${task.pkgs.join(' ')}`);
  }

  if (task.repo == 'packagist') {
    logger.info({
      emitter: 'addDependencies',
      task
    });
    installation = util.command(`composer require ${task.pkgs.join(' ')} ${task.dev ? `--development` : ``}`);
  }

  installation.stdout.on('data', status => {
    observer.next(status);
  });
  installation.then(() => observer.complete());
};

var _default = addDependencies;
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
  logger,
  data,
  config,
  prettier,
  compiler
}) => {
  const src = await (0, _fsExtra.readFile)((0, _path.join)(config.templateDir, task.src), 'utf8');
  const dest = compiler.make(task.dest)(data);
  const template = compiler.make(src)(data);
  logger.info({
    emitter: 'compile',
    task,
    template: task.src,
    dest
  });
  observer.next(`Writing file ${dest}`);
  await (0, _fsExtra.outputFile)(...[(0, _path.join)(config.projectDir, dest), task.parser ? prettier.format(template, task.parser) : template]);
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
  observer,
  logger,
  config
}) => {
  const src = (0, _path.join)(config.templateDir, task.src);
  const dest = (0, _path.join)(config.projectDir, task.dest);
  logger.info({
    emitter: 'copy',
    task
  });
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
  logger,
  config,
  data,
  compiler
}) => {
  const path = (0, _path.join)(config.projectDir, compiler.make(task.path)(data));
  logger.info({
    emitter: 'ensureDir',
    task,
    path
  });
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
  logger,
  actions,
  config,
  data,
  compiler
}) => {
  logger.info({
    emitter: 'ensureDirs',
    task
  });
  (0, _rxjs.from)(task.dirs).pipe((0, _operators.concatMap)(path => new _rxjs.Observable(observer => {
    actions.ensureDir({
      task: {
        path
      },
      config,
      data,
      compiler,
      observer,
      logger
    });
  }))).subscribe({
    next: next => observer.next(next),
    error: error => observer.error(error),
    complete: () => observer.complete()
  });
};

var _default = ensureDirs;
exports.default = _default;
},{}],"../src/bud/actions/git.js":[function(require,module,exports) {
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
  logger,
  task,
  util
}) => {
  logger.next({
    emitter: 'clone',
    task
  });
  observer.next(`Cloning ${task.repo} to ${task.dest}`);
  const clone = util.command(`git clone git@github.com:${task.repo} ${task.dest}`);
  clone.stdout.on('data', () => observer.next(observer.next(`Cloning ${task.repo} to ${task.dest}}`)));
  clone.then(() => observer.complete());
};
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
  logger,
  ...props
}) => {
  logger.info({
    emitter: 'gite',
    task
  });

  if (task.action == 'clone') {
    clone({
      task,
      observer,
      ...props
    });
  }
};

var _default = git;
exports.default = _default;
},{}],"../src/bud/actions/install.js":[function(require,module,exports) {
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
  let installation;
  observer.next(`Installing packages from ${task.repo}...`);

  if (task.repo !== 'npm' && task.repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`);
  }

  if (task.repo == 'npm') {
    installation = util.command(`yarn`);
    installation.stdout.on('data', status => {
      observer.next(status);
    });
    installation.then(() => observer.complete());
  }

  if (task.repo == 'packagist') {
    installation = util.command(`composer install`);
    installation.then(() => observer.complete());
  }
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
 * @prop   {Observer} observer
 * @prop   {object}   util
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
    observer.error(`${JSON.stringify({
      task,
      config,
      data
    })}`);
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
},{"./addDependencies":"../src/bud/actions/addDependencies.js","./compile":"../src/bud/actions/compile.js","./copy":"../src/bud/actions/copy.js","./ensureDir":"../src/bud/actions/ensureDir.js","./ensureDirs":"../src/bud/actions/ensureDirs.js","./git":"../src/bud/actions/git.js","./install":"../src/bud/actions/install.js","./json":"../src/bud/actions/json.js","./touch":"../src/bud/actions/touch.js"}],"../src/bud/prettier/inferParser.js":[function(require,module,exports) {
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
},{"./inferParser":"../src/bud/prettier/inferParser.js","./format":"../src/bud/prettier/format.js"}],"../src/bud/logger/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const pino = require('pino');

const prettifier = require('pino-pretty');
/**
 * Make logger
 *
 * @return {<Pino>()=>logger}
 */


const makeLogger = ({
  projectDir
}) => {
  return pino({
    prettyPrint: {
      levelFirst: true
    },
    prettifier
  }, pino.destination(`${projectDir}/.bud/bud.log`));
};

var _default = makeLogger;
exports.default = _default;
},{}],"../src/bud/index.js":[function(require,module,exports) {
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

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 🌱 bud starter
 *
 * @prop {string} projectDir
 * @prop {object} projectConfig
 * @prop {object} data
 * @prop {object} sprout
 * @prop {string} templateDir
 *
 * @return {Observable}
 */
const bud = props => {
  const {
    sprout
  } = props;
  const logger = (0, _logger.default)({ ...props
  });
  const config = (0, _config.default)({ ...props
  });
  const data = (0, _data.default)({ ...props
  });
  const util = (0, _util.default)({
    config
  });
  const compiler = (0, _compiler.default)({
    sprout,
    data
  });
  sprout.registerActions && sprout.registerActions.forEach(action => {
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
      sprout,
      logger
    };
    (0, _rxjs.from)(_pipes.default).pipe((0, _operators.concatMap)(job => new _rxjs.Observable(async observer => {
      await job({
        observer,
        ...props
      });
    }))).subscribe({
      next: next => {
        next && logger.info({
          emitter: 'bud',
          emitted: 'next'
        });
        observer.next(next);
      },
      error: error => {
        error && logger.error({
          emitter: 'bud',
          emitted: 'error'
        });
        observer.error(error);
      },
      complete: () => observer.complete()
    });
  });
};

var _default = bud;
exports.default = _default;
},{"./compiler":"../src/bud/compiler/index.js","./config":"../src/bud/config/index.js","./data":"../src/bud/data/index.js","./util":"../src/bud/util/index.js","./pipes":"../src/bud/pipes/index.js","./actions":"../src/bud/actions/index.js","./prettier":"../src/bud/prettier/index.js","./logger":"../src/bud/logger/index.js"}],"../src/components/Banner.js":[function(require,module,exports) {
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
},{}],"../src/components/Tasks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Tasks
 *
 * @prop {object} data
 * @prop {object} status
 * @prop {bool}   complete
 * @prop {bool}   noClear
 */
const Tasks = ({
  data,
  status,
  complete,
  noClear
}) => {
  const {
    stdout
  } = (0, _ink.useStdout)();
  (0, _react.useEffect)(() => {
    data && !noClear && stdout.write('\x1B[2J\x1B[0f');
  }, [data]);
  return status ? /*#__PURE__*/_react.default.createElement(_ink.Box, null, complete ? /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, "\u26A1\uFE0F All set.") : /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, {
    type: "dots"
  })), ` ${status}`)) : null;
};

var _default = Tasks;
exports.default = _default;
},{}],"../src/components/Error.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error
 */
const Error = ({
  message
}) => /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
  red: true
}, "\uD83D\uDCA5 ", JSON.stringify(message)));

var _default = Error;
exports.default = _default;
},{}],"../src/components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _fs = require("fs");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _enquirer = require("enquirer");

var _bud = _interopRequireDefault(require("../bud"));

var _Banner = _interopRequireDefault(require("./Banner"));

var _Tasks = _interopRequireDefault(require("./Tasks"));

var _Error = _interopRequireDefault(require("./Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const cwd = process.cwd();
/**
 * App
 *
 * @prop {string} label
 * @prop {string} templateDir
 * @prop {object} sprout
 * @prop {string} outDir
 * @prop {object} values
 * @prop {object} children
 * @prop {bool}   noClear
 */

const App = ({
  label,
  templateDir,
  sprout,
  outDir,
  noClear
}) => {
  /**
   * source bud.config.json
   */
  const configFile = (0, _path.join)(cwd, '.bud/bud.config.json');
  const [config] = (0, _react.useState)((0, _fs.existsSync)(configFile) ? require(configFile) : null);
  /**
   * Assemble data from prompts
   */

  const [data, setData] = (0, _react.useState)(null);
  const [prompts, setPrompts] = (0, _react.useState)(sprout.prompts ? sprout.prompts : null);
  (0, _react.useEffect)(() => {
    if (prompts) {
      (0, _enquirer.prompt)(prompts).then(data => {
        setPrompts(null);
        setData(data);
      });
    } else {
      setPrompts(null);
      setData({});
    }
  }, []);
  /**
   * Observer subscribe
   */

  const [status, setStatus] = (0, _react.useState)(null);
  const [error, setError] = (0, _react.useState)(null);
  const [complete, setComplete] = (0, _react.useState)(false);
  const [subscription, setSubscription] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    data && !subscription && setSubscription((0, _bud.default)({
      sprout,
      data,
      config,
      templateDir,
      projectDir: (0, _path.join)(cwd, outDir)
    }).subscribe({
      next: next => setStatus(next),
      error: error => setError(error),
      complete: () => setComplete(true)
    }));
  }, [config, data, status]);
  /**
   * Observer unsubscribe.
   */

  const {
    exit
  } = (0, _ink.useApp)();
  (0, _react.useEffect)(() => {
    const unsubscribe = async () => {
      await subscription.unsubscribe();
      exit();
    };

    complete && unsubscribe();
  }, [complete, subscription]);
  /**
   * Render observable updates and errors
   */

  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 1
  }, /*#__PURE__*/_react.default.createElement(_Banner.default, {
    label: label
  }), /*#__PURE__*/_react.default.createElement(_Tasks.default, {
    data: data,
    status: status,
    complete: complete,
    noClear: noClear
  }), error && /*#__PURE__*/_react.default.createElement(_Error.default, {
    message: error
  }));
};

App.propTypes = {
  label: _propTypes.default.string,
  sprout: _propTypes.default.object,
  noClear: _propTypes.default.bool
};
App.defaultProps = {
  sprout: {
    actions: [],
    label: 'Bud',
    prompts: []
  },
  noClear: false
};
var _default = App;
exports.default = _default;
},{"../bud":"../src/bud/index.js","./Banner":"../src/components/Banner.js","./Tasks":"../src/components/Tasks.js","./Error":"../src/components/Error.js"}],"init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

var _App = _interopRequireDefault(require("./../src/components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** Constants */
const budfileDir = (0, _path.resolve)(__dirname, './../../src/budfiles/init');
/** Command: bud init */
/// Create a new project

const Init = props => {
  /**
   * Directories
   */
  const [projectDir] = (0, _react.useState)(props.projectDir);
  const [budfile, setBudfile] = (0, _react.useState)(null);
  const [templateDir, setTemplateDir] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (budfileDir) {
      setBudfile(`${budfileDir}/init.bud`);
      setTemplateDir(`${budfileDir}/templates`);
    }
  }, [budfileDir]);
  /**
   * Sprout.
   */

  const [sprout, setSprout] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    budfile && setSprout(require(budfile));
  }, [budfile]);
  /**
   * Label.
   */

  const [label, setLabel] = (0, _react.useState)('Bud CLI');
  (0, _react.useEffect)(() => {
    sprout && setLabel(sprout.label);
  }, [sprout]);
  /**
   * Render.
   */

  return sprout ? /*#__PURE__*/_react.default.createElement(_App.default, {
    label: label,
    outDir: projectDir || '',
    sprout: sprout,
    templateDir: templateDir
  }) : /*#__PURE__*/_react.default.createElement(_ink.Box, null, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null), " Loading");
};

Init.propTypes = {
  /// Output directory
  projectDir: _propTypes.default.string
};
Init.defaultProps = {
  budfileDir: budfileDir
};
Init.positionalArgs = ['projectDir'];
var _default = Init;
exports.default = _default;
},{"./../src/components/App":"../src/components/App.js"}]},{},["init.js"], null)
//# sourceMappingURL=/init.js.map