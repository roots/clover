import path from 'path'
import {useState, useEffect} from 'react'
import findPlugins from 'find-plugins'
import globby from 'globby'

const cwd = process.cwd()

/**
 * Process globby matches into expected object
 */
const fromMatches = matches =>
  matches.map(generator => ({
    name: path.basename(generator).replace('.preset.bud.js', ''),
    path: generator,
  }))

/**
 * Presets sourced from node_modules
 *
 * @param {string} keyword package.json keywords match
 */
const useModulePresets = keyword => {
  const [presets, setPresets] = useState([])
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    ;(async () => {
      setChecked(false)

      const packages = findPlugins({
        dir: path.resolve(path.join(cwd, 'node_modules')),
        scanAllDirs: true,
        keyword,
      }).map(pkg =>
        path.join(
          path.join(pkg.dir, 'presets'),
          '/**/*.preset.bud.js',
        ),
      )

      const matches = await globby(packages)

      setPresets(fromMatches(matches))
      setChecked(true)
    })()
  }, [keyword])

  return [presets, checked]
}

/**
 * usePresets hook
 */
const usePresetIndex = () => {
  const [core, checkedCore] = useModulePresets('bud-core-presets')
  const [plugin, checkedPlugin] = useModulePresets('bud-preset')

  return {
    plugin,
    core,
    status: {
      plugin: checkedPlugin,
      core: checkedCore,
    },
    complete: checkedCore && checkedPlugin,
  }
}

export default usePresetIndex
export {useModulePresets}
