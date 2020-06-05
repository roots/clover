import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'
import makeCompiler from './compiler'
import makeConfig from './config'
import makeData from './data'
import makeUtil from './util'
import pipes from './pipes'
import actions from './actions'
import prettier from './prettier'
import makeLogger from './status'

/**
 * 🌱 bud starter
 *
 * @prop {string} projectDir
 * @prop {object} config
 * @prop {object} data
 * @prop {object} sprout
 * @prop {string} templateDir
 * @prop {bool}   logging
 *
 * @return {Observable}
 */
const bud = props => {
  const {sprout} = props
  const status = makeLogger({...props})
  const config = makeConfig({...props})
  const data = makeData({...props})
  const util = makeUtil({config})
  const compiler = makeCompiler({sprout, data})

  sprout.registerActions &&
    sprout.registerActions.forEach(action => {
      actions.register({action})
    })

  return new Observable(observer => {
    const props = {
      config,
      data,
      actions,
      compiler,
      prettier,
      util,
      sprout,
      status,
      logger: status,
    }

    from(pipes)
      .pipe(
        concatMap(
          job =>
            new Observable(async observer => {
              await job({observer, ...props})
            }),
        ),
      )

      .subscribe({
        next: next => {
          next &&
            status.info({
              emitter: 'bud',
              emitted: next,
            })

          observer.next(next)
        },
        error: error => {
          error &&
            status.error({
              emitter: 'bud',
              emitted: error,
            })

          observer.error(error)
        },
        complete: () => {
          observer.complete()
        },
      })
    })
}

export default bud
