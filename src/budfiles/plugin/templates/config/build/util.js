const {readdirSync, statSync} = require('fs')
const {join, resolve} = require('path')

/**
 * Webpack utilities
 *
 * @return {bool}
 */
const isProduction = process.env.NODE_ENV === 'production'
const isHMR = process.env.NODE_ENV === 'hmr'
const projectDir = process.cwd()
const projectPath = path => resolve(projectDir, path)

/**
 * Camel-case dash
 *
 * @param  {string}
 * @return {string}
 */
const camelCash = string => string.replace(
	/-([a-z])/g,
	(match, letter) => letter.toUpperCase()
);

/**
 * Return array of directories
 *
 * @param  {string} parentDir
 * @return {array}
 */
const dirs = parentDir =>
  readdirSync(resolve(projectDir, join('src', parentDir))).filter(file =>
    statSync(resolve(projectDir, join('src', parentDir, file))).isDirectory(),
  )

/**
 * Entrypoint: blocks
 */
const globber = groups => ({
  /** src/{{group}}/... */
  ...groups.reduce((acc, group, index) => ({
    ...index > 0 ? acc : [],
    /** src/group/{{dir}} */
    ...dirs(group.from).reduce((acc, asset, index) => ({
      ...index > 0 ? acc: [],
      /** src/group/dir/{{entrypoint}} */
      ...group.entries.reduce((acc, entry, index) => ({
        ...index > 0 ? acc: [],
        /** ENTRY */
        [join(group.from, asset, entry[0])]: join(projectDir, 'src', group.from, asset, entry[1]),
      }), group.entries[0]),
    }), dirs(group.from)[0]),
  }), groups[0]),
})

const util = {
  camelCash,
  isProduction,
  isHMR,
  dirs,
  globber,
  projectPath,
}

module.exports = util