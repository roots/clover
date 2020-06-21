import React from 'react'
import {Box, Color} from 'ink'
import Spinner from 'ink-spinner'
import PropTypes from 'prop-types'

/**
 * Loading
 *
 * @prop {string} message
 */
const Loading = ({message, spinnerColor = 'white'}) => (
  <Box>
    <Color keyword={spinnerColor}>
      <Spinner />
    </Color>{' '}
    {message}
  </Box>
)

Loading.propTypes = {
  message: PropTypes.string,
}

Loading.defaultProps = {
  message: 'Loading',
}

export default Loading
