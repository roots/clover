/** Build modules */
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const DependencyExtractionPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} = require('webpack')
const WebpackBar = require('webpackbar')
const WriteFilePlugin = require('write-file-webpack-plugin')
const {isHMR} = require('./util')

/**
 * Webpack plugins.
 */
const plugins = ({dev, plugins}) => ({
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].[chunkhash].css`,
    }),
    new CleanWebpackPlugin(),
    new DependencyExtractionPlugin({
      useDefaults: true,
      injectPolyfill: false,
      outputFormat: 'json',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
			writeToFileEmit: true,
			publicPath: `//${dev.host}:${dev.port}/dist/`,
    }),
    new WebpackBar(),
    new DashboardPlugin(),
    ...(isHMR ? [
          new HotModuleReplacementPlugin(),
          new NoEmitOnErrorsPlugin(),
          new WriteFilePlugin(),
        ]:[]
    ),
    ...plugins,
  ],
})

module.exports = plugins