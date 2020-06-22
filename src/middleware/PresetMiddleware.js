import React from 'react'

import useConfig from './../hooks/useConfig'
import useData from './../hooks/useData'
import usePreset from '../hooks/usePreset'
import useSubscription from './../hooks/useSubscription'

import Tasks from './../components/Tasks'

/**
 * Middleware: Preset
 *
 * @prop {string} budfile
 * @prop {string} output
 */
const PresetMiddleware = ({presetFile, output}) => {
  const {config} = useConfig(process.cwd())
  const preset = usePreset(presetFile)
  const {data} = useData(preset)
  const {status, complete} = useSubscription({
    config,
    data,
    generator: preset,
    projectDir: output ? output : process.cwd(),
  })

  return <Tasks status={status} complete={complete} />
}

export default PresetMiddleware
