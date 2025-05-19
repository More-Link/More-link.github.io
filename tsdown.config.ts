import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: ['./src/nav.ts'],
  format: 'iife',
  target: ['chrome100', 'safari18', 'firefox110'],
  clean: false,
  outDir: 'dist/scripts',
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
