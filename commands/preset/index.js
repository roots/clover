import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {isEqual} from 'lodash'
import QuickSearchInput from 'ink-quicksearch-input'

import usePresetIndex from '../../src/hooks/usePresetIndex'

import App from './../../src/components/App'
import PresetMiddleware from './../../src/middleware/PresetMiddleware'

/** Command: bud preset */
/// Run a preset.
const Generate = ({inputArgs}) => {
  const [name] = useState(inputArgs[1] ?? null)
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
        <QuickSearchInput
          label="Select a preset"
          items={presets}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection && <PresetMiddleware presetFile={selection.value} />}
    </App>
  )
}

Generate.propTypes = {
  inputArgs: PropTypes.array,
}

export default Generate
