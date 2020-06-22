import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Curried actions
 *
 * @prop {Observer} observer
 * @prop {object}   generator
 * @prop {object}   task
 * @prop {object}   actionProps
 */
const actions = ({observer, generator, actions, ...props}) => {
  from(generator.tasks)
    .pipe(
      concatMap(
        task =>
          new Observable(async observer => {
            actions[task.task]({task, actions, observer, ...props})
          }),
      ),
    )
    .subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete(),
    })
}

export default actions
