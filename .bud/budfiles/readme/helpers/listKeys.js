/**
 * Convert an object's keys into a github-flavor list.
 *
 * @param {object} obj
 */
const listKeys = obj => {
  let list = ''

  Object.keys(obj).forEach(item => {
    list = item ? `${list}\n- ${item}` : list
  })

  return list
}

module.exports = listKeys
