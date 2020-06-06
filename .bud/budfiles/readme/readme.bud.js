const package = require('../../../package.json')
const commands = require('./helpers/commands')
const listKeys = require('./helpers/listKeys')

module.exports = {
  name: 'readme',
  description: 'Generate the repo readme',
  data: {
    commands,
    package: package.name,
    version: package.version,
    repo: package.name.replace('@', ''),
    license: package.licenses[0].type,
    node: package.engines.node,
    dependencies: listKeys(package.dependencies),
    devDependencies: listKeys(package.devDependencies),
    sponsors: [
      {name: 'Kinsta', svg: 'https://cdn.roots.io/app/uploads/kinsta.svg', href: "https://kinsta.com/?kaid=OFDHAJIXUDIV"},
      {name: 'KM Digital', svg: 'https://cdn.roots.io/app/uploads/km-digital.svg', href: 'https://k-m.com/'},
      {name: 'Carrot', svg: 'https://cdn.roots.io/app/uploads/carrot.svg', href: 'https://carrot.com/'},
    ],
  },
  tasks: [
    {
      task: 'compile',
      src: 'readme.md.hbs',
      dest: 'README.md',
      parser: 'markdown',
    },
  ],
}
