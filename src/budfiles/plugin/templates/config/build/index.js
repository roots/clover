/** Webpack modules */
const entry = require('./entry')
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
 */
const webpack = (config = DEFAULT) => ({
  ...entry({entry: config.entry}),
  ...resolve({aliases: config.aliases}),
  ...optimization({config: config.optimization}),
  ...plugins({dev: config.dev,plugins: config.plugins}),
  module: {
    ...rules({config: config.rules}),
  },
  output: {
    path: projectPath('dist/'),
    publicPath: `//${config.dev.host}:${config.dev.port}/dist/`,
    filename: '[name].[hash].js',
  },
  devServer: {
    headers: {
			'Access-Control-Allow-Origin': '*',
		},
		disableHostCheck: true,
		stats: {
			all: false,
			assets: true,
			colors: true,
			errors: true,
			performance: true,
			timings: true,
			warnings: true,
		},
		port: 3030,
  },
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
