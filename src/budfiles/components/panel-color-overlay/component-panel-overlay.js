/**
 * Inspector Panel: Color Overlay
 */
module.exports = {
  name: 'component-panel-color-overlay',
  description: 'Inspector Panel: Color Overlay',
  actions: [
    {
      action: 'template',
      template: 'PanelColorOverlay.js.hbs',
      path: 'src/components/PanelColorOverlay.js',
      parser: 'babel',
    },
    {
      action: 'addDependencies',
      repo: 'npm',
      pkgs: ['chroma-js'],
    },
  ],
}
