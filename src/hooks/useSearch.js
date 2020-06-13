import {useEffect, useState} from 'react'
import globby from 'globby'
import useGenerators from './useGenerators'

/**
 * Search helpers
 */
const cwd = process.cwd()
const search = {
  project: name => `${cwd}/.bud/budfiles/**/${name}.bud.js`,
}

/**
 * Use Search
 *
 * @param {string} generatorName
 */
const useSearch = generatorName => {
  const {coreGenerators, pluginGenerators} = useGenerators(generatorName)
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
      pluginGenerators &&
      (async () => {
        const buds = await globby(pluginGenerators)
        console.log(pluginGenerators, buds)

        buds && buds.length > 0 && setBudfile(buds[0])
        setChecked({...checked, plugins: true})
      })()
  }, [budfile, checked.project])

  /** Core generators */
  useEffect(() => {
    !budfile &&
      checked.plugins &&
      coreGenerators &&
      (async () => {
        const buds = await globby(coreGenerators)

        buds && buds.length > 0 && setBudfile(buds[0])
        setChecked({...checked, core: true})
      })()
  }, [budfile, checked.plugins])

  return {budfile, checked}
}

export default useSearch
