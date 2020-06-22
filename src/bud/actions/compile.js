import {join} from 'path'
import {outputFile, readFile} from 'fs-extra'

/**
 * Action: template
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   data
 * @param  {object}   config
 * @param  {object}   util
 * @param  {object}   prettier
 * @param  {object}   compiler
 * @return {void}
 */
const compile = async ({
  task,
  observer,
  data,
  prettier,
  compiler,
  config,
}) => {
  observer.next(`Write file: ${task.src}`)

  const src = await readFile(join(task.templateDir, task.src), 'utf8')

  const dest = compiler.make(task.dest)(data)
  const template = compiler.make(src)(data)

  observer.next(`Writing file ${dest}`)

  await outputFile(
    join(config.projectDir, dest),
    task.parser ? prettier.format(template, task.parser) : template,
  )

  observer.complete()
}

export default compile
