module.exports = {
  name: 'bud',
  description: 'Initialize a new project',
  prompts: [
    {
      type: 'input',
      name: 'namespace',
      message: 'Project namespace',
      initial: 'acme-co',
      required: true,
    },
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      initial: 'acme-project',
      required: true,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description',
      initial: 'Anvil drop-shipping application',
    },
    {
      type: 'input',
      name: 'website',
      message: 'Project website',
      initial: 'https://acme.co',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name',
      initial: 'Wiley C.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Author email',
      initial: 'wiley@gmail.com',
    },
  ],
  actions: [
    {
      action: 'scaffold',
      paths: ['.bud', '.bud/budfiles', '.bud/budfiles/example', '.bud/budfiles/example/templates'],
    },
    {
      action: 'template',
      template: '.bud/bud.config.json.hbs',
      path: '.bud/bud.config.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: 'package.json.hbs',
      path: 'package.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: '.bud/budfiles/example/example.bud.js.hbs',
      path: '.bud/budfiles/example/example.bud.js',
    },
    {
      action: 'template',
      template: '.bud/budfiles/example/templates/Component.js.hbs',
      path: '.bud/budfiles/example/templates/Component.js.hbs',
    },
    {
      action: 'install',
      repo: 'npm',
    },
  ],
}
