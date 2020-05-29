/**
 * Action: Add dependencies
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   util
 *
 * @return {void}
 */
const addDependencies = async ({task, logger, observer, util}) => {
  let installation

  observer.next(`Installing packages`)

  if (task.repo !== 'npm' && task.repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (task.repo == 'npm') {
    logger.info({emitter: 'addDependencies', task})
    installation = util.command(
      `yarn add ${task.dev ? `-D` : ``} ${task.pkgs.join(' ')}`,
    )
  }

  if (task.repo == 'packagist') {
    logger.info({emitter: 'addDependencies', task})
    installation = util.command(
      `composer require ${task.pkgs.join(' ')} ${
        task.dev ? `--development` : ``
      }`,
    )
  }

  installation.stdout.on('data', status => {
    observer.next(status)
  })

  installation.then(() => observer.complete())
}

export default addDependencies
