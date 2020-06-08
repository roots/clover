import {ensureFile} from 'fs-extra'
import {join} from 'path'

/**
 * Action: Touch
 *
 * @prop   {object}   task
 * @prop   {object}   config
 * @prop   {object}   compiler
 * @prop   {object}   data
 * @prop   {Observer} observer
 */
const touch = async ({task, config, compiler, data, observer}) => {
  const path = join(config.projectDir, compiler.make(task.path)(data))

  try {
    await ensureFile(path).then(() => {
      observer.next()
    })

    observer.complete()
  } catch (error) {
    observer.error()
  }
}

export default touch
