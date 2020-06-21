import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'

import GeneratorMiddleware from './../../src/middleware/GeneratorMiddleware'

/** Constants */
const init = resolve(
  __dirname,
  './../../../src/generators/init/init.bud.js',
)

/** Command: bud init */
/// Create a new project
const Init = props => (
  <GeneratorMiddleware budfile={init} output={props.output} />
)

Init.propTypes = {
  /// Output directory
  output: PropTypes.string,
}

Init.positionalArgs = ['output']

export default Init
