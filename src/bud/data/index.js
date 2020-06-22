/**
 * Make data
 *
 * @type   {func}
 * @prop   {object} data
 * @return {object}
 */
const makeData = ({config, data, generator}) => {
  const setData = ({key, value}) => {
    data[key] = value
  }

  return {
    ...(config ? config.project : []),
    ...data,
    ...(generator.data ? generator.data : []),
    setData,
  }
}

export default makeData
