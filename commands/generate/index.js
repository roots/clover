import React, {useState, useEffect} from 'react'
import {Box} from 'ink'
import Spinner from 'ink-spinner'
import PropTypes from 'prop-types'
import globby from 'globby'
import App from '../../src/components/App'

/**
 * Search helpers
 */
const cwd = process.cwd()

const search = {
  core: name => `${cwd}/node_modules/@roots/bud/src/budfiles/**/${name}.bud.js`,
  plugin: name => `${cwd}/node_modules/**/bud-plugin-*/${name}.bud.js`,
  project: name => `${cwd}/.bud/budfiles/**/${name}.bud.js`,
}

/** Command: bud generate */
/// Generate code from a budfile
const Generate = props => {
  const [budName] = useState(props.budName)

  /**
   * Budfile state.
   */
  const [budfile, setBudfile] = useState(false)
  const [checked, setChecked] = useState({
    project: false,
    modules: false,
    roots: false,
  })

  /**
   * Local budfiles.
   */
  useEffect(() => {
    budName &&
      !checked.project &&
      (async () => {
        const buds = await globby([search.project(budName)])
        buds && buds.length > 0 && setBudfile(buds[0])

        setChecked({...checked, project: true})
      })()
  }, [budName, checked.project])

  /**
   * Module budfiles.
   */
  useEffect(() => {
    !budfile &&
      checked.project &&
      (async () => {
        const buds = await globby([search.plugin(budName)])
        buds && buds.length > 0 && setBudfile(buds[0])

        setChecked({...checked, modules: true})
      })()
  }, [budfile, checked.project])

  /**
   * Core budfiles.
   */
  useEffect(() => {
    !budfile &&
      checked.modules &&
      (async () => {
        const buds = await globby([search.core(budName)])
        buds && buds.length > 0 && setBudfile(buds[0])

        setChecked({...checked, roots: true})
      })()
  }, [budfile, checked.modules])

  /**
   * Render.
   */
  return budfile ? (
    <App budfile={budfile} />
  ) : (
    <Box>
      <Spinner /> Loading
    </Box>
  )
}

Generate.propTypes = {
  // Generator name ([name].bud.js)
  budName: PropTypes.string,
}

Generate.positionalArgs = ['budName']

export default Generate
