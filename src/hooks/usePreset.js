import {existsSync} from 'fs'
import {join, dirname} from 'path'
import {useEffect, useState} from 'react'
import resolvePkg from 'resolve-pkg'
import globby from 'globby'

/**
 * Make a preset
 */
const make = file => (existsSync(file) ? require(file) : null)
const makeGeneratorTemplateDir = generatorFile =>
  join(dirname(generatorFile), 'templates')

/**
 * Use Preset
 *
 * Returns a consolidated generator from a preset file path.
 */
const usePreset = presetFile => {
  const preset = make(presetFile)
  const [generator, setGenerator] = useState({
    prompts: [],
    tasks: [],
  })

  const [steps, setSteps] = useState(0)
  useEffect(() => {
    ;(async () => {
      const step = preset.generators[steps]
      if (!step) return

      const pkg = await resolvePkg(step.pkg)

      const results = await globby([
        `${pkg}/generators/${step.name}/*.bud.js`,
      ])

      const current = make(results[0])
      const templateDir = makeGeneratorTemplateDir(results[0])

      if (current) {
        current.tasks = current.tasks.map(task => ({
          ...task,
          templateDir,
        }))
      }

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

      setSteps(1 + steps)
    })()
  }, [preset, steps])

  const [complete, setComplete] = useState(false)
  useEffect(() => {
    steps &&
      steps >= preset.generators.length &&
      (() => {
        setComplete(true)
      })()
  }, [steps])

  /**
   * Return aggregated generators
   */
  return complete ? generator : false
}

export default usePreset
