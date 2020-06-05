import React from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

import Banner from './Banner'
import Tasks from './Tasks'
import Error from './Error'

import useConfig from './hooks/useConfig'
import useData from './hooks/useData'
import useSprout from './hooks/useSprout'
import useSubscription from './hooks/useSubscription'

/**
 * Bud application
 *
 * @prop {string} budfile
 * @prop {string} output
 * @prop {bool}   logging
 */
const App = ({budfile, output, logging}) => {
  const {config} = useConfig(process.cwd())
  const {sprout} = useSprout(budfile)
  const {data} = useData(sprout)

  const {status, error, complete} = useSubscription({
    config,
    data,
    sprout,
    logging,
    projectDir: output ? output : process.cwd(),
  })

  return (
    <Box flexDirection="column" justifyContent="flex-start" padding={1}>
      <Banner label={'Bud'} />
      <Tasks status={status} data={data} complete={complete} />
      {error && <Error message={error} />}
    </Box>
  )
}

App.propTypes = {
  budfile: PropTypes.string,
}

App.propDefaults = {
  output: null,
}

export default App
