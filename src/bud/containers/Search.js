import React, {useContext, useState, useEffect} from 'react'
import {Box, Text} from 'ink'
import PropTypes from 'prop-types'
import globby from 'globby'
import {Observable} from 'rxjs'
import Spinner from 'ink-spinner'

/** application */
import {store} from '../store'

/**
 * Search
 *
 * @prop {array}  glob
 * @prop {string} label
 */
const Search = ({glob, label}) => {
  const {dispatch} = useContext(store)

  /**
   * Return an observable emitting
   * search criterion matches.
   */
  const [search] = useState(
    new Observable(async observer => {
      observer.next({status: 'Searching'})

      const results = await globby(glob)

      observer.next({
        results: results ? results[0] : null,
      })

      observer.complete()
    }),
  )

  /**
   * Once there is an observer available to subscribe to,
   * use what it emits to set various component states.
   */
  const [status, setStatus] = useState(null)
  const [complete, setComplete] = useState(null)
  const [results, setResults] = useState(null)
  useEffect(() => {
    search?.subscribe({
      next: next => {
        next.status && setStatus(next.status)
        next.results && setResults(next.results)
      },
      complete: () => setComplete(true),
      error: () => setComplete(true),
    })
  }, [search])

  /**
   * Mirror any changes to component state
   * in the global store.
   */
  useEffect(() => {
    dispatch({
      type: 'SEARCH_RESULTS',
      label,
      results,
      complete,
      status,
    })
  }, [results, status, complete])

  /** Format matched files for display */
  const displayFile = file => file.replace(process.cwd() + '/', '')

  /**
   * Render
   */
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Box marginRight={2} width={10}>
          <Text>{label}</Text>
        </Box>

        {results
          ? <Text underline>{displayFile(results)}</Text>
          : ! complete ? (
            <Box flexDirection="column">
              <Spinner />
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text>No results</Text>
            </Box>
          )}
      </Box>
    </Box>
  )
}

Search.propTypes = {
  glob: PropTypes.array.isRequired,
  label: PropTypes.string,
}

Search.defaultProps = {
  label: 'Search',
}

export default Search
