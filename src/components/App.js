import React from 'react'
import {Box} from 'ink'

import Banner from './Banner'
import Loading from './Loading'

/**
 * Bud application.
 *
 * @prop {object} children
 */
const App = ({isLoading, loadingMessage, children}) => (
  <Box
    flexDirection="column"
    justifyContent="flex-start"
    paddingTop={1}
    paddingRight={1}
    paddingBottom={0}
    paddingLeft={1}>
    <Banner />

    {isLoading && (
      <Loading
        spinnerColor="green"
        message={loadingMessage ?? 'Loading'}
      />
    )}
    {children}
  </Box>
)

export default App
