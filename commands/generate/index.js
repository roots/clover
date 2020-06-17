import React, {useEffect, useState} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'
import QuickSearchInput from 'ink-quicksearch-input'

import useGenerators from './../../src/hooks/useGenerators'
import GeneratorMiddleware from './../../src/middleware/GeneratorMiddleware'

/** Command: bud generate */
/// Run a generator.
const Generate = ({inputArgs}) => {
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
    if (name && buds && complete) {
      const match = buds.filter(bud => bud.label == name)
      setSelection(match[0])
    }
  }, [complete, buds, name])

  const displayQuickSearch = !name && buds && !selection

  return (
    <Box>
      {displayQuickSearch && (
        <QuickSearchInput
          label="Select a generator"
          items={buds}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection && <GeneratorMiddleware budfile={selection.value} />}
    </Box>
  )
}

Generate.propTypes = {
  inputArgs: PropTypes.array,
}

export default Generate
