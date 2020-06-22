import React from 'react'
import {Box, Color, Text} from 'ink'
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
    return (
      <Text>
        <Color green>🏁{'  '}Done</Color>
      </Text>
    )
  }

  if (!status || complete) {
    return []
  }

  return (
    <Box>
      {status && (
        <Text>
          <Color green>
            <Spinner />
          </Color>{' '}
          {status.toString()}
        </Text>
      )}
    </Box>
  )
}

export default Tasks
