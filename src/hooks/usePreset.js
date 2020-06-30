import {existsSync} from 'fs'
import {join, dirname} from 'path'
import {useEffect, useState} from 'react'
import resolvePkg from 'resolve-pkg'
import globby from 'globby'

/**
 * Helpers: resolve generators.
 */
const generatorObj = file => existsSync(file) ? require(file) : null
const getTemplateDir = generatorFile => join(dirname(generatorFile), 'templates')

/**
 * Use Preset
 *
 * Returns a single generator with prompts and tasks merged
 * from all the generators specified in the preset.
 *
 * @param  {string} presetFile
 * @return {object}
 */
const usePreset = presetFile => {
  const preset = generatorObj(presetFile)

  /**
   * This is the singular generator where the hook will
   * place everything specified in the preset.
   */
  const [generator, setGenerator] = useState({
    prompts: [],
    tasks: [],
  })

  /**
   * This seems kind of hackish but it seems to be consistently working..
   *
   * The order of the generators specified in the preset must be preserved.
   * Steps state is incremented once a generator has been fully processed.
   *
   * This allows the application to remain non-blocking while also preserving
   * the order indicated by the preset.
   */
  const [steps, setSteps] = useState(0)
  useEffect(() => {
    /**
     * If no generator is available then bail early. This effect loops
     * endlessly so it's best to do it straight away.
     */
    const step = preset.generators[steps]
    if (!step) return

    ;(async () => {
      /** Resolve the pkg dir */
      const pkg = await resolvePkg(step.pkg)

      /** Resolve the actual generator obj. */
      const results = await globby([
        `${pkg}/generators/${step.name}/*.bud.js`,
      ])
      const current = generatorObj(results[0])
      const templateDir = getTemplateDir(results[0])

      /**
       * Map the current generators template dir path
       * onto each task in the generator. This simplifies things
       * when Bud is processing each action.
       */
      if (current) {
        current.tasks = current.tasks.map(task => ({
          ...task,
          templateDir,
        }))
      }

      /**
       * Spread assign the current generator values with the
       * cumulative generator to be returned from the hook.
       */
      setGenerator({
        prompts: [
          ...(generator?.prompts ?? []),
          ...(current?.prompts ?? []),
        ],
        tasks: [
          ...(generator?.tasks ?? []),
          ...(current?.tasks ?? []),
        ],
      })

      /**
       * Lastly, increment the index. This will cause the effect to be
       * called again on React's next render.
       */
      setSteps(1 + steps)
    })()
  }, [preset, steps])

  /**
   * When the steps counter exceeds the length of
   * the total number of generators in the preset, its's safe
   * to conclude that we have processed all the generators.
   */
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    steps &&
      steps >= preset.generators.length && setComplete(true)
  }, [steps])

  /**
   * Return aggregated generators once they have finished processing.
   */
  return complete ? generator : false
}

export default usePreset
