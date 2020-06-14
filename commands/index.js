import React, {useEffect, useState} from 'react'
import {Box, Color, Text} from 'ink'
import QuickSearchInput from 'ink-quicksearch-input'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

import useGenerators from './../src/hooks/useGenerators'
import App from './../src/App'
import pkg from './../package.json'

/** Command: bud */
/// Bud
const Bud = () => {
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

  return (
    <>
      <Box flexDirection="row" alignItems="center" marginBottom={0} paddingBottom={0}>
        <Box marginRight={1} marginBottom={0} marginTop={0}>
          <Gradient name="teen">
            <BigText
              text="Bud"
              font="simple3d"
              marginTop={0}
              marginBottom={0}
              paddingBottom={0}
            />
          </Gradient>
        </Box>
        <Box flexDirection="column" marginBottom={0} marginTop={0}>
          <Text bold>
            <Color green>
              ⚡️ {pkg.name} [{pkg.version}]
            </Color>
          </Text>
          <Text uppercase>
            <Color red>⚠</Color> This software is pre-release
          </Text>
          <Text> </Text>
        </Box>
      </Box>
      <Box>
        {buds && !selection && (
          <QuickSearchInput
            label="Select a generator"
            items={buds}
            onSelect={selection => setSelection(selection)}
          />
        )}

        {selection && <App budfile={selection.value} />}
      </Box>
    </>
  )
}

export default Bud
