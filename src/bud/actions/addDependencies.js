/**
 * Action: Add dependencies
 *
 * @param  {object}   task
 * @param  {Observer} observer
 * @param  {object}   util
 *
 * @return {void}
 */
const addDependencies = async ({task, observer, util}) => {
  const cmdStr = () => {
    switch (task.repo) {
      case 'npm':
        return `yarn add ${task.dev ? `-D` : ``} ${task.pkgs.join(
          ' ',
        )}`
      case 'packagist':
        return `composer require ${task.pkgs.join(' ')} ${
          task.dev ? `--development` : ``
        }`
      default:
        observer.error(`Incorrect package repo specified.`)
    }
  }

  observer.next(`Installating packages from ${task.repo}`)
  const {command, exitCode, stderr} = await util.command(cmdStr())
  command && observer.next(command)
  exitCode == 0 ? observer.complete() : observer.error(stderr)
}

export default addDependencies
