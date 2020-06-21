import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {isEqual} from 'lodash'
import QuickSearchInput from 'ink-quicksearch-input'

import useGenerators from './../src/hooks/useGenerators'
import GeneratorMiddleware from './../src/middleware/GeneratorMiddleware'

import App from './../src/components/App'

/** Command: bud */
/// Bud CLI
const Bud = ({inputArgs}) => {
  const [name] = useState(inputArgs[1] ?? null)
  const {core, plugin, project, complete} = useGenerators()

  const [buds, setBuds] = useState(null)
  useEffect(() => {
    complete &&
      setBuds(
        [...project, ...plugin, ...core].map(bud => ({
          value: bud.path,
          label: bud.name,
        })),
      )
  }, [complete])

  const [selection, setSelection] = useState(null)
  useEffect(() => {
    name &&
      buds &&
      complete &&
      setSelection(buds.filter(bud => isEqual(bud.label, name))[0])
  }, [complete, buds, name])

  const isLoading = !name && !buds && !selection
  const displayQuickSearch = !name && buds && !selection

  return (
    <App isLoading={isLoading}>
      {displayQuickSearch && (
        <QuickSearchInput
          label="Select a generator"
          items={buds}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection && <GeneratorMiddleware budfile={selection.value} />}
    </App>
  )
}

Bud.propTypes = {
  inputArgs: PropTypes.array,
}

export default Bud
