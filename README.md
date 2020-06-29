<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <img alt="devDependency Status" src="https://img.shields.io/david/dev/roots/bud.svg?style=flat-square">
  <img alt="Build Status" src="https://img.shields.io/circleci/project/github/roots/bud/master.svg?style=flat-square">
  <img alt="Maintainability" src="https://api.codeclimate.com/v1/badges/a7209502e433ea3571b1/maintainability">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<p align="center">
  <strong>Powerful Block Scaffolding for WordPress</strong>
  <br />
  Built with ❤️
</p>

<p align="center">
  <a href="https://roots.io">Official Website</a> | <a href="https://roots.io/docs/bud/master/usage">Documentation</a> | <a href="https://roots.io/docs/bud/master/changes">Change Log</a>
</p>

## Supporting

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and products within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider donating using the links below:

<div align="center">

[![Donate via Patreon](https://img.shields.io/badge/donate-patreon-orange.svg?style=flat-square&logo=patreon")](https://www.patreon.com/rootsdev) [![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square&logo=paypal)](https://www.paypal.me/rootsdev)

</div>

## Overview

Bud is an extendable, zero configuration scaffolding CLI for WordPress editor blocks, also known as [Gutenberg](https://wordpress.org/gutenberg/).

## Requirements

| Requirement | Version |
| ----------- | ------- |
| PHP         | >=7.2   |
| Node        | >=12    |

## Usage

Bud is currently pre-release. But, you can try it out now:

```sh
npx @roots/bud@1.0.0-rc.6 init [project-dir]
```

This will initialize your project and install `@roots/bud` as a local dev dependency.

After initializing, you might try additional generators to kick-start your dev process.

Select from a list of available generators:

```sh
yarn bud generate
```

Run a particular generator by name:

```sh
yarn bud generate block
```

If you are using Bud in order to build a plugin for the WordPress block editor, you can get started with a recommended preset rather than running several generators manually:

```sh
yarn bud preset wp-plugin
```

This is equivalent to:

```sh
yarn bud generate wp-plugin
yarn bud generate block
yarn bud generate wp-editor-component-image
yarn bud generate wp-editor-extension
```

You can write your own custom generators and presets or install/share them by writing a plugin for Bud.

Documentation forthcoming. For now, you can run `yarn bud list` to see what is available out-of-the-box.

## All commands:

| Command      | Description             |
| ------------ | ----------------------- |
| bud          | Bud CLI                 |
| bud generate | Run a generator.        |
| bud init     | Create a new project    |
| bud list     | List available budfiles |
| bud preset   | Run a preset.           |

### Dependencies

- chalk
- enquirer
- esm
- execa
- find-plugins
- fs-extra
- globby
- handlebars
- handlebars-helpers
- ink
- ink-link
- ink-spinner
- ink-text-input
- ink-use-stdout-dimensions
- lodash
- pastel
- prettier
- prop-types
- react
- resolve-pkg
- rxjs

### Development dependencies

- @roots/bud-generators
- arr-rotate
- babel-eslint
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- husky
- markdownlint-cli
- npm-run-all

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a>
<a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a>
<a href="https://carrot.com/"><img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"></a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
