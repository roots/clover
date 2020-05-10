import React from 'react'
import {Box, Color, Text} from 'ink'
import BudCLI from './../src/components/BudCLI'

/** Command: bud */
/// Bud information
const Bud = () => (
  <BudCLI label={'Bud: Modern WordPress Scaffolding'} inert={true}>
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>
          To get started run <Color green>npx @roots/bud init {`{project-dir}`}</Color>
        </Text>
      </Box>
    </Box>
  </BudCLI>
)

export default Bud
