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
const copy = async ({task, observer, logger, config}) => {
  const src = join(config.templateDir, task.src)
  const dest = join(config.projectDir, task.dest)

<<<<<<< HEAD
<<<<<<< HEAD
  logger.info({emitter: 'copy', task})
=======
>>>>>>> [wip] fix css enqueues. update plugin generator
=======
  logger.info({emitter: 'copy', task})
>>>>>>> add bud.log (pino)
  observer.next(`Copying file`)
  await fsCopy(src, dest)

  observer.complete()
}

export default copy
