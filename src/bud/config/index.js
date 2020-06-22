/**
 * Config
 *
 * @param {string} projectDir
 */
const makeConfig = ({projectDir, config}) => ({
  projectDir,
  ...config,
  execa: {
    cwd: projectDir,
  },
})

export default makeConfig
