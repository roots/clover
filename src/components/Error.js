import React from 'react'
import {Box, Text} from 'ink'

/**
 * Error
 */
const Error = ({message}) => (
  <Box>
    <Text color="red">💥 {JSON.stringify(message)}</Text>
  </Box>
)

export default Error
