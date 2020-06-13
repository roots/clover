import React from 'react'
import {Box} from 'ink'
import useExtensions from '../../src/hooks/useGenerators'

/** Command: bud plugins */
/// List bud plugins
const Extensions = () => {
  const [extensions] = useExtensions()

  return extensions.map((extension, id) => <Box key={id}>{extension.pkg.name}</Box>)
}

Extensions.propTypes = {}

Extensions.defaultProps = {}

Extensions.positionalArgs = []

export default Extensions
