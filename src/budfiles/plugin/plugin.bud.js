module.exports = {
  name: 'plugin',
  description: 'Generate a new plugin',
  actions: [
    {
      action: 'template',
      template: 'README.md.hbs',
      path: 'README.md',
      parser: 'markdown',
    },
    {
      action: 'template',
      template: 'LICENSE.md.hbs',
      path: 'LICENSE.md',
      parser: 'markdown',
    },
    {
      action: 'template',
      template: 'plugin.php.hbs',
      path: 'plugin.php',
      parser: 'php',
    },
    {
      action: 'template',
      template: 'composer.json.hbs',
      path: 'composer.json',
      parser: 'json',
    },
    {
      action: 'template',
      template: '.babelrc.js',
      path: '.babelrc.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: '.editorconfig',
      path: '.editorconfig',
    },
    {
      action: 'template',
      template: '.eslintrc.js',
      path: '.eslintrc.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: '.eslintignore',
      path: '.eslintignore',
    },
    {
      action: 'template',
      template: '.gitignore',
      path: '.gitignore',
    },
    {
      action: 'template',
      template: 'postcss.config.js',
      path: 'postcss.config.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'prettier.config.js',
      path: 'prettier.config.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: '.prettierignore',
      path: '.prettierignore',
    },
    {
      action: 'template',
      template: 'stylelint.config.js',
      path: 'stylelint.config.js',
      parser: 'babel',
    },
    {
      action: 'template',
      template: 'webpack.config.js.hbs',
      path: 'webpack.config.js',
      parser: 'babel',
    },
    {
      action: 'scaffold',
      paths: ['src', 'src/blocks', 'src/components', 'src/extensions'],
    },
    {
      action: 'addDependencies',
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
        'browser-sync',
        'browser-sync-webpack-plugin',
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
        'webpack-dev-server',
        'webpack-manifest-plugin',
        'webpackbar',
        'write-file-webpack-plugin',
      ],
    },
    {
      action: 'json',
      file: 'package.json',
      merge: pkg => ({
        ...pkg,
        browserslist: ['extends @wordpress/browserslist-config'],
        scripts: {
          ...pkg.scripts,
          dev:
            'cross-env NODE_ENV=hmr webpack-dev-server --colors --watch --config webpack.config.js',
          build:
            'cross-env NODE_ENV=development webpack --progress --colors --inline -p --config webpack.config.js',
          'build:production':
            'cross-env NODE_ENV=production webpack --progress --colors --inline -p --config webpack.config.js',
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