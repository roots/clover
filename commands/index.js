import React from 'react'
import {Box, Color, Text} from 'ink'
import App from './../src/components/App'

/** Command: bud */
/// Bud information
const Bud = () => (
  <App label={'Bud: Modern WordPress Scaffolding'} inert={true}>
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          To get started run <Color green>npx @roots/bud init {`{project-dir}`}</Color>
        </Text>
      </Box>
    </Box>
  </App>
)

export default Bud
