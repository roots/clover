/**
 * bud generate plugin
 */

// prettier-ignore
module.exports = {
  name: 'plugin',
  description: 'Generate a new plugin',
  tasks: [
    {
      task: 'ensureDirs',
      dirs: [
        'app',
        'app/Asset',
        'app/Asset/Base',
        'app/Asset/Contract',
        'app/Blocks',
        'app/Block/Base',
        'app/Block/Contract',
        'app/Plugin',
        'config',
        'config/build',
        'src',
        'src/blocks',
        'src/plugins',
      ],
    },
    {
      task: 'compile',
      src: 'README.md.hbs',
      dest: 'README.md',
      parser: 'markdown',
    },
    {
      task: 'compile',
      src: 'LICENSE.md.hbs',
      dest: 'LICENSE.md',
      parser: 'markdown',
    },
    {
      task: 'compile',
      src: 'plugin.php.hbs',
      dest: 'plugin.php',
    },
    {
      task: 'compile',
      src: 'composer.json.hbs',
      dest: 'composer.json',
      parser: 'json',
    },
    {
      task: 'compile',
      src: 'babel.config.js',
      dest: 'babel.config.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: '.editorconfig',
      dest: '.editorconfig',
    },
    {
      task: 'compile',
      src: '.eslintrc.js',
      dest: '.eslintrc.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: '.eslintignore',
      dest: '.eslintignore',
    },
    {
      task: 'compile',
      src: '.gitignore',
      dest: '.gitignore',
    },
    {
      task: 'compile',
      src: 'postcss.config.js',
      dest: 'postcss.config.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'prettier.config.js',
      dest: 'prettier.config.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: '.prettierignore',
      dest: '.prettierignore',
    },
    {
      task: 'compile',
      src: 'stylelint.config.js',
      dest: 'stylelint.config.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'webpack.config.js.hbs',
      dest: 'webpack.config.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'uninstall.php.hbs',
      dest: 'uninstall.php',
    },
    {
      task: 'compile',
      src: 'app/bootstrap.php.hbs',
      dest: 'app/bootstrap.php',
    },
    {
      task: 'compile',
      src: 'app/Plugin/Activate.php.hbs',
      dest: 'app/Plugin/Activate.php',
    },
    {
      task: 'compile',
      src: 'app/Plugin/Deactivate.php.hbs',
      dest: 'app/Plugin/Deactivate.php',
    },
    {
      task: 'compile',
      src: 'app/Plugin/Registration.php.hbs',
      dest: 'app/Plugin/Registration.php',
    },
    {
      task: 'compile',
      src: 'app/Asset/Collection.php.hbs',
      dest: 'app/Asset/Collection.php',
    },
    {
      task: 'compile',
      src: 'app/Asset/Base/AbstractCollection.php.hbs',
      dest: 'app/Asset/Base/AbstractCollection.php',
    },
    {
      task: 'compile',
      src: 'app/Asset/Contract/CollectionInterface.php.hbs',
      dest: 'app/Asset/Contract/CollectionInterface.php',
    },
    {
      task: 'compile',
      src: 'app/Block/Block.php.hbs',
      dest: 'app/Block/Block.php',
    },
    {
      task: 'compile',
      src: 'app/Block/Base/AbstractBlock.php.hbs',
      dest: 'app/Block/Base/AbstractBlock.php',
    },
    {
      task: 'compile',
      src: 'app/Block/Contract/BlockInterface.php.hbs',
      dest: 'app/Block/Contract/BlockInterface.php',
    },
    {
      task: 'copy',
      src: 'config/build/index.js',
      dest: 'config/build/index.js',
    },
    {
      task: 'copy',
      src: 'config/build/dev.js',
      dest: 'config/build/dev.js',
    },
    {
      task: 'copy',
      src: 'config/build/entry.js',
      dest: 'config/build/entry.js',
    },
    {
      task: 'copy',
      src: 'config/build/externals.js',
      dest: 'config/build/externals.js',
    },
    {
      task: 'copy',
      src: 'config/build/optimization.js',
      dest: 'config/build/optimization.js',
    },
    {
      task: 'copy',
      src: 'config/build/plugins.js',
      dest: 'config/build/plugins.js',
    },
    {
      task: 'copy',
      src: 'config/build/resolve.js',
      dest: 'config/build/resolve.js',
    },
    {
      task: 'copy',
      src: 'config/build/rules.js',
      dest: 'config/build/rules.js',
    },
    {
      task: 'copy',
      src: 'config/build/util.js',
      dest: 'config/build/util.js',
    },
    {
      task: 'addDependencies',
      repo: 'packagist',
      dev: false,
      pkgs: [
        'php-di/php-di',
        'tightenco/collect',
        'roots/support',
      ],
    },
    {
      task: 'addDependencies',
      repo: 'npm',
      dev: true,
      pkgs: [
        '@babel/cli',
        '@babel/core',
        '@babel/preset-env',
        '@babel/preset-react',
        '@wordpress/browserslist-config',
        '@wordpress/dependency-extraction-webpack-plugin',
        'autoprefixer',
        'babel-eslint',
        'babel-loader',
        'clean-webpack-plugin',
        'cross-env',
        'css-loader',
        'cssnano',
        'eslint',
        'eslint-loader',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'extract-loader',
        'file-loader',
        'friendly-errors-webpack-plugin',
        'mini-css-extract-plugin',
        'npm-run-all',
        'postcss-import',
        'postcss-loader',
        'postcss-preset-env',
        'prettier',
        'prop-types',
        'react',
        'react-dom',
        'style-loader',
        'stylelint',
        'stylelint-config-standard',
        'uglifyjs-webpack-plugin',
        'url-loader',
        'webpack',
        'webpack-cli',
        'webpack-dashboard',
        'webpack-dev-server',
        'webpack-fix-style-only-entries',
        'webpack-manifest-plugin',
        'webpackbar',
        'write-file-webpack-plugin',
      ],
    },
    {
      task: 'json',
      file: 'package.json',
      merge: pkg => ({
        ...pkg,
        browserslist: ['extends @wordpress/browserslist-config'],
        scripts: {
          ...pkg.scripts,
          dev: 'cross-env NODE_ENV=hmr webpack-dashboard -t Bud -- webpack-dev-server --inline --watch --config webpack.config.js',
          build: 'cross-env NODE_ENV=development webpack-dashboard -t Bud -- webpack --inline --watch --config webpack.config.js',
          'build:production': 'cross-env NODE_ENV=production webpack --progress --inline --config webpack.config.js',
          lint: 'run-s -c lint:*',
          'lint:css': 'stylelint ./src/**/*.css',
          'lint:js': 'eslint ./src/**/*.js',
          format: 'prettier --write .',
          translate: 'run-s -c translate:*',
          'translate:pot':
          'wp i18n make-pot . ./src/languages/plugin.pot --ignore-domain --include="./src"',
          'translate:js':
          'wp i18n make-json ./src/languages --no-purge --pretty-print',
        },
      }),
    },
  ],
}
