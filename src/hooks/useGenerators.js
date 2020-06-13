import path from 'path'
import {useState, useEffect} from 'react'
import findPlugins from 'find-plugins'
import globby from 'globby'

const cwd = process.cwd()

const useGenerators = (search = '*') => {
  /**
   * project .bud
   */
  const [project, setProject] = useState([])
  const [checkedProject, setCheckedProject] = useState(false)
  useEffect(() => {
    (async () => {
      setCheckedProject(false)

      const files = await globby([
        `${cwd}/.bud/budfiles/**/${search}.bud.js`,
      ])

      setProject(files.map(result => ({
        name: path.basename(result).replace('.bud.js', ''),
        path: result,
      })))

      setCheckedProject(true)
    })()
  }, [search])

  /**
   * node_modules
   */
  const [plugin, setPlugin] = useState([])
  const [checkedPlugin, setCheckedPlugin] = useState(false)
  useEffect(() => {
    (async () => {
      setCheckedPlugin(false)

      const files = findPlugins({
        keyword: 'bud-generators',
      }).map(match => `${match.dir}/**/${search}.bud.js`)

      const results = await globby(files)

      setPlugin(results.map(result => ({
        name: path.basename(result).replace('.bud.js', ''),
        path: result,
      })))

      setCheckedPlugin(true)
    })()
  }, [search])

  /**
   * @roots/bud-generators
   */
  const [core, setCore] = useState([])
  const [checkedCore, setCheckedCore] = useState(false)
  useEffect(() => {
    (async () => {
      setCheckedCore(false)

      const files = findPlugins({
        keyword: 'bud-core-generators',
      }).map(match => `${match.dir}/**/${search}.bud.js`)

      const results = await globby(files)

      setCore(results.map(result => ({
        name: path.basename(result).replace('.bud.js', ''),
        path: result,
      })))

      setCheckedCore(true)
    })()
  }, [search])

  return {
    project,
    plugin,
    core,
    complete: {
      project: checkedProject,
      core: checkedCore,
      plugin: checkedPlugin,
    },
  }
}

export default useGenerators
