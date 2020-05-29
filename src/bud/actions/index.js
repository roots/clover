import addDependencies from './addDependencies'
import compile from './compile'
import copy from './copy'
import ensureDir from './ensureDir'
import ensureDirs from './ensureDirs'
import git from './git'
import install from './install'
import json from './json'
import touch from './touch'

/**
 * Actions
 *
 * @type {object}
 */
const actions = {
  addDependencies,
  compile,
  copy,
  ensureDir,
  ensureDirs,
  git,
  install,
  json,
  touch,
  register: function ({action}) {
<<<<<<< HEAD
<<<<<<< HEAD
    this[`${action.handle}`] = action.callback
=======
      this[`${action.handle}`] = action.callback
>>>>>>> [wip] fix css enqueues. update plugin generator
=======
    this[`${action.handle}`] = action.callback
>>>>>>> readme
  },
}

export default actions
