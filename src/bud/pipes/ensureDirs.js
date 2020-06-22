import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Curry ensureDirs
 *
 * @prop {Observer} observer
 * @prop {object}   generator
 * @prop {object}   actions
 */
const ensureDirs = ({observer, generator, actions, ...props}) => {
  from(generator.tasks)
    .pipe(
      concatMap(
        task =>
          new Observable(observer => {
            actions.ensureDir({
              observer,
              task: {
                ...task,
                path: task.dest,
              },
              ...props,
            })
          }),
      ),
    )
    .subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete(),
    })
}

export default ensureDirs
