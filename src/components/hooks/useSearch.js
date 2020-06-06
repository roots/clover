import {useEffect, useState} from 'react'
import globby from 'globby'

/**
 * Search helpers
 */
const cwd = process.cwd()
const search = {
  core: name => `${cwd}/node_modules/@roots/bud/src/budfiles/**/${name}.bud.js`,
  plugin: name => `${cwd}/node_modules/**/bud-plugin-*/${name}.bud.js`,
  project: name => `${cwd}/.bud/budfiles/**/${name}.bud.js`,
}

/**
 * Use Search
 *
 * @param {string} generatorName
 */
const useSearch = generatorName => {
  const [budfile, setBudfile] = useState(false)
  const [checked, setChecked] = useState({
    project: false,
    modules: false,
    core: false,
  })

  /** Project generators */
  useEffect(() => {
    generatorName &&
      !checked.project &&
      (async () => {
        const buds = await globby([search.project(generatorName)])

        buds && buds.length > 0 && setBudfile(buds[0])
        setChecked({...checked, project: true})
      })()
  }, [generatorName, checked.project])

  /** Plugin generators */
  useEffect(() => {
    !budfile &&
      checked.project &&
      (async () => {
        const buds = await globby([search.plugin(generatorName)])

        buds && buds.length > 0 && setBudfile(buds[0])
        setChecked({...checked, plugins: true})
      })()
  }, [budfile, checked.project])

  /** Core generators */
  useEffect(() => {
    !budfile &&
      checked.plugins &&
      (async () => {
        const buds = await globby([search.core(generatorName)])

        buds && buds.length > 0 && setBudfile(buds[0])
        setChecked({...checked, core: true})
      })()
  }, [budfile, checked.plugins])

  return {budfile, checked}
}

export default useSearch
