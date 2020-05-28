/**
 * Action: Install from package files
 *
 * @prop   {object}   task
 * @prop   {Observer} observer
 * @prop   {object}   util
 *
 * @return {Observable}
 */
const install = async ({task, observer, util}) => {
  let installation

  observer.next(`Installing packages from ${task.repo}...`)

  if (task.repo !== 'npm' && task.repo !== 'packagist') {
    observer.error(`Incorrect package repo specified.`)
  }

  if (task.repo == 'npm') {
    installation = util.command(`yarn`)
  }

  if (task.repo == 'packagist') {
    installation = util.command(`composer install`)
  }

  installation.stdout.on('data', status => {
    observer.next(status)
  })
}

export default install
