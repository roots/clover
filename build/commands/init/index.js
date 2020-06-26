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
})({"../src/hooks/useConfig.js":[function(require,module,exports) {
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
  (0, _react.useEffect)(() => {
    if (generator && !data) {
      generator.prompts ? (0, _enquirer.prompt)(generator.prompts).then(data => setData(data)) : setData({});
    }
  }, [generator]);
  return {
    data
  };
};

var _default = useData;
exports.default = _default;
},{}],"../src/hooks/useGenerator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeGeneratorTemplateDir = exports.makeGenerator = exports.default = void 0;

var _path = require("path");

var _fs = require("fs");

const makeGenerator = generatorFile => (0, _fs.existsSync)(generatorFile) ? require(generatorFile) : null;

exports.makeGenerator = makeGenerator;

const makeGeneratorTemplateDir = generatorFile => (0, _path.join)((0, _path.dirname)(generatorFile), 'templates');
/**
 * Use Generator
 */


exports.makeGeneratorTemplateDir = makeGeneratorTemplateDir;

const useGenerator = generatorFile => {
  const generator = { ...makeGenerator(generatorFile),
    templateDir: makeGeneratorTemplateDir(generatorFile)
  }; // Attach the templateDir ref. to each generator task.

  generator.tasks = generator.tasks.map(task => ({ ...task,
    templateDir: generator.templateDir
  }));
  return {
    generator
  };
};

var _default = useGenerator;
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
    return /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
      green: true
    }, "\uD83C\uDFC1", '  ', "Done"));
  }

  if (!status || complete) {
    return [];
  }

  return /*#__PURE__*/_react.default.createElement(_ink.Box, null, status && /*#__PURE__*/_react.default.createElement(_ink.Text, null, /*#__PURE__*/_react.default.createElement(_ink.Color, {
    green: true
  }, /*#__PURE__*/_react.default.createElement(_inkSpinner.default, null)), ' ', status.toString()));
};

var _default = Tasks;
exports.default = _default;
},{}],"../src/middleware/GeneratorMiddleware.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _useConfig = _interopRequireDefault(require("./../hooks/useConfig"));

var _useData = _interopRequireDefault(require("./../hooks/useData"));

var _useGenerator = _interopRequireDefault(require("./../hooks/useGenerator"));

var _useSubscription = _interopRequireDefault(require("./../hooks/useSubscription"));

var _Tasks = _interopRequireDefault(require("./../components/Tasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
/**
 * Middleware: Generator
 *
 * @prop {string} generatorFile
 * @prop {string} output
 */

const GeneratorMiddleware = ({
  generatorFile,
  output
}) => {
  const {
    config
  } = (0, _useConfig.default)(cwd);
  const {
    generator
  } = (0, _useGenerator.default)(generatorFile);
  const {
    data
  } = (0, _useData.default)(generator);
  const {
    status,
    complete
  } = (0, _useSubscription.default)({
    config,
    data,
    generator,
    projectDir: output
  });
  return /*#__PURE__*/_react.default.createElement(_Tasks.default, {
    status: status,
    complete: complete
  });
};

var _default = GeneratorMiddleware;
exports.default = _default;
},{"./../hooks/useConfig":"../src/hooks/useConfig.js","./../hooks/useData":"../src/hooks/useData.js","./../hooks/useGenerator":"../src/hooks/useGenerator.js","./../hooks/useSubscription":"../src/hooks/useSubscription.js","./../components/Tasks":"../src/components/Tasks.js"}],"init/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GeneratorMiddleware = _interopRequireDefault(require("./../../src/middleware/GeneratorMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Constants */
const init = (0, _path.resolve)(__dirname, './../../../src/generators/init/init.bud.js');
const cwd = process.cwd();
/** Command: bud init */
/// Create a new project

const Init = ({
  inputArgs
}) => {
  const output = inputArgs && inputArgs[1] ? (0, _path.join)(cwd, inputArgs[1]) : cwd;
  return /*#__PURE__*/_react.default.createElement(_GeneratorMiddleware.default, {
    generatorFile: init,
    output: output
  });
};

Init.propTypes = {
  /// Output directory
  inputArgs: _propTypes.default.array
};
var _default = Init;
exports.default = _default;
},{"./../../src/middleware/GeneratorMiddleware":"../src/middleware/GeneratorMiddleware.js"}]},{},["init/index.js"], null)
//# sourceMappingURL=/init/index.js.map