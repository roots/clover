const {globber} = require('./util')

/**
 * Blocks entrypoints
 */
const blocks = {
  from: 'plugins',
  entries: [
    ['script', 'plugin.js'],
  ],
}

/**
 * Editor plugin entrypoints
 */
const plugins = {
  from: 'blocks',
  entries: [
    ['editor_script', 'editor.js'],
    ['editor_style', 'editor.css'],
    ['script', 'editor.js'],
    ['style', 'editor.css'],
  ],
}

/**
 * Webpack Entrypoints
 */
const entry = ({config}) => ({
  entry: {
    ...globber([blocks, plugins]),
    ...config,
  },
})

module.exports = entry