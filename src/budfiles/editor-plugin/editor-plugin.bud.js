/**
 * bud generate editor-plugin
 */

// prettier-ignore
module.exports = {
  name: 'editor-plugin',
  description: 'Generate a new editor JS plugin',
  prompts: [
    {
      type: 'input',
      name: 'pluginName',
      message: 'Name',
      initial: 'acme-plugin',
      required: true,
    },
  ],
  tasks: [
    {
      task: 'compile',
      src: 'plugin.js.hbs',
      dest: 'src/plugins/{{lowercase (dashcase pluginName)}}/plugin.js',
    },
  ],
}
