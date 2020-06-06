import React from 'react'
import {Box} from 'ink'
import Spinner from 'ink-spinner'
import PropTypes from 'prop-types'

/**
 * Loading
 *
 * @prop {string} message
 */
const Loading = ({message}) => (
  <Box>
    <Spinner /> {message}
  </Box>
)

Loading.propTypes = {
  message: PropTypes.string,
}

Loading.defaultProps = {
  message: 'Loading',
}

export default Loading
