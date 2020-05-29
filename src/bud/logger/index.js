const pino = require('pino')
const prettifier = require('pino-pretty')

/**
 * Make logger
 *
 * @return {<Pino>()=>logger}
 */
const makeLogger = ({projectDir}) => {
  return pino(
    {
      prettyPrint: {
        levelFirst: true,
      },
      prettifier,
    },
    pino.destination(`${projectDir}/.bud/bud.log`),
  )
}

export default makeLogger
