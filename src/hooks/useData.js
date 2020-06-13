import {useEffect, useState} from 'react'
import {prompt} from 'enquirer'

/**
 * Use prompts
 */
const useData = sprout => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (sprout && !data) {
      sprout.prompts ? prompt(sprout.prompts).then(data => setData(data)) : setData({})
    }
  }, [sprout])

  return {data}
}

export default useData
