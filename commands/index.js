import React, {useEffect, useState} from 'react'
import {Box} from 'ink'
import QuickSearchInput from 'ink-quicksearch-input'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

import useGenerators from './../src/hooks/useGenerators'

import Banner from './../src/components/Banner'
import Footer from './../src/components/Footer'
import App from './../src/App'

/** Command: bud */
/// Bud
const Bud = () => {
  const [columns, rows] = useStdoutDimensions()
  const padding = 4
  const appDimensions = {
    height: rows - padding,
    width: columns - padding,
  }

  const {core, plugin, project, complete} = useGenerators()
  const [buds, setBuds] = useState(null)
  const [selection, setSelection] = useState(null)
  useEffect(() => {
    complete &&
      setBuds(
        [...project, ...plugin, ...core].map(bud => ({
          value: bud.path,
          label: bud.name,
        })),
      )
  }, [complete])

  return !selection ? (
    <Box
      paddingLeft={2}
      paddingRight={2}
      height={appDimensions.height}
      flexDirection="column"
      justifyContent="space-around">
      <Banner />

      {buds && !selection && (
        <QuickSearchInput
          label="Select a generator"
          items={buds}
          onSelect={selection => setSelection(selection)}
        />
      )}

      <Footer />
    </Box>
  ) : (
    <App budfile={selection.value} />
  )
}

export default Bud
