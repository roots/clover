import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'
import makeCompiler from './compiler'
import makeConfig from './config'
import makeData from './data'
import makeUtil from './util'
import pipes from './pipes'
import actions from './actions'
import prettier from './prettier'
import makeLogger from './logger'

/**
 * 🌱 bud starter
 *
 * @prop {string} projectDir
 * @prop {object} projectConfig
 * @prop {object} data
 * @prop {object} sprout
 * @prop {string} templateDir
 *
 * @return {Observable}
 */
const bud = props => {
  const {sprout} = props
  const logger = makeLogger({...props})
  const config = makeConfig({...props})
  const data = makeData({...props})
  const util = makeUtil({config})
  const compiler = makeCompiler({sprout, data})

<<<<<<< HEAD
  sprout.registerActions &&
    sprout.registerActions.forEach(action => {
=======
  sprout.registerActions
    && sprout.registerActions.forEach(action => {
>>>>>>> [wip] fix css enqueues. update plugin generator
      actions.register({action})
    })

  return new Observable(observer => {
<<<<<<< HEAD
    const props = {
      config,
      data,
      actions,
      compiler,
      prettier,
      util,
      sprout,
      logger,
    }
=======
    const props = {config, data, actions, compiler, prettier, util}
>>>>>>> [wip] fix css enqueues. update plugin generator

    from(pipes)
      .pipe(
        concatMap(
<<<<<<< HEAD
          job =>
            new Observable(async observer => {
              await job({observer, ...props})
            }),
        ),
=======
          job => new Observable(async observer => {
            await job({observer, sprout, ...props})
          })
        )
>>>>>>> [wip] fix css enqueues. update plugin generator
      )
      .subscribe({
        next: next => {
          next && logger.info({emitter: 'bud', emitted: 'next'})
          observer.next(next)
        },
        error: error => {
          error && logger.error({emitter: 'bud', emitted: 'error'})
          observer.error(error)
        },
        complete: () => observer.complete(),
      })
    })
}

export default bud
