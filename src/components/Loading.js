import React from 'react'
import {Text} from 'ink'
import PropTypes from 'prop-types'

/**
 * Loading
 *
 * @prop {string} message
 */
const Loading = ({message, spinnerColor = 'white'}) => (
  <Text color={spinnerColor}> {message}</Text>
)

Loading.propTypes = {
  message: PropTypes.string,
}

Loading.defaultProps = {
  message: 'Loading',
}

export default Loading
