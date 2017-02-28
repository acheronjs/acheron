let babel = require('rollup-plugin-babel')
let nodeResolve = require('rollup-plugin-node-resolve')
let commonjs = require('rollup-plugin-commonjs')
let nodeBuiltins = require('rollup-plugin-node-builtins')
let nodeGlobals = require('rollup-plugin-node-globals')
let alias = require('rollup-plugin-alias')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'src/**/*.js', included: false },
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': ['rollup'],
      'test/**/*.js': ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        nodeGlobals(),
        nodeBuiltins(),
        alias({
          resolve: ['.js'],
          acheron: './../src/index'
        }),
        nodeResolve({jsnext: true, main: true}),
        commonjs(),
        babel({
          exclude: 'node_modules/**'
        })
      ],
      external: {
        acheron: './src/index.js'
      },
      moduleName: 'acheron',
      format: 'iife',
      sourceMap: 'inline'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      reporters: [
        {type: 'html', subdir: 'html'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
