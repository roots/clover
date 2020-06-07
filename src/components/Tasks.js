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
        <Color green>🏁 generator complete.</Color>
      </Text>
    )
  }

  if (!status) {
    return []
  }

  return !complete ? (
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
  ) : (
    []
  )
}

export default Tasks
