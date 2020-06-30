import React from 'react'
import {Box} from 'ink'

import useGeneratorIndex from './../../src/hooks/useGeneratorIndex'
import usePresetIndex from './../../src/hooks/usePresetIndex'
import App from './../../src/components/App'
import List from './../../src/components/List'

/** Command: bud list */
/// List available budfiles
const ListCommand = () => {
  /**
   * Fetch all available generators.
   */
  const {
    core: coreGenerators,
    plugin: pluginGenerators,
    project: projectGenerators,
    complete: generatorsComplete,
  } = useGeneratorIndex()
  const generators = [
    ...projectGenerators,
    ...pluginGenerators,
    ...coreGenerators,
  ]

  /**
   * Fetch all available presets.
   */
  const {
    core: corePresets,
    plugin: pluginPresets,
    complete: presetsComplete,
  } = usePresetIndex()
  const presets = [...corePresets, ...pluginPresets]

  /**
   * We have all available generators and presets.
   */
  const complete = generatorsComplete && presetsComplete

  return (
    <App isLoading={!complete}>
      {complete && (
        <Box flexDirection="column">
          <List label="Presets" items={presets} />
          <List label="Generators" items={generators} />
        </Box>
      )}
    </App>
  )
}

export default ListCommand
