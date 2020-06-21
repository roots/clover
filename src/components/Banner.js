import React from 'react'
import {Box, Text, Color} from 'ink'
import Link from 'ink-link'

const Banner = () => (
  <Box flexDirection="column" marginBottom={1}>
    <Text>
      <Link url="https://github.com/roots/bud" fallback={false}>
        <Color green>⚡️ @roots/bud</Color>
      </Link>
    </Text>
  </Box>
)

export default Banner
