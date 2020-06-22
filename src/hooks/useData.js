import {useEffect, useState} from 'react'
import {prompt} from 'enquirer'

/**
 * Use prompts
 */
const useData = generator => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (generator && !data) {
      generator.prompts
        ? prompt(generator.prompts).then(data => setData(data))
        : setData({})
    }
  }, [generator])

  return {data}
}

export default useData
