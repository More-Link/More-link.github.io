import path from 'path'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import yn from 'yn'
import { globSync } from 'glob'
import { BuildEnvironmentOptions, defineConfig } from 'vite'
import VuePlugin from 'unplugin-vue/vite'
import UnoCSSPlugin from 'unocss/vite'
import { presetAttributify, presetIcons, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'
import lodash from 'es-toolkit/compat'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'
import PugPlugin from 'vite-plugin-pug'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
// @ts-ignore
import pkgInfo from './package.json'
import { PLATFORM } from './src/pages/Solution/constant'
import { supportedLangs} from './src/scripts/constant/SupportedLang'

const isCI = yn(process.env.CI, { default: false })
const appPath = path.resolve(__dirname, 'src')
const outPath = path.resolve(__dirname, 'dist')

const streamPipeline = promisify(pipeline);

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

const genLayoutChunk = () => {
  const i18nFilePaths = globSync('src/components/{Header,Footer}/i18n/*.*.ts', { cwd: __dirname })
  const i18nFilePathMap = lodash.groupBy(i18nFilePaths, (filepath) => filepath.split('.').reverse()[1])
  return Object.fromEntries(
    supportedLangs
      .filter((lang) => i18nFilePathMap[lang])
      .map((lang) => {
        const key = `Layout-i18n-${lodash.kebabCase(lodash.toLower(lang))}-chunk`
        const value = i18nFilePathMap[lang].map((p) => path.join(__dirname, p))
        return [key, value]
      })
)
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
  const realUrl = (urlPath?: string) => {
    if (!urlPath) return ''
    const url = new URL(urlPath, targetDomain)
    url.protocol
    return url.href
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
    .map((_, el) => ({
      href: realUrl($(el).attr('href')), rel: $(el).prop('rel'), as: $(el).attr('as')
    }))
  const scripts = $('body > script[src]')
    .map((_, el) => ({ src: realUrl($(el).attr('src')) }))

  return {
    links: await downloadExtFiles(Array.from(links), 'href'),
    scripts: await downloadExtFiles(Array.from(scripts), 'src'),
  }
}

async function downloadExtFiles <T>(list: T[], key: keyof T & string) {
  for (let linkObj of list) {
    const url = linkObj[key] as string
    const targetFilepath = path.resolve(outPath, 'assets/demo/', path.basename(url))
    const relativeTargetFilepath = path.relative(outPath, targetFilepath)
    console.info(`Download ${url} to ${relativeTargetFilepath} ...`)
    const response = await fetch(url)
    console.info(`Download ${url} to ${relativeTargetFilepath} ... Done`)
    fs.mkdirSync(path.dirname(targetFilepath), { recursive: true })
    await streamPipeline(
      response.body as any,
      fs.createWriteStream(targetFilepath),
    )
    linkObj = Object.assign(linkObj, {
      [`raw${lodash.upperFirst(key)}`]: url,
      [key]: relativeTargetFilepath,
    })
  }
  return list
}

export default defineConfig(async () => {
  const { links, scripts } = await getDemoLinks()
  console.info('links', links)
  console.info('scripts', scripts)

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
            ...genLayoutChunk(),
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
