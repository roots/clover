import {join, resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'

import App from './../src/components/App'

/** Constants */
const budfileDir = resolve(__dirname, './../../src/budfiles/init')

/** Command: bud init */
/// Create a new project
const Init = props => (
  <App
    budfile={join(budfileDir, 'init.bud.js')}
    logging={props.logging}
    output={props.output}
  />
)

Init.propTypes = {
  /// Output directory
  output: PropTypes.string,
  /// Enable logging
  logging: PropTypes.bool,
}

Init.defaultProps = {
  logging: false,
}

Init.positionalArgs = ['output']

export default Init
