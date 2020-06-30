import React from 'react'
import {Box, Text} from 'ink'

/**
 * Present an array of objects as a list.
 *
 * @prop {string} label
 * @prop {array}  items
 * @return {ReactElement}
 */
const List = ({label, items}) => (
  <Box flexDirection="column" marginBottom={1}>
    {label && (
      <Text color="black" backgroundColor="green">
        {label}
      </Text>
    )}

    {items?.map((item, id) => (
      <Box key={id} flexDirection="column">
        <Text>◦ {item.name}</Text>
      </Box>
    ))}
  </Box>
)

export default List
