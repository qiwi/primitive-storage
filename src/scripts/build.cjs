#!/usr/bin/env node

const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const esmConfig = {
  entryPoints: ['./src/main/ts/index.ts'],
  outdir: './target/esm',
  bundle: true,
  minify: true,
  sourcemap: true,
  sourcesContent: false,
  platform: 'node',
  target: 'esnext',
  format: 'esm',
  outExtension: {
    '.js': '.mjs'
  },
  packages: 'external',
  external: ['node:*'],               // https://github.com/evanw/esbuild/issues/1466
  plugins: [nodeExternalsPlugin()],   // https://github.com/evanw/esbuild/issues/619
  tsconfig: './tsconfig.json'
}

const cjsConfig = {
  ...esmConfig,
  outdir: './target/cjs',
  format: 'cjs',
  outExtension: {
    '.js': '.cjs'
  }
}

const config = process.argv.includes('--cjs')
  ? cjsConfig
  : esmConfig

esbuild
  .build(config)
  .catch(() => process.exit(1))
