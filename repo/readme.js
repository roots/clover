#!/usr/bin/env node

const {resolve} = require('path')
const {writeFileSync} = require('fs')
const {format} = require('prettier')

/** Util */
const {listKeys, block, commands} = require('./components/helpers')

/** Data */
const {
  name,
  licenses,
  version,
  dependencies,
  devDependencies,
  engines,
} = require('./../package.json')

/** Target */
const readme = resolve(__dirname, '../README.md')

/**
 * README contents.
 */
writeFileSync(
  readme,
  format(
    `
<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="${
    licenses.shift().type || ''
  } License" src="https://img.shields.io/github/license/${name.replace(
      '@',
      '',
    )}?color=%23525ddc&style=flat-square">

  <img alt="devDependency Status" src="https://img.shields.io/david/dev/${name.replace(
    '@',
    '',
  )}.svg?style=flat-square">

  <img alt="Build Status" src="https://img.shields.io/circleci/project/github/${name.replace(
    '@',
    '',
  )}/master.svg?style=flat-square">

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

  [![Donate via Patreon](https://img.shields.io/badge/donate-patreon-orange.svg?style=flat-square&logo=patreon")](https://www.patreon.com/rootsdev)
  [![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square&logo=paypal)](https://www.paypal.me/rootsdev)

</div>

## Overview

Bud is an extendable, zero configuration scaffolding CLI for WordPress editor blocks, also known as [Gutenberg](https://wordpress.org/gutenberg/).

## Requirements

| Requirement | Version |
| ---- | --- |
| PHP  | >=7.2 |
| Node | ${engines.node} |

## Usage

Bud is currently pre-release. But, you can try it out now:

${block('sh', `npx @roots/bud@${version} init [project-dir]`)}

This will initialize your project and install \`@roots/bud\` as a local dev dependency.

After initializing, you might try additional generators to kick-start your dev process:

${block('sh', `yarn generate plugin`)}

${block('sh', `yarn generate block`)}

But, you can also write your own custom generators, or install/share them by writing a \`bud-plugin\`.

Documentation forthcoming. For now, you can run \`yarn generate:list\` to see what is available out-of-the-box.

## All commands:

| Command | Description |
| --- | --- |
${commands()}

### Dependencies

${listKeys(dependencies)}

### Development dependencies

${listKeys(devDependencies)}

## Roadmap

- \`HMR\`
- \`bud component\`
- \`bud extension\`

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

`,
    {parser: 'markdown'},
  ),
  'utf8',
)
