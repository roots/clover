import React from 'react'
import {Box, Color, Text} from 'ink'

import pkg from './../../package.json'

const Footer = ({label, width}) => (
  <Box
    width={width}
    flexDirection="row"
    justifyContent="space-between"
    marginTop={1}
    marginBottom={0}
    paddingBottom={0}
    paddingTop={0}>
    <Box>{label ?? '    '}</Box>

    <Box>
      <Text bold>
        <Color green>
          ⚡️ {pkg.name} [{pkg.version}]
        </Color>
      </Text>
    </Box>
  </Box>
)

export default Footer
