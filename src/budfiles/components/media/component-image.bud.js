/**
 * Generator: Image Component
 */
module.exports = {
  name: 'component-image',
  description: 'Generate Image Component',
  tasks: [
    {
      task: 'compile',
      src: 'Image.js.hbs',
      dest: 'src/components/Image.js',
      parser: 'babel',
    },
  ],
}
