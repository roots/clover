import React from 'react'
import {Box} from 'ink'

import useGenerators from './../../src/hooks/useGenerators'
import App from './../../src/components/App'

/** Command: bud list */
/// List available budfiles
const List = () => {
  const {core, plugin, project, complete} = useGenerators()
  const buds = [...project, ...plugin, ...core]

  return (
    <App isLoading={!complete}>
      {buds.map((bud, id) => (
        <Box
          key={id}
          flexDirection="column"
          flexGrow={1}
          justifyContent="flex-start">
          <Box>◦ {bud.name}</Box>
        </Box>
      ))}
    </App>
  )
}

export default List
