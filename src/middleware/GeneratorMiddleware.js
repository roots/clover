import React from 'react'

import useConfig from './../hooks/useConfig'
import useData from './../hooks/useData'
import useSprout from './../hooks/useSprout'
import useSubscription from './../hooks/useSubscription'

import Tasks from './../components/Tasks'

/**
 * Middleware: Generator
 *
 * @prop {string} budfile
 * @prop {array}  queue
 * @prop {string} output
 */
const GeneratorMiddleware = ({budfile, output}) => {
  const {config} = useConfig(process.cwd())
  const {sprout} = useSprout(budfile)
  const {data} = useData(sprout)
  const {status, complete} = useSubscription({
    config,
    data,
    sprout,
    projectDir: output ? output : process.cwd(),
  })

  return <Tasks status={status} sprout={sprout} complete={complete} />
}

export default GeneratorMiddleware
