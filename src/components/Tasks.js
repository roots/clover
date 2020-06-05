import React, {useEffect} from 'react'
import {Color, Text, useStdout} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Tasks
 *
 * @prop {object} status
 * @prop {bool}   complete
 */
const Tasks = ({data, status, complete}) => {
  const {stdout} = useStdout()
  useEffect(() => {
    data && stdout.write('\x1B[2J\x1B[0f')
  }, [data])

  if (complete) {
    return <Color green>⚡️ All set.</Color>
  }

  if (status) {
    return (
      <Text>
        <Color green>
          <Spinner type="dots" />
        </Color>
        {` ${status}`}
      </Text>
    )
  }

  return []
}

export default Tasks
