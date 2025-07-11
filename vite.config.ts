import path from 'path'
import yn from 'yn'
import { BuildEnvironmentOptions, defineConfig } from 'vite'
import VuePlugin from 'unplugin-vue/vite'
import UnoCSSPlugin from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'
import lodash from 'es-toolkit/compat'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'
import PugPlugin from 'vite-plugin-pug'
import * as cheerio from 'cheerio'
// @ts-ignore
import pkgInfo from './package.json'
import { PLATFORM } from './src/pages/Solution/constant'

const isCI = yn(process.env.CI, { default: false })
const appPath = path.resolve(__dirname, 'src')
const outPath = path.resolve(__dirname, 'dist')

const pages = [
  ...[
    'index',
    'home',
    'cdn_p2p',
    'pcdn',
    'solution',
    'about',
  ],
  ...[
    'index-en',
    'index-cn',
  ],
  ...Object.keys(PLATFORM)
    .map((platform) => ({ name: platform, filename: `solution/${platform}.html` })),
]
  .map((item) => typeof item === 'string' ? { name: item } : item)
  .map((item) => ({ ...item, entry: path.resolve(__dirname, 'src/scripts/index.ts') }))

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

const getDemoLinks = async () => {
  const targetDomain = 'https://demo.swarmcloud.net'
  const parseUrl = (urlPath?: string) => {
    if (!urlPath) return ''
    const url = new URL(urlPath, targetDomain)
    url.protocol
    return url.href.replace(url.protocol, '')
  }
  const $ = await cheerio.fromURL(targetDomain)

  const links = $('link[href]')
    .filter((_, el) => {
      const el$ = $(el)
      const href = el$.attr('href')
      if (!href) return false
      if (el$.attr('rel') === 'icon') return false
      if (/^(\w+:)?\/\//.test(href)) return false
      return true
    })
    .map((_, el) => ({ href: parseUrl($(el).attr('href')), ref: $(el).prop('rel'), as: $(el).attr('as') }))
  const scripts = $('body > script[src]')
    .map((_, el) => ({ src: parseUrl($(el).attr('src')) }))

  return { links: Array.from(links), scripts: Array.from(scripts) }
}

export default defineConfig(async () => {
  const { links, scripts } = await getDemoLinks()
  console.log(links, scripts)
  return {
    root: appPath,
    build: {
      outDir: outPath,
      rollupOptions: appendExternalModules({
        input: path.resolve(__dirname, 'src/demo.html'),
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
      PugPlugin(void 0, { links, scripts }),
      createMpaPlugin({
        template: path.resolve(__dirname, 'src/index.html') as any,
        pages: pages as any[],
      }) as any,
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
          'bg-odd': 'bg-[#11191c]',
          'bg-even': 'bg-[#323131]',
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
  }
})
