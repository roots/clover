import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Scaffold directories
 *
 * @prop   {task array} dirs
 * @return {Observable}
 */
const ensureDirs = ({task, observer, config, data, compiler, actions}) => {
  observer.next(`Creating directories`)

  return new Observable(async observer => {
    from(task.dirs)
    .pipe(
      concatMap(path => {
        return new Observable(async observer => {
          try {
            await actions.mkDir({
              task: {path},
              config,
              data,
              compiler,
              observer,
            })
          } catch {
            observer.error()
          }

          observer.next()
        })
      }),
    )
    .subscribe({
      next: next => observer.next(next),
      error: error => observer.error(error),
      complete: () => observer.complete(),
    })
  })
}

export default ensureDirs
