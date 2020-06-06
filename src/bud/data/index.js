/**
 * Make data
 *
 * @type   {func}
 * @prop   {object} data
 * @return {object}
 */
const makeData = ({config, data, sprout}) => {
  const setData = ({key, value}) => {
    data[key] = value
  }

  return {
    ...(config ? config.project : []),
    ...data,
    ...(sprout.data ? sprout.data : []),
    setData,
  }
}

export default makeData
