import {join} from 'path'
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {isEqual} from 'lodash'
import SelectInput from '../../src/components/input/select-input'

import usePresetIndex from '../../src/hooks/usePresetIndex'

import App from './../../src/components/App'
import PresetMiddleware from './../../src/middleware/PresetMiddleware'

const cwd = process.cwd()

/** Command: bud preset */
/// Run a preset.
const Preset = ({inputArgs}) => {
  /**
   * If a particular preset is specified, put it in state.
   */
  const name = inputArgs[1] || null

  /**
   * If an output directory was passed as an argument
   * then resolve the full path and put it in state.
   *
   * No argument will default to the cwd.
   */
  const output = inputArgs[2] ? join(cwd, inputArgs[2]) : cwd

  /**
   * Load all discoverable presets.
   *
   * @note The preset index hook
   *       also returns a boolean `complete` value which means that the
   *       search has concluded and we have all the values.
   */
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

  /**
   * If the user passed a name as an argument, filter the presets
   * with that value.
   */
  const [selection, setSelection] = useState(null)
  useEffect(() => {
    if (name && presets && complete) {
      /**
       * @todo it is possible that there was more than one matching presets for
       *       the specified name. We should let the user know that we are running
       *       the first result we find, but that a conflict existed.
       */
      const presetCandidates = presets.filter(preset => isEqual(preset.label, name))
      const selection = presetCandidates[0]

      setSelection(selection)
    }
  }, [complete, presets, name])

  /**
   * Presets are considered loading when there are
   * no resolved presets and no selection
   */
  const isLoading = !presets && !selection

  /**
   * Display search when no particular preset was specified,
   * we have presets to display and no selection has yet
   * been made.
   */
  const displayQuickSearch = !name && presets && !selection

  /**
   * Display the search field, and once a selection has been made
   * run the generator middleware on the selected generator.
   */
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
