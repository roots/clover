import React, {useEffect} from 'react'
import {Box} from 'ink'
import PropTypes from 'prop-types'

import useConfig from './hooks/useConfig'
import useData from './hooks/useData'
import useSprout from './hooks/useSprout'
import useSubscription from './hooks/useSubscription'

import Tasks from './components/Tasks'

/** Suppress unhandled rejections */
process.on('unhandledRejection', () => null)

/**
 * Bud application
 *
 * @prop {string} budfile
 * @prop {array}  queue
 * @prop {string} output
 */
const App = ({budfile, queue, output}) => {
  const {config} = useConfig(process.cwd())
  const {sprout} = useSprout(budfile)
  const {data} = useData(sprout)
  const {status, complete} = useSubscription({
    config,
    data,
    sprout,
    projectDir: output ? output : process.cwd(),
  })

  useEffect(() => {
    console.log(queue)
  }, [queue])

  return (
    <Box
      width="103"
      flexDirection="column"
      justifyContent="flex-start"
      paddingTop={1}
      paddingBottom={1}>
      <Tasks status={status} sprout={sprout} complete={complete} />
    </Box>
  )
}

App.propTypes = {
  budfile: PropTypes.string,
  queue: PropTypes.array,
}

App.propDefaults = {
  output: null,
}

export default App
