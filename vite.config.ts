import path from 'path'
import yn from 'yn'
import { globSync } from 'glob'
import { BuildEnvironmentOptions, defineConfig } from 'vite'
import VuePlugin from 'unplugin-vue/vite'
import UnoCSSPlugin from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'
import lodash from 'es-toolkit/compat'
import pkgInfo from './package.json'

const isCI = yn(process.env.CI, { default: false })
const appPath = path.resolve(__dirname, 'src')
const outPath = path.resolve(__dirname, 'dist')
const pagePaths = globSync('./*.html', { cwd: appPath, absolute: true })

const pagePathMap = Object.fromEntries(
  pagePaths.map((p) => [
    p.includes('pages') ? path.basename(path.dirname(p)) : path.basename(p, '.html'),
    p,
  ])
)

const genLayoutChunk = (languages: string[]) => {
  return Object.fromEntries(languages.map((lang) => {
    const key = `Layout-i18n-${lodash.kebabCase(lodash.toLower(lang))}-chunk`
    const value = [
      path.join(__dirname, `src/components/Header/i18n/${lang}.ts`),
      path.join(__dirname, `src/components/Footer/i18n/${lang}.ts`),
    ]
    return [key, value]
  }))
}

const getModuleVersion = (moduleName: string) => {
  const version = pkgInfo.dependencies[moduleName] || pkgInfo.devDependencies[moduleName]
  if (!version) {
    throw new Error(`Module ${moduleName} not found in package.json`)
  }
  return version.replace(/^[^0-9]*/, '')
}

const appendExternalModules = (rollupOption: Required<BuildEnvironmentOptions>['rollupOptions']) => {
  const externalModules = (rollupOption.external ?? []) as string[]
  rollupOption.output = lodash.castArray(rollupOption.output).map((output) => {
    Object.entries(output.paths ?? {}).forEach(([key, url]) => {
      if (!url) return
      if (!externalModules.includes(key)) {
        externalModules.push(key)
      }
      const listMap = Object.entries(output.manualChunks as Record<string, string[]> ?? {})
      output.manualChunks = Object.fromEntries(listMap.map(([chunkName, paths]) => [chunkName, lodash.pull(paths, key)]))
    })
    return output
  })
  if (externalModules.length) {
    rollupOption.external = externalModules
  }
  return rollupOption
}

export default defineConfig({
  root: appPath,
  build: {
    outDir: outPath,
    rollupOptions: appendExternalModules({
      input: pagePathMap,
      output: {
        manualChunks: {
          'hls-chunk': ['hls.js'],
          'vue-chunk': ['vue', '@vueuse/core', 'vue-router'],
          'i18n-chunk': [
            path.join(__dirname, 'src/scripts/useI18n.ts'),
            path.join(__dirname, 'src/scripts/useI18nAsync.ts'),
            path.join(__dirname, 'src/scripts/useI18nJSON.ts'),
            path.join(__dirname, 'src/scripts/useI18nJSONAsync.ts'),
          ],
          ...genLayoutChunk(['zh-cn', 'en-us', 'zh-hk']),
        },
        paths: {
          'hls.js': isCI ? `https://fastly.jsdelivr.net/npm/hls.js@${getModuleVersion('hls.js')}/dist/hls.mjs` : '',
        },
      },
    }),
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
