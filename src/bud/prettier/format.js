import prettier from 'prettier'
const config = require('../../../prettier.config.js')

/**
 * Format
 *
 * @type   {func}
 * @param  {object|string} content
 * @param  {parser} string
 * @return {string}
 */
const format = (content, parser) => {
  content =
    typeof content !== 'string' ? JSON.stringify(content) : content

  return prettier.format(content, {
    ...config,
    parser: parser || 'babel',
  })
}

export default format
