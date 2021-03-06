import {join} from 'path'
import fs from 'fs-extra'

/**
 * Make directory
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   config
 * @param  {object}   data
 * @param  {object}   compiler
 *
 * @return {void}
 */
const ensureDir = async ({
  task,
  observer,
  config,
  data,
  compiler,
}) => {
  const path = join(config.projectDir, compiler.make(task.path)(data))

  observer.next(`Writing directory ${path}`)
  await fs.ensureDir(path)

  observer.complete()
}

export default ensureDir
