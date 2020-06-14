import React, {useEffect, useState} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'
import QuickSearchInput from 'ink-quicksearch-input'

import useGenerators from './../../src/hooks/useGenerators'

import App from './../../src/App'

/** Command: bud generate */
/// Run a generator.
/// Pass along the generator name as an argument if you wish to skip the prompt.
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

  return (
    <Box>
      {!name && buds && !selection && (
        <QuickSearchInput
          label="Select a generator"
          items={buds}
          onSelect={selection => setSelection(selection)}
        />
      )}

      {selection && <App budfile={selection.value} />}
    </Box>
  )
}

Generate.propTypes = {
  inputArgs: PropTypes.array,
}

export default Generate
