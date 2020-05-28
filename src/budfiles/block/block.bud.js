/**
 * bud generate block
 */

// prettier-ignore
module.exports = {
  name: 'block',
  description: 'Generate a new block',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name',
      initial: 'acme-block',
      required: true,
    },
    {
      type: 'input',
      name: 'title',
      message: 'Title',
      initial: 'ACME Co. Block',
      required: true,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      initial: 'Short description of acme-block',
    },
    {
      type: 'list',
      name: 'keywords',
      message: 'Keywords',
      initial: [],
    },
    {
      type: 'multiselect',
      name: 'components',
      message: 'Components',
      choices: ['RichText', 'InnerBlocks'],
    },
    {
      type: 'select',
      name: 'category',
      message: 'Category',
      initial: 'common',
      choices: ['common', 'formatting', 'layout', 'widgets', 'embed'],
    },
    {
      type: 'multiselect',
      name: 'supports',
      message: 'Supports',
      initial: ['align', 'inserter', 'multiple', 'reusable'],
      choices: [
        'anchor',
        'align',
        'alignWide',
        'customClassName',
        'html',
        'inserter',
        'multiple',
        'reusable',
      ],
    },
    {
      type: 'select',
      name: 'styles',
      message: 'Define styles (https://git.io/JfZTu)',
      choices: ['yes', 'no'],
    },
  ],
  tasks: [
    {
      task: 'compile',
      src: 'attributes.json.hbs',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/attributes.json',
      parser: 'json',
    },
    {
      task: 'compile',
      src: 'editor.js.hbs',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/editor.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'containers/edit.js.hbs',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/containers/edit.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'containers/save.js.hbs',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/containers/save.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'public.js.hbs',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/public.js',
      parser: 'babel',
    },
    {
      task: 'compile',
      src: 'styles/common.css',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/styles/common.css',
      parser: 'css',
    },
    {
      task: 'compile',
      src: 'editor.css',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/editor.css',
      parser: 'css',
    },
    {
      task: 'compile',
      src: 'public.css',
      dest: 'src/blocks/{{lowercase (dashcase name)}}/public.css',
      parser: 'css',
    },
  ],
}
