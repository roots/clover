const pino = require('pino')
const prettifier = require('pino-pretty')
const {existsSync} = require('fs-extra')

const options = {
  prettyPrint: {levelFirst: true},
  prettifier,
}

const destination = projectDir =>
  existsSync(`${projectDir}/.bud/bud.log`)
    ? pino.destination(`${projectDir}/.bud/bud.log`)
    : null

/**
 * Make logger
 *
 * @return {<Pino>()=>logger}
 */
const makeLogger = ({projectDir}) => pino(options, destination(projectDir))

/**
 * Make status
 */
const makeStatus = ({projectDir, logging}) => {
  const logger = makeLogger(projectDir)

  return logging
    ? {
        info: info => logger.info(info),
        error: error => logger.error(error),
      }
    : {
        info: () => null,
        error: () => null,
      }
}

export default makeStatus
