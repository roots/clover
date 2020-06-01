const pino = require('pino')
const prettifier = require('pino-pretty')
const {existsSync} = require('fs-extra')

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
    existsSync(`${projectDir}/.bud/bud.log`)
      ? pino.destination(`${projectDir}/.bud/bud.log`)
      : null,
  )
}

export default makeLogger
