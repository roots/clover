import {join} from 'path'
import {exists} from 'fs-extra'
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {isNull} from 'lodash'

import GeneratorMiddleware from './../../src/middleware/GeneratorMiddleware'

/** Constants */
const cwd = process.cwd()
const generatorsDir = require('@roots/bud-generators')
const newProjectInit = join(
  generatorsDir,
  'bud-init-new/bud-init-new.bud.js',
)
const existingProjectInit = join(
  generatorsDir,
  'bud-init-existing/bud-init-existing.bud.js',
)

/** Command: bud init */
/// Create a new project
const Init = ({inputArgs}) => {
  /**
   * If no output is specified we assume cwd.
   */
  const output =
    inputArgs && inputArgs[1] ? join(cwd, inputArgs[1]) : cwd

  /**
   * Determine if target out directory is an existing project or all-new
   */
  const [newProject, setNewProject] = useState(null)
  useEffect(() => {
    ;(async () => {
      const projectExists = await exists(join(output, 'package.json'))
      setNewProject(!projectExists)
    })()
  }, [])

  /**
   * If the target dir already contains a package.json file
   * then run the init generator which respects that.
   */
  const [command, setCommand] = useState(null)
  useEffect(() => {
    if (!isNull(newProject)) {
      const init = newProject ? newProjectInit : existingProjectInit

      setCommand(init)
    }
  }, [newProject])

  return command ? (
    <GeneratorMiddleware generatorFile={command} output={output} />
  ) : (
    []
  )
}

Init.propTypes = {
  /// Output directory
  inputArgs: PropTypes.array,
}

export default Init
