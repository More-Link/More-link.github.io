import SUPPORTED_LANG from "../../../scripts/constant/SupportedLang"

export const commonI18nMap = {
  [SUPPORTED_LANG.ZH_HANS]: {
    full: '简体中文',
    shore: '简',
    nav: {
      home: '首页',
      cdn_p2p: 'CDN+P2P',
      pcdn: 'PCDN',
      solution: '解决方案',
      about: '公司介绍',
    },
  },
  [SUPPORTED_LANG.ZH_HANT]: {
    full: '繁體中文',
    shore: '繁',
    nav: {
      home: '首頁',
      cdn_p2p: 'CDN+P2P',
      pcdn: 'PCDN',
      solution: '解決方案',
      about: '公司介紹',
    },
  },
  [SUPPORTED_LANG.EN_US]: {
    full: 'English',
    shore: 'EN',
    nav: {
      home: 'HOME',
      cdn_p2p: 'CDN+P2P',
      pcdn: 'PCDN',
      solution: 'SOLUTION',
      about: 'COMPANY',
    },
  },
  [SUPPORTED_LANG.JA_JP]: {
    full: '日本語',
    shore: 'JA',
    nav: {
      home: 'ホーム',
      cdn_p2p: 'CDN+P2P',
      pcdn: 'PCDN',
      solution: 'ソリューション',
      about: '会社概要',
    },
  },
} as const
