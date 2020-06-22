import {join} from 'path'
import {copy as fsCopy} from 'fs-extra'

/**
 * Action: copy
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   config
 *
 * @return {void}
 */
const copy = async ({task, config, observer}) => {
  const src = join(task.templateDir, task.src)
  const dest = join(config.projectDir, task.dest)

  observer.next(`Copying file`)
  await fsCopy(src, dest)

  observer.complete()
}

export default copy
