import React from 'react'

import useConfig from './../hooks/useConfig'
import useData from './../hooks/useData'
import useGenerator from './../hooks/useGenerator'
import useSubscription from './../hooks/useSubscription'

import Tasks from './../components/Tasks'

const cwd = process.cwd()

/**
 * Middleware: Generator
 *
 * @prop {string} generatorFile
 * @prop {string} output
 */
const GeneratorMiddleware = ({generatorFile, output}) => {
  const {config} = useConfig(cwd)
  const {generator} = useGenerator(generatorFile)
  const {data} = useData(generator)
  const {status, complete} = useSubscription({
    config,
    data,
    generator,
    projectDir: output,
  })

  return <Tasks status={status} complete={complete} />
}

export default GeneratorMiddleware
