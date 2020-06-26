import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'
import makeCompiler from './compiler'
import makeConfig from './config'
import makeData from './data'
import makeUtil from './util'
import pipes from './pipes'
import actions from './actions'
import prettier from './prettier'

/**
 * Bud
 *
 * @prop {string} projectDir
 * @prop {object} config
 * @prop {object} data
 * @prop {object} generator
 * @prop {string} templateDir
 * @prop {bool}   logging
 *
 * @return {Observable}
 */
const bud = props => {
  const {generator} = props
  const config = makeConfig({...props})
  const data = makeData({...props})
  const util = makeUtil({config})
  const compiler = makeCompiler({generator, data})

  generator.registerActions &&
    generator.registerActions.forEach(action => {
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
      generator,
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
          observer.next(next)
        },
        error: error => {
          observer.error(error)
        },
        complete: () => {
          observer.complete()
        },
      })
  })
}

export default bud
