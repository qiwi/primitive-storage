import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/main/js/index.js',
  output: {
    file: 'target/es5/bundle.js',
    format: 'umd',
    name: 'primitive-storage'
  },
  plugins: [
    flow(),
    resolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    commonjs({
      namedExports: {
        'node_modules/push-it-to-the-limit/dist/bundle.es5.js': [ 'repeat', 'debounce' ]
      }
    })
  ],
  external: ['fs']
}
