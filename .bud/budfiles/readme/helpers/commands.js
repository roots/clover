const globby = require('globby')
const fs = require('fs')
const path = require('path')
const commandsDir = path.resolve(__dirname, '../../../../commands')

/**
 * Generate a table of Bud commands from the project tree.
 *
 * @return {string}
 */
const commands = () => {
  const list = globby.sync(commandsDir, {
    expandDirectories: {
      extensions: ['js']
    },
  }).map(file => {
    const command = fs.readFileSync(file, 'utf-8')

    return {
      command: [...command.matchAll(/\/\*\* Command: (.*) \*\/\n/)][0][1],
      description: [...command.matchAll(/\/\/\/ (.*)\n/)][0][1],
    }
  })

  return list.reduce(
    (acc, sig, index) =>
      index > 0
        ? `${acc}\n | ${sig.command} | ${sig.description} |`
        : `| ${sig.command} | ${sig.description} |`,
    list[0],
  )
}

module.exports = commands()
