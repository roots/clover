import {resolve} from 'path'
import React from 'react'
import PropTypes from 'prop-types'
import BudCLI from './../src/components/BudCLI'

/** Command: bud init */
/// Create a new project
const Init = props => (
  <BudCLI
    values={props.name ? props : null}
    outDir={props.projectDir}
    label={require(`${props.budFileDir}/init.bud`).label}
    sprout={require(`${props.budFileDir}/init.bud`)}
    templateDir={`${props.budFileDir}/templates`}
  />
)

Init.propTypes = {
  /// Project name
  name: PropTypes.string,
  /// Project namespace
  namespace: PropTypes.string,
  /// Project description
  description: PropTypes.string,
  /// Project author name
  author: PropTypes.string,
  /// Project author email
  email: PropTypes.string,
  /// Project website
  website: PropTypes.string,
  /// Project proxy URL
  proxy: PropTypes.string,
  /// Project uses SSL
  protocol: PropTypes.string,
  /// Dev server port
  port: PropTypes.number,
  /// Output directory
  projectDir: PropTypes.string,
}

Init.defaultProps = {
  budFileDir: resolve(__dirname, './../../src/budfiles/init'),
}

Init.positionalArgs = ['projectDir']

export default Init