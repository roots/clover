import {join, dirname} from 'path'
import {existsSync} from 'fs'

const makeSprout = budfile => (existsSync(budfile) ? require(budfile) : null)
const makeTemplateDir = budfile => join(dirname(budfile), 'templates')

/**
 * Use Sprout
 */
const useSprout = budfile => ({
  sprout: {
    ...makeSprout(budfile),
    templateDir: makeTemplateDir(budfile),
  },
})

export default useSprout
