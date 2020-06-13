import path from 'path'
import findPlugins from 'find-plugins'

const useExtensions = (search = '*') => {
  const pluginGenerators = findPlugins({
    keyword: 'bud-generators',
  }).map(generator => path.join(generator.dir, `**/${search}.bud.js`))

  const coreGenerators = findPlugins({
    keyword: 'bud-core-generators',
  }).map(generator => path.join(generator.dir, `**/${search}.bud.js`))

  return {
    pluginGenerators: pluginGenerators ?? null,
    coreGenerators: coreGenerators ?? null,
  }
}

export default useExtensions
