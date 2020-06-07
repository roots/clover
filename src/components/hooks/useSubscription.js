import {useEffect, useState} from 'react'
import {useApp} from 'ink'
import bud from '../../bud'

/**
 * Use subscription.
 */
const useSubscription = ({config, data, projectDir, sprout}) => {
  const {exit} = useApp()

  const [subscription, setSubscription] = useState(false)
  const [status, setStatus] = useState(null)
  const [error] = useState(null)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (sprout && data && !subscription) {
      setSubscription(
        bud({config, data, sprout, projectDir}).subscribe({
          next: next => setStatus(next),
          complete: () => setComplete(true),
        }),
      )
    }
  }, [data])

  useEffect(() => {
    complete &&
      (() => {
        subscription.unsubscribe()

        exit()
      })()
  }, [complete])

  return {status, error, complete}
}

export default useSubscription
