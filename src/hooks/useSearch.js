import {useEffect, useState} from 'react'
import useGenerators from './useGenerators'

/**
 * Use Search
 *
 * @param {string} generatorName
 */
const useSearch = (generatorName = '*') => {
  const {core, plugin, project, complete} = useGenerators(generatorName)
  const [budfile, setBudfile] = useState(null)

  useEffect(() => {
    if (project && project.length > 0) {
      setBudfile(project[0])
    } else if (plugin && plugin.length > 0) {
      setBudfile(plugin[0])
    } else if (core && core.length > 0) {
      setBudfile(core[0])
    }
  }, [core, plugin, project, complete])

  return {
    core,
    plugin,
    project,
    budfile,
    complete: complete.core && complete.project && complete.plugin,
  }
}

export default useSearch
