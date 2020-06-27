import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import path from 'path'
import {isEqual} from 'lodash'
import SelectInput from '../../src/components/input/select-input'

import App from './../../src/components/App'
import GeneratorMiddleware from './../../src/middleware/GeneratorMiddleware'
import useGeneratorIndex from './../../src/hooks/useGeneratorIndex'

const cwd = process.cwd()

/** Command: bud generate */
/// Run a generator.
const Generate = ({inputArgs}) => {
  const [name] = useState(inputArgs?.[1] ?? null)
  const [output, setOutput] = useState(cwd)
  useEffect(() => {
    inputArgs?.[2] &&
      (() => {
        setOutput(path.resolve(cwd, inputArgs[2]))
      })()
  }, [inputArgs])

  const {core, plugin, project, complete} = useGeneratorIndex()

  const [buds, setBuds] = useState(null)
  useEffect(() => {
    const allResults = [...project, ...plugin, ...core].map(bud => ({
      value: bud.path,
      label: bud.name,
    }))

    complete && setBuds(allResults)
  }, [name, complete])

  const [selection, setSelection] = useState(null)
  useEffect(() => {
    const rdy = name && buds && complete
    const selection = buds?.filter(bud => isEqual(bud.label, name))[0]

    rdy && setSelection(selection)
  }, [complete, buds, name])

  const isLoading = !name && !buds && !selection
  const displayQuickSearch = !name && buds && !selection

  return (
    <App isLoading={isLoading}>
      {displayQuickSearch && (
        <SelectInput
          items={buds}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection?.value && (
        <GeneratorMiddleware
          output={output}
          generatorFile={selection.value}
        />
      )}
    </App>
  )
}

Generate.propTypes = {
  inputArgs: PropTypes.array,
}

export default Generate
