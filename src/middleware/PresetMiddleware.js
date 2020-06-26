import React from 'react'

import useConfig from './../hooks/useConfig'
import useData from './../hooks/useData'
import usePreset from '../hooks/usePreset'
import useSubscription from './../hooks/useSubscription'

import Tasks from './../components/Tasks'

const cwd = process.cwd()

/**
 * Middleware: Preset
 *
 * @prop {string} budfile
 * @prop {string} output
 */
const PresetMiddleware = ({presetFile, output}) => {
  const {config} = useConfig(cwd)
  const preset = usePreset(presetFile)
  const {data} = useData(preset)
  const {status, complete} = useSubscription({
    config,
    data,
    generator: preset,
    projectDir: output,
  })

  return <Tasks status={status} complete={complete} />
}

export default PresetMiddleware
