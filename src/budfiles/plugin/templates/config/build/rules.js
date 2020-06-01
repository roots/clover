const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {projectPath} = require('./util')

/**
 * Webpack module rules
 */
const rules = ({config}) => ({
  strictExportPresence: true,
  rules: [
    {
      test: /\.(js|jsx)$/,
      include: projectPath('src'),
      exclude: /node_modules/,
      use: [
        {loader: 'babel-loader'},
        {loader: 'eslint-loader'},
      ],
    },
    {
      test: /\.css$/,
      include: projectPath('src'),
      use: [
        MiniCssExtractPlugin.loader,
        {loader: 'css-loader'},
        {loader: 'postcss-loader'},
      ],
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      use: [{loader: 'file-loader', options: {name: '[path][name].[ext]'}}],
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    },
  ],
})

module.exports = rules
