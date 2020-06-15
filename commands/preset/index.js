import React, {useEffect, useState} from 'react'
import {Box, Text, Color} from 'ink'
import PropTypes from 'prop-types'
import QuickSearchInput from 'ink-quicksearch-input'

import useGenerators from '../../src/hooks/useGenerators'
import usePresets from '../../src/hooks/usePresets'

import App from '../../src/App'

/** Command: bud preset */
/// Run a preset.
const Preset = ({inputArgs}) => {
  const [name] = useState(inputArgs[1] ?? null)
  const [selection, setSelection] = useState(null)

  /**
   * All resolvable presets
   */
  const {
    core: corePresets,
    plugin: pluginPresets,
    project: projectPresets,
    complete: presetsComplete,
  } = usePresets()

  /**
   * All resolvable generators
   */
  const {
    core: coreGenerators,
    plugin: pluginGenerators,
    project: projectGenerators,
    complete: generatorsComplete,
  } = useGenerators()

  /**
   * Format generator results
   */
  const [generators, setGenerators] = useState(null)
  useEffect(() => {
    generatorsComplete &&
      setGenerators(
        [...projectGenerators, ...pluginGenerators, ...coreGenerators].map(generator => ({
          value: generator.path,
          label: generator.name,
        })),
      )
  }, [generatorsComplete])

  /**
   * Format preset results
   */
  const [presets, setPresets] = useState(null)
  useEffect(() => {
    presetsComplete &&
      setPresets(
        [...projectPresets, ...pluginPresets, ...corePresets].map(preset => ({
          value: preset.path,
          label: preset.name,
        })),
      )
  }, [presetsComplete])

  /**
   * Resolve preset if one was passed via CLI
   */
  useEffect(() => {
    if (name && presets && presetsComplete) {
      const match = presets.filter(preset => preset.label == name)

      setSelection(match[0])
    }
  }, [presetsComplete, presets, name])

  /**
   * From a selection (either by argument or interface)
   * Source the preset data.
   */
  const [preset, setPreset] = useState(null)
  useEffect(() => {
    selection &&
      !preset &&
      setPreset({
        ...selection,
        data: require(selection.value),
      })
  }, [selection])

  /**
   * Filter generators based on specs of selected preset
   */
  const [generatorQueue, setGeneratorQueue] = useState([])
  useEffect(() => {
    if (preset && generatorsComplete) {
      const presetGenerators = generators.filter(
        generator => preset.data.buds[`${generator.name}`],
      )

      setGeneratorQueue(presetGenerators)
    }
  }, [preset, generatorsComplete])

  const noResults = presetsComplete && (!presets || !presets.length > 0)

  return (
    <Box>
      {noResults && (
        <Text>
          <Color red>No presets found</Color>
        </Text>
      )}

      {!name && !selection && presets?.length > 0 && (
        <QuickSearchInput
          label="Select a preset"
          items={presets}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {generatorQueue.length > 0 && <App queue={generatorQueue} />}
    </Box>
  )
}

Preset.propTypes = {
  inputArgs: PropTypes.array,
}

export default Preset
