import eslint from 'rollup-plugin-eslint'

export default {
  entry: 'acheron.js',
  sourceMap: true,
  plugins: [eslint({
    throwError: true
  })],
  external: [
    'xstream'
  ]
}
