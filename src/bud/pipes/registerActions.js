import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Curry ensureDirs
 *
 * @prop {Observer} observer
 * @prop {object}   generator
 * @prop {object}   actions
 */
const registerActions = ({observer, generator, actions}) => {
  generator.registerActions &&
    from(generator.registerActions)
      .pipe(
        concatMap(
          action =>
            new Observable(observer => {
              actions.register({observer, action})
            }),
        ),
      )
      .subscribe({
        next: next => observer.next(next),
        error: error => observer.error(error),
        complete: () => observer.complete(),
      })
}

export default registerActions
