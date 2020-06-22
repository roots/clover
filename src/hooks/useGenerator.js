import {join, dirname} from 'path'
import {existsSync} from 'fs'

const makeGenerator = generatorFile =>
  existsSync(generatorFile) ? require(generatorFile) : null

const makeGeneratorTemplateDir = generatorFile =>
  join(dirname(generatorFile), 'templates')

/**
 * Use Generator
 */
const useGenerator = generatorFile => {
  const generator = {
    ...makeGenerator(generatorFile),
    templateDir: makeGeneratorTemplateDir(generatorFile),
  }

  // Attach the templateDir ref. to each generator task.
  generator.tasks = generator.tasks.map(task => ({
    ...task,
    templateDir: generator.templateDir,
  }))

  return {generator}
}

export default useGenerator
export {makeGenerator, makeGeneratorTemplateDir}
