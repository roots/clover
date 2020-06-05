import clone from './clone'

/**
 * Action: Github
 *
 * @prop   {object}   task
 * @prop   {Observer} observer
 * @prop   {object}   util
 */
const git = async ({task, observer, logger, ...props}) => {
  logger.info({emitter: 'git', task})

  if (task.action == 'clone') {
    clone({task, observer, ...props})
  }
}

export default git
