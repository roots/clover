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
  /**
   * If a particular generator is specified, put it in state.
   */
  const [name] = useState(inputArgs?.[1] ?? null)

  /**
   * If an output directory was passed as an argument
   * then resolve the full path and put it in state.
   *
   * No argument will default to the cwd.
   */
  const [output, setOutput] = useState(cwd)
  useEffect(() => {
    inputArgs?.[2] && setOutput(path.resolve(cwd, inputArgs[2]))
  }, [inputArgs])

  /**
   * Load all discoverable generators.
   *
   * @note The generator index hook also returns a boolean
   *       `complete` value indicating that the
   *       search has concluded and we have all the values.
   */
  const {core, plugin, project, complete} = useGeneratorIndex()
  const [generators, setGenerators] = useState(null)
  useEffect(() => {
    const allResults = [...project, ...plugin, ...core].map(bud => ({
      value: bud.path,
      label: bud.name,
    }))

    complete && setGenerators(allResults)
  }, [name, complete])

  /**
   * If the user passed a name as an argument, filter the generators
   * with that value.
   */
  const [selection, setSelection] = useState(null)
  useEffect(() => {
    /**
     * @todo it is possible that there was more than one matching generator for
     *       the specified name. We should let the user know that we are running
     *       the first result we find, but that a conflict existed.
     */
    const candidates = generators?.filter(bud =>
      isEqual(bud.label, name),
    )
    const selection = candidates?.[0]

    const isReady = name && generators && complete
    isReady && setSelection(selection)
  }, [complete, generators, name])

  /**
   * Generators are considered loading when there are
   * no resolved generators and no selection
   */
  const isLoading = !generators && !selection

  /**
   * Display search when no particular generator was specified,
   * we have generators to display and no selection has yet
   * been made.
   */
  const displaySearch = !name && generators && !selection

  /**
   * Display the search field, and once a selection has been made
   * run the generator middleware on the selected generator.
   */
  return (
    <App isLoading={isLoading}>
      {displaySearch && (
        <SelectInput
          items={generators}
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
