import eslint from 'rollup-plugin-eslint'

export default {
  entry: 'src/index.js',
  sourceMap: true,
  plugins: [eslint({
    throwError: true
  })],
  external: [
    'xstream'
  ]
}
