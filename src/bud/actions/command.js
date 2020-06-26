/**
 * Action: Arbitrary command
 *
 * @prop   {object}   task
 * @prop   {Observer} observer
 * @prop   {object}   util
 *
 * @return {Observable}
 */
const command = async ({task, observer, util}) => {
  task.msg && observer.next(`${task.msg}`)

  const {exitCode, stderr} = await util.command(task.run)
  exitCode == 0 ? observer.complete() : observer.error(stderr)
}

export default command
