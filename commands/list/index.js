import React from 'react'
import {Box, Color, Text} from 'ink'

import useGeneratorIndex from './../../src/hooks/useGeneratorIndex'
import usePresetIndex from './../../src/hooks/usePresetIndex'
import App from './../../src/components/App'

/** Command: bud list */
/// List available budfiles
const List = () => {
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
        {presetsComplete && (
          <Box flexDirection="column" marginBottom={1}>
            <Text>
              <Color bgGreen black>
                Presets
              </Color>
            </Text>
            {presets.map((preset, id) => (
              <Box key={id} flexDirection="column">
                <Box>◦ {preset.name}</Box>
              </Box>
            ))}
          </Box>
        )}

        {generatorsComplete && (
          <Box flexDirection="column">
            <Text>
              <Color bgGreen black>
                Generators
              </Color>
            </Text>
            {generators.map((generator, id) => (
              <Box key={id} flexDirection="column">
                <Box>◦ {generator.name}</Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </App>
  )
}

export default List
