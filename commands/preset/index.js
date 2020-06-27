import {join} from 'path'
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {isEqual} from 'lodash'
import SelectInput from '../../src/components/input/select-input'

import App from './../../src/components/App'
import PresetMiddleware from './../../src/middleware/PresetMiddleware'
import usePresetIndex from '../../src/hooks/usePresetIndex'

const cwd = process.cwd()

/** Command: bud preset */
/// Run a preset.
const Preset = ({inputArgs}) => {
  const name = inputArgs[1] || null
  const output = inputArgs[2] ? join(cwd, inputArgs[2]) : cwd
  const {plugin, core, complete} = usePresetIndex()

  const [presets, setPresets] = useState(null)
  useEffect(() => {
    complete &&
      setPresets(
        [...core, ...plugin].map(preset => ({
          value: preset.path,
          label: preset.name,
        })),
      )
  }, [name, complete])

  const [selection, setSelection] = useState(null)
  useEffect(() => {
    name &&
      presets &&
      complete &&
      setSelection(
        presets.filter(preset => isEqual(preset.label, name))[0],
      )
  }, [complete, presets, name])

  const isLoading = !name && !presets && !selection
  const displayQuickSearch = !name && presets && !selection

  return (
    <App isLoading={isLoading}>
      {displayQuickSearch && (
        <SelectInput
          label="Select a preset"
          items={presets}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection && (
        <PresetMiddleware
          output={output}
          presetFile={selection.value}
        />
      )}
    </App>
  )
}

Preset.propTypes = {
  inputArgs: PropTypes.array,
}

export default Preset
