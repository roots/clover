import React from 'react'
import PropTypes from 'prop-types'

import Generate from './generate'

/** Command: bud */
/// Bud CLI
const Bud = ({inputArgs}) => <Generate inputArgs={inputArgs} />

Bud.propTypes = {
  inputArgs: PropTypes.array,
}

export default Bud
