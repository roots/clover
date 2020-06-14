import React from 'react'
import {Box} from 'ink'
import Divider from 'ink-divider'

import useGenerators from './../../src/hooks/useGenerators'
import Banner from './../../src/components/Banner'

/** Command: bud list */
/// List available budfiles
const List = () => {
  const {core, plugin, project} = useGenerators()
  const buds = [...project, ...plugin, ...core]

  return (
    <Box width="103" flexDirection="column" justifyContent="flex-start" padding={1}>
      <Banner label={'List budfiles'} />
      <Divider padding={0} width={100} />
      {buds.map((bud, id) => (
        <Box key={id} flexDirection="column" flexGrow={1} justifyContent="flex-start">
          <Box>{bud.name}</Box>
        </Box>
      ))}
    </Box>
  )
}

export default List
