import React from 'react'
import {Box} from 'ink'

import useGeneratorIndex from './../../src/hooks/useGeneratorIndex'
import usePresetIndex from './../../src/hooks/usePresetIndex'
import App from './../../src/components/App'
import List from './../../src/components/List'

/** Command: bud list */
/// List available budfiles
const ListCommand = () => {
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

  const {
    core: corePresets,
    plugin: pluginPresets,
    complete: presetsComplete,
  } = usePresetIndex()
  const presets = [...corePresets, ...pluginPresets]

  const complete = generatorsComplete && presetsComplete

  return (
    <App isLoading={!complete}>
      <Box flexDirection="column">
        <List label="Presets" items={presets} />
        <List label="Generators" items={generators} />
      </Box>
    </App>
  )
}

export default ListCommand
