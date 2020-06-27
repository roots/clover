import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Tasks
 *
 * @prop {object} status
 * @prop {object} sprout
 * @prop {bool}   complete
 */
const Tasks = ({status, complete}) => {
  if (complete) {
    return <Text green>🏁{'  '}Done</Text>
  }

  if (!status || complete) {
    return []
  }

  return (
    <Box>
      {status && (
        <Text green>
          <Spinner /> {status}
        </Text>
      )}
    </Box>
  )
}

export default Tasks
