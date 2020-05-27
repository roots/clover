import handlebars from 'handlebars'
import helpers from './helpers'
import handlebarsHelpers from 'handlebars-helpers'

/**
 * Compiler.
 *
 * @param {handlebars} handlebars
 */
const makeCompiler = ({sprout, data}) => {
  handlebarsHelpers({handlebars})

  sprout.registerHelpers &&
    sprout.registerHelpers.forEach(helper => {
      helpers.push(helper)
    })

  helpers(data).forEach(({helper, fn}) => {
    handlebars.registerHelper(helper, fn)
  })

  return {
    compiler: handlebars,

    /**
     * Make template.
     *
     * @param {string} path
     */
    make: function (path) {
      return this.compiler.compile(path)
    },
  }
}

export default makeCompiler
