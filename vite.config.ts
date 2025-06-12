import path from 'path'
import { globSync } from 'glob'
import { defineConfig } from 'vite'
import VuePlugin from 'unplugin-vue/vite'
import UnoCSSPlugin from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'

const appPath = path.resolve(__dirname, 'src')
const outPath = path.resolve(__dirname, 'dist')
const pagePaths = globSync('./*.html', { cwd: appPath, absolute: true })

const pagePathMap = Object.fromEntries(
  pagePaths.map((p) => [
    p.includes('pages') ? path.basename(path.dirname(p)) : path.basename(p, '.html'),
    p,
  ])
)

export default defineConfig({
  root: appPath,
  build: {
    outDir: outPath,
    rollupOptions: {
      input: pagePathMap,
      output: {
        manualChunks: {
          'vue': ['vue', '@vueuse/core', 'vue-router'],
        },
      },
    },
  },
  plugins: [
    VuePlugin({
      isProduction: true,
    }),
    UnoCSSPlugin({
      mode: 'vue-scoped',
      presets: [
        presetAttributify(),
        presetWind3(),
        presetIcons({
          cdn: 'https://esm.sh/'
        }),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      shortcuts: {
        'flex-row-nowrap': 'flex flex-row flex-nowrap',
        'flex-col-nowrap': 'flex flex-col flex-nowrap',
        'flex-row-wrap': 'flex flex-row flex-wrap',
        'flex-col-wrap': 'flex flex-col flex-wrap',
        'bg-active': 'bg-orange-500',
        'bg-hover': 'bg-orange-500/95',
        'text-active': 'text-orange-500',
        'text-hover': 'text-orange-100',
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls'],
      }
    },
  },
})
