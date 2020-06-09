const devServer = require('./devServer')
const entry = require('./entry')
const optimization = require('./optimization')
const output = require('./output')
const plugins = require('./plugins')
const resolve = require('./resolve')
const rules = require('./rules')
const {projectPath, isProduction} = require('./util')

/**
 * Defualt config
 *
 * @type {object} default webpack configuration
 */
const DEFAULT = {
  entry: {},
  rules: [],
  plugins: [],
  aliases: {},
  optimization: {},
  dev: {
    host: 'localhost',
    port: 3030,
  },
}

/**
 * Webpack config
 *
 * @param  {object} config overrides
 * @return {object} final webpack configuration
 */
const webpack = (config = DEFAULT) => ({
  ...entry({entry: config.entry}),
  ...resolve({aliases: config.aliases}),
  ...optimization({config: config.optimization}),
  ...plugins({dev: config.dev, plugins: config.plugins}),
  ...devServer({devServer: config.dev}),
  ...output({dev: config.dev}),
  module: { ...rules({config: config.rules}) },
  context: projectPath('src/'),
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  watch: global.watch || false,
  stats: {
    all: false,
    assets: true,
    colors: true,
    errors: true,
    performance: true,
    timings: true,
    warnings: true,
  },
})

module.exports = {
  webpack,
  defaults: DEFAULT,
}
