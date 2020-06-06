import React from 'react'
import {Box, Color, Text} from 'ink'

import Banner from './../src/components/Banner'

/** Command: bud */
/// Bud information
const Bud = () => (
  <Box flexDirection="column" justifyContent="flex-start" padding={1}>
    <Banner label={'Bud'} />
    <Text>
      To get started run <Color green>npx @roots/bud init {`{project-dir}`}</Color>
    </Text>
  </Box>
)

export default Bud
