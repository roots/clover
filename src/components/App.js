import React from 'react'
import {Box} from 'ink'

import Tasks from './Tasks'

/**
 * Bud application
 *
 * @prop {string} status
 * @prop {array}  sprout
 * @prop {bool} complete
 */
const App = ({status, sprout, complete}) => (
  <Box
    width="103"
    flexDirection="column"
    justifyContent="flex-start"
    paddingTop={1}
    paddingBottom={1}>
    <Tasks status={status} sprout={sprout} complete={complete} />
  </Box>
)

export default App
