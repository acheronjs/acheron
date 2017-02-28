import config from './rollup.base';
import babel from 'rollup-plugin-babel';

export default Object.assign({}, config, {
  plugins: [...config.plugins, babel({
    exclude: 'node_modules/**'
  })],
  moduleName: 'archeron',
  format: 'umd',
  dest: 'dist/acheron.js',
  globals: {
    xstream: 'Xstream'
  }
})
