import {Observable, from} from 'rxjs'
import {concatMap} from 'rxjs/operators'

/**
 * Scaffold directories
 *
 * @prop   {task array} dirs
 * @return {Observable}
 */
const ensureDirs = ({
  task,
  observer,
  logger,
  actions,
  config,
  data,
  compiler,
}) => {
  logger.info({emitter: 'ensureDirs', task})

  from(task.dirs)
    .pipe(
      concatMap(
        path =>
          new Observable(observer => {
            actions.ensureDir({
              task: {path},
              config,
              data,
              compiler,
              observer,
              logger,
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
