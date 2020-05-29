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
    this[`${action.handle}`] = action.callback
  },
}

export default actions
