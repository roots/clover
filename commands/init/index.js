import {resolve, join} from 'path'
import React from 'react'
import PropTypes from 'prop-types'

import GeneratorMiddleware from './../../src/middleware/GeneratorMiddleware'

/** Constants */
const init = resolve(
  __dirname,
  './../../../src/generators/init/init.bud.js',
)

const cwd = process.cwd()

/** Command: bud init */
/// Create a new project
const Init = ({inputArgs}) => {
  const output =
    inputArgs && inputArgs[1] ? join(cwd, inputArgs[1]) : cwd
  return <GeneratorMiddleware generatorFile={init} output={output} />
}

Init.propTypes = {
  /// Output directory
  inputArgs: PropTypes.array,
}

export default Init
