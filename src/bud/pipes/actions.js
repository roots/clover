import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Curried actions
 *
 * @prop {Observer} observer
 * @prop {object}   sprout
 * @prop {object}   task
 * @prop {object}   actionProps
 */
const actions = ({observer, sprout, actions, ...props}) => {
  from(sprout.tasks)
    .pipe(
      concatMap(
        task => new Observable(observer => {
          actions[task.task]({task, observer, ...props})
        })
      )
    )
    .subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete(),
    })
}

export default actions
