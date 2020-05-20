const {join, resolve} = require('path')
const fs = require('fs-extra')
const fetch = require('node-fetch')
const execa = require('execa')
const handlebars = require('handlebars')
const prettier = require('prettier')
const globby = require('globby')
const {Observable, from} = require('rxjs')
const {concatMap} = require('rxjs/operators')

const basePrettierConfig = require('./../../prettier.config.js')
const handlebarsHelpers = require('handlebars-helpers')
const helpers = require('./helpers')

/**
 * Bud Core
 */
export const bud = {
  fs,
  fetch,
  execa,
  prettier,
  handlebars,

  /**
   * Initialize
   *
   * @param {string} outDir
   * @param {object} data
   * @param {object} sprout
   * @param {string} templateDir
   * @param {bool}   skipInstall
   */
  init: function ({outDir = './', data = {}, sprout, templateDir}) {
    this.data = data
    this.sprout = sprout
    this.projectDir = outDir
    this.execaOptions = {cwd: this.projectDir}
    this.templateDir = templateDir

    this.registerActions()
    this.registerHelpers()

    return this
  },

  /**
   * Get config.
   *
   * @return {object}
   */
  getConfig: function () {
    return {
      path: `${process.cwd()}/${this.projectDir}/.bud/bud.config.json`,
      data: require(`${process.cwd()}/${this.projectDir}/.bud/bud.config.json`),
    }
  },

  /**
   * Get data.
   *
   * @return {object}
   */
  getData: function () {
    return this.data
  },

  /**
   * Set data.
   *
   * @param  {object} data
   * @return {void}
   */
  setData: function (data) {
    this.data = data
  },

  /**
   * Register actions
   */
  registerActions: function () {
    this.sprout.registerActions &&
      this.sprout.registerActions.forEach(action => {
        this[`${action.handle}`] = action.callback
      })
  },

  /**
   * Register helpers
   */
  registerHelpers: function () {
    // lib helpers
    handlebarsHelpers({handlebars: this.handlebars})

    // plugin registered helpers
    this.sprout.registerHelpers &&
      this.sprout.registerHelpers.length > 0 &&
      this.sprout.registerHelpers.forEach(helper => {
        helpers.push(helper)
      })

    // roots/bud helpers
    helpers(this.getData()).forEach(({helper, fn}) => {
      this.handlebars.registerHelper(helper, fn)
    })
  },

  /**
   * Format
   *
   * @param  {object|string} content
   * @param  {parser} string
   * @return {string}
   */
  format: function (content, parser) {
    return this.prettier.format(typeof content !== 'string' ? JSON.stringify(content) : content, {
      ...basePrettierConfig,
      parser: parser || 'babel',
    })
  },

  /**
   * Actions
   *
   * @return {Observable}
   */
  actions: function () {
    const bud = {...this}

    return new Observable(function (observer) {
      from(bud.sprout.actions)
        .pipe(
          concatMap(function (task) {
            return new Observable(async function (observer) {
              observer.next(task.action)

              return bud[task.action](task, observer, bud)
            })
          }),
        )
        .subscribe({
          next: next => observer.next(next),
          error: error => observer.error(error),
          complete: complete => observer.complete(complete),
        })
    })
  },

  /**
   * Scaffold directories
   *
   * @param  {array} paths
   * @return {Observable}
   */
  scaffold: function ({paths}, observer) {
    observer.next(`Creating directories`)

    from(paths)
      .pipe(
        concatMap(path => {
          return new Observable(async observer => {
            try {
              await this.mkDir({path}, observer)
            } catch (e) {
              observer.error(e)
            }
          })
        }),
      )
      .subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: () => observer.complete(),
      })
  },

  /**
   * Make directory
   *
   * @param  {string}     path
   * @param  {Observable} observer
   * @return {Observable}
   */
  mkDir: async function ({path}, observer) {
    const pathTemplate = this.handlebars.compile(path)
    const dirPath = join(this.projectDir, pathTemplate(this.getData()))

    try {
      await fs.ensureDir(dirPath).then(() => {
        observer.complete()
      })
    } catch (e) {
      observer.error(e)
    }
  },

  /**
   * Get template contents.
   *
   * @param  {string} template
   * @return {array}
   */
  getTemplate: async function (template) {
    const path = join(this.templateDir, template)
    const contents = await fs.readFile(path, 'utf8')

    return {path, contents}
  },

  /**
   * Infer parser
   *
   * @param  {string} file
   * @return {string}
   */
  inferParser: async function (file) {
    const ext = file.split('.')[file.split('.').length - 1]
    const parserMap = {
      js: 'babel',
      jsx: 'babel',
      graphql: 'graphql',
      css: 'css',
      json: 'json',
      md: 'markdown',
      html: 'html',
      htm: 'html',
      ts: 'typescript',
      tsx: 'typescript',
      yml: 'yaml',
      yaml: 'yaml',
      less: 'less',
    }

    return parserMap[`${ext}`] ?? null
  },

  /**
   * Action: template
   *
   * @param  {string} parser
   * @param  {string} path
   * @param  {string} template
   * @return {Observable}
   */
  template: async function ({parser, path, template}, observer) {
    try {
      const {contents} = await this.getTemplate(template)
      const dest = join(
        this.projectDir,
        this.handlebars.compile(path)(this.getData()).replace('.hbs', ''),
      )

      observer.next(`Writing ${dest.split('/')[dest.split('/').length - 1]}`)

      const compiled = this.handlebars.compile(contents)(this.getData())
      const outputContents = parser ? this.format(compiled, parser) : compiled

      fs.outputFile(dest, outputContents).then(() => observer.complete())
    } catch (error) {
      observer.error(error)
    }
  },

  /**
   * Action: template dir
   *
   * @param  {string} parser
   * @param  {string} path
   * @param  {string} templateDir
   * @return {Observable}
   */
  templateGlob: async function ({glob}, observer) {
    try {
      const templates = await globby([resolve(this.templateDir, glob)])

      from(templates)
        .pipe(
          concatMap(template => {
            return new Observable(async observer => {
              try {
                const parser = await this.inferParser(template.replace('.hbs', ''))

                await this.template(
                  {
                    parser,
                    template: template.replace(this.templateDir, ''),
                    path: template.replace(this.templateDir, '').replace('.hbs', ''),
                  },
                  observer,
                )
              } catch (error) {
                observer.error(error)
              }
            })
          }),
        )
        .subscribe({
          next: next => observer.next(next),
          error: error => observer.error(error),
          complete: () => observer.complete(),
        })
    } catch (error) {
      observer.error(error)
    }
  },

  /**
   * Action: Modules
   *
   * @param  {array} pkgs
   * @param  {bool}  dev
   * @return {Observable}
   */
  addDependencies: async function ({repo, pkgs, dev}, observer) {
    let installation

    observer.next(`Installing packages from ${repo}...`)

    if (repo !== 'npm' && repo !== 'packagist') {
      observer.error(`Incorrect package repo specified.`)
    }

    if (repo == 'npm') {
      installation = this.execa.command(
        `yarn add ${dev ? `-D` : ``} ${pkgs.join(' ')}`,
        this.execaOptions,
      )
    }

    if (repo == 'packagist') {
      installation = this.execa.command(
        `composer require ${pkgs.join(' ')} ${dev ? `--development` : ``}`,
        this.execaOptions,
      )
    }

    installation.stdout.on('data', status => {
      observer.next(status)
    })

    installation.then(() => observer.complete())
  },

  /**
   * Action: Install from package files
   *
   * @param  {string} repo
   * @return {Observable}
   */
  install: async function ({repo}, observer) {
    let installation

    observer.next(`Installing packages from ${repo}...`)

    if (repo !== 'npm' && repo !== 'packagist') {
      observer.error(`Incorrect package repo specified.`)
    }

    if (repo == 'npm') {
      installation = this.execa.command(`yarn`, this.execaOptions)
    }

    if (repo == 'packagist') {
      installation = this.execa.command(`composer install`, this.execaOptions)
    }

    installation.stdout.on('data', status => {
      observer.next(status)
    })

    installation.then(() => observer.complete())
  },

  /**
   * Expose project JSON
   */
  json: async function ({file, merge}, observer) {
    const json = require(`${this.projectDir}/${file}`)
    observer.next(`Writing JSON to ${file}`)

    try {
      const output = merge(json)

      await fs.outputFile(`${this.projectDir}/${file}`, this.format(output, 'json'))

      observer.complete()
    } catch (err) {
      observer.error(`There was a problem writing to ${file}`)
    }
  },
}
