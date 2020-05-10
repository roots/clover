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
    {
      type: 'input',
      name: 'proxy',
      message: 'Proxy hostname',
      initial: 'sage-app.test',
    },
    {
      type: 'select',
      name: 'protocol',
      message: 'What protocol are you using in development?',
      initial: 'https',
      choices: ['https', 'http'],
    },
    {
      type: 'input',
      name: 'port',
      message: 'Live reload port',
      initial: 3000,
    },
  ],
  registerActions: [
    {
      handle: 'env',
      callback: async (task, observer, bud) => {
        observer.next('Gathering WP info.')

        const config = bud.getConfig()
        const wpPath = require('path').resolve(process.cwd(), '../../')

        let isWordPress
        isWordPress = await bud.fs.exists(`${wpPath}/index.php`)
        isWordPress = await bud.fs.exists(`${wpPath}/wp-config.php`)

        !isWordPress
          ? observer.next('wpPath not detected.. moving on.')
          : (async () => {
              /** Copy index.php */
              try {
                await bud.fs.copyFile(
                  `${wpPath}/index.php`,
                  `${wpPath}/index.bak`,
                )
              } catch {
                observer.error('Problem copying index.php.')
              }

              /** Write tmp replacement for index.php */
              try {
                const {contents} = await bud.getTemplate('index.php.hbs')
                await bud.fs.writeFile(`${wpPath}/index.php`, contents)
              } catch {
                observer.error('Problem writing temporary index.php.')
              }

              /** Request it */
              try {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
                await bud
                  .fetch(`${bud.data.protocol}://${bud.data.proxy}`)
                  .then(res => res.json())
                  .then(async function (json) {
                    if (json.bud == true && json.path) {
                      config.data.dev.path = json.path

                      await bud.fs.writeFile(
                        config.path,
                        bud.format(config.data, 'json'),
                      )
                    }
                  })
              } catch {
                observer.error('Problem writing to bud.config.js')
              }

              /** Restore original */
              try {
                await bud.fs.copyFile(
                  `${wpPath}/index.bak`,
                  `${wpPath}/index.php`,
                )
              } catch {
                observer.error('Problem finalizing bud.config.js wp checks.')
              }

              /** Delete backup */
              try {
                await bud.fs.remove(`${wp.Path}/index.bak`)
              } catch {
                observer.error('Problem removing temporary index.php backup')
              }

              observer.next(`Config file updated.`)
            })()

        observer.complete()
      },
    },
  ],
  actions: [
    {
      action: 'scaffold',
      paths: [
        '.bud',
        '.bud/budfiles',
        '.bud/budfiles/example',
        '.bud/budfiles/example/templates',
      ],
    },
    {
      action: 'template',
      template: 'bud.config.json.hbs',
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
      template: 'budfiles/example/example.bud.js.hbs',
      path: '.bud/budfiles/example/example.bud.js',
    },
    {
      action: 'template',
      template: 'budfiles/example/templates/Component.js.hbs',
      path: '.bud/budfiles/example/templates/Component.js.hbs',
    },
    {
      action: 'install',
      repo: 'npm',
    },
    {
      action: 'env',
    },
  ],
}
