import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    flow(),
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    uglify()
  ],
  external: ['fs']
}
