import React from 'react'
import PropTypes from 'prop-types'

import useSearch from './../../src/hooks/useSearch'

import App from './../../src/components/App'
import Loading from './../../src/components/Loading'

/** Command: bud generate */
/// Generate code from a budfile
const Generate = ({generator}) => {
  const {budfile, complete} = useSearch(generator)

  return complete ? <App budfile={budfile.path} /> : <Loading />
}

Generate.propTypes = {
  // Generator name
  generator: PropTypes.string,
}

Generate.positionalArgs = ['generator']

export default Generate
