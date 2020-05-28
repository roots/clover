import {outputFile} from 'fs-extra'

/**
 * Action: Manipulate project JSON
 *
 * @prop {object}   task
 * @prop {Observer} observer
 * @prop {Prettier} prettier
 */
const json = async function ({task, observer, prettier, config}) {
  const json = require(`${config.projectDir}/${task.file}`)
  observer.next(`Writing JSON to ${task.file}`)

  try {
    const output = task.merge(json)
    await outputFile(
      `${config.projectDir}/${task.file}`,
      prettier.format(output, 'json'),
    )

    observer.complete()
  } catch (err) {
    console.log(`There was a problem writing to ${task.file}`)
  }
}

export default json
