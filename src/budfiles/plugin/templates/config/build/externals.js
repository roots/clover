const {camelCash} = require('./util')

/**
 * Define externals to load components through the wp global.
 */
const externals = ({config}) => ({
  externals: {
    ...[
      'blocks',
      'data',
      'edit-post',
      'element',
      'i18n',
      'plugins',
    ].reduce((externals, name) => ({
      ...externals,
      [`@wordpress/${name}`]: `wp.${camelCash(name)}`,
    }), {
      wp: 'wp',
    }),
  },
})

module.exports = externals
