/**
 * Commmand
 *
 */
module.exports = {
  name: 'bud-command',
  description: 'A new bud command',
  default: {
    commandName: 'CommandName',
  },
  prompts: [
    {
      type: 'input',
      name: 'commandName',
      message: 'CommandName',
      initial: 'BudCommand',
      required: true,
    },
  ],
  tasks: [
    {
      task: 'compile',
      src: 'Command.js.hbs',
      dest: 'commands/{{commandName}}.js',
    },
  ],
}
