const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const {isProduction} = require('./util')

/**
 * Webpack optimization
 */
const optimization = ({config}) => ({
  optimization: {
    minimize: true,
    noEmitOnErrors: isProduction,
    minimizer: isProduction ? [new UglifyJsPlugin()] : [],
    ...config,
  },
})

module.exports = optimization
