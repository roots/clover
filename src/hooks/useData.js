import {useEffect, useState} from 'react'
import {prompt} from 'enquirer'

/**
 * Use prompts
 */
const useData = generator => {
  const [data, setData] = useState(null)
  const [promptsInitialized, setPromptsInitialized] = useState(null)
  useEffect(() => {
    if (generator && !data && !promptsInitialized) {
      setPromptsInitialized(true)

      generator.prompts
        ? prompt(generator.prompts).then(data => setData(data))
        : setData({})
    }
  }, [generator, data, promptsInitialized])

  return {data}
}

export default useData
