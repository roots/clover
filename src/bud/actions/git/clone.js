/**
 * Action: git clone
 *
 * @prop {object}   task
 * @prop {Observer} observer
 * @prop {object}   util
 */
const clone = async ({observer, logger, task, util}) => {
  logger.next({emitter: 'clone', task})
  observer.next(`Cloning ${task.repo} to ${task.dest}`)

  const clone = util.command(`git clone git@github.com:${task.repo} ${task.dest}`)

  clone.stdout.on('data', () =>
    observer.next(observer.next(`Cloning ${task.repo} to ${task.dest}}`)),
  )

  clone.then(() => observer.complete())
}

export default clone
