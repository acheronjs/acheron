import config from './rollup.base';

export default Object.assign({}, config, {
  format: 'es',
  dest: 'dist/es.acheron.js'
})
