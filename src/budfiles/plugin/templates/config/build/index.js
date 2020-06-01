/** Webpack modules */
const devServer = require('./dev')
const entry = require('./entry')
const externals = require('./externals')
const optimization = require('./optimization')
const plugins = require('./plugins')
const resolve = require('./resolve')
const rules = require('./rules')

/** Utilities */
const {projectPath, isProduction} = require('./util')

/**
 * Defualt config
 */
const DEFAULT = {
  entry: {},
  externals: {},
  rules: [],
  plugins: [],
  alias: {},
  optimization: {},
  dev: {
    host: 'localhost',
    path: '/dist/',
    port: 3030,
  },
}

/**
 * Webpack config
 */
const webpack = (config = DEFAULT) => ({
  ...entry({config: config.entry}),
  ...devServer({config: config.dev}),
  ...plugins({dev: config.dev, plugins: config.plugins}),
  ...resolve({config: config.alias}),
  ...optimization({config: config.optimization}),
  ...externals({config: config.externals}),
  module: {...rules({config: config.rules})},
  context: projectPath('src/'),
  output: {
    path: projectPath('dist/'),
    publicPath: `//${config.dev.host}:${config.dev.port}/dist/`,
    filename: '[name].[hash].js',
  },
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
