import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'

import App from './../../src/App'

/** Constants */
const init = resolve(__dirname, './../../../src/generators/init/init.bud.js')

/** Command: bud init */
/// Create a new project
const Init = props => <App budfile={init} output={props.output} />

Init.propTypes = {
  /// Output directory
  output: PropTypes.string,
}

Init.positionalArgs = ['output']

export default Init
