import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
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
        'node_modules/push-it-to-the-limit/dist/bundle.js': [ 'repeat', 'debounce' ]
      }
    }),
    uglify()
  ],
  external: ['fs']
}
