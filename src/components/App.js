import React, {useLayoutEffect} from 'react'
import {Box, useStdout} from 'ink'
import PropTypes from 'prop-types'

import Banner from './Banner'
import Tasks from './Tasks'

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
  const {status, complete} = useSubscription({
    config,
    data,
    sprout,
    logging,
    projectDir: output ? output : process.cwd(),
  })

  const {stdout} = useStdout()
  useLayoutEffect(() => {
    sprout.prompts && data && !complete && stdout.write('\x1B[2J\x1B[0f')
  }, [sprout, data])

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
