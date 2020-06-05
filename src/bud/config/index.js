/**
 * Config
 *
 * @param {string} projectDir
 */
const makeConfig = ({projectDir, sprout: {templateDir}, config}) => ({
  projectDir,
  templateDir,
  ...config,
  execa: {
    cwd: projectDir,
  },
})

export default makeConfig
