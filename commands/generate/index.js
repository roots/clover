import React from 'react'
import PropTypes from 'prop-types'

import App from '../../src/components/App'
import Loading from '../../src/components/Loading'
import useSearch from '../../src/components/hooks/useSearch'

/** Command: bud generate */
/// Generate code from a budfile
const Generate = ({generator}) => {
  const {budfile} = useSearch(generator)

  return budfile ? <App budfile={budfile} /> : <Loading />
}

Generate.propTypes = {
  // Generator name
  generator: PropTypes.string,
}

Generate.positionalArgs = ['generator']

export default Generate
