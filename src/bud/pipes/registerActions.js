import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Curry ensureDirs
 *
 * @prop {Observer} observer
 * @prop {object}   sprout
 * @prop {object}   actions
 */
const registerActions = ({observer, sprout, actions}) => {
<<<<<<< HEAD
  sprout.registerActions &&
    from(sprout.registerActions)
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
=======
  sprout.registerActions && from(sprout.registerActions)
    .pipe(
      concatMap(
        action => new Observable(observer => {
          actions.register({observer, action})
        })
      )
    )
    .subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete(),
    })
>>>>>>> [wip] fix css enqueues. update plugin generator
}

export default registerActions
