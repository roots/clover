import React from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

import useConfig from './hooks/useConfig'
import useData from './hooks/useData'
import useSprout from './hooks/useSprout'
import useSubscription from './hooks/useSubscription'

import Banner from './components/Banner'
import Tasks from './components/Tasks'

/** Suppress unhandled rejections */
process.on('unhandledRejection', () => null)

/**
 * Bud application
 *
 * @prop {string} budfile
 * @prop {string} output
 */
const App = ({budfile, output}) => {
  const {config} = useConfig(process.cwd())
  const {sprout} = useSprout(budfile)
  const {data} = useData(sprout)
  const {status, complete} = useSubscription({
    config,
    data,
    sprout,
    projectDir: output ? output : process.cwd(),
  })

  return (
    <Box
      width="103"
      flexDirection="column"
      justifyContent="flex-start"
      paddingTop={1}
      paddingBottom={1}>
      <Banner label={sprout.description || 'Bud: scaffolding utility'} />
      <Tasks status={status} sprout={sprout} complete={complete} />
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
