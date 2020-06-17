import path from 'path'
import {useState, useEffect} from 'react'
import findPlugins from 'find-plugins'
import globby from 'globby'

const cwd = process.cwd()

/**
 * Util: Format matched presets
 *
 * @param {array} matches
 * @return {array}
 */
const fromMatches = matches =>
  matches.map(generator => ({
    name: path.basename(generator).replace('.bud.js', ''),
    path: generator,
  }))

/**
 * Presets sourced from project
 */
const useProjectPresets = () => {
  const [presets, setPresets] = useState([])
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    ;(async () => {
      setChecked(false)

      const matches = await globby([
        `${cwd}/.bud/budfiles/**/*-preset.bud.js`,
      ])

      setPresets(fromMatches(matches))
      setChecked(true)
    })()
  }, [])

  return [presets, checked]
}

/**
 * Presets sourced from node_modules
 *
 * @param {string} keyword package.json keywords match
 */
const useModulePresets = keyword => {
  const [presets, setPresets] = useState([])
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    keyword &&
      (async () => {
        setChecked(false)

        const packages = findPlugins({keyword}).map(
          plugin => `${plugin.dir}/**/*-preset.bud.js`,
        )

        const matches = await globby(packages)

        setPresets(fromMatches(matches))
        setChecked(true)
      })()
  }, [keyword])

  return [presets, checked]
}

/**
 * useGenerators hook
 */
const useGenerators = () => {
  const [project, checkedProject] = useProjectPresets()
  const [core, checkedCore] = useModulePresets('bud-core-presets')
  const [plugin, checkedPlugin] = useModulePresets('bud-preset')

  return {
    project,
    plugin,
    core,
    status: {
      project: checkedProject,
      plugin: checkedPlugin,
      core: checkedCore,
    },
    complete: checkedCore && checkedProject && checkedPlugin,
  }
}

export default useGenerators
export {useProjectPresets, useModulePresets}
