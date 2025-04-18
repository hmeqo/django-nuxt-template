// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000'
    }
  },
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@unocss/nuxt',
    '@hmeqo/nuxt-web-kit',
    '@nuxtjs/seo',
    'nuxt-og-image',
    'nuxt-csurf',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@workspace/backend',
    '@workspace/i18n',
    '@workspace/naive-ui',
    '@workspace/page-history',
    '@workspace/watermark'
  ],
  components: [
    { path: '@/components' },
    { path: '@/components/common' },
    { path: '@/components/template' },
    { path: '@/components/part' },
    { path: '@/components/form' }
  ],
  css: ['assets/css/main.css'],

  site: {
    url: 'https://example.cn'
  },
  seo: {
    meta: {
      description: 'lorem'
    }
  },
  sitemap: {
    exclude: ['/a/**']
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Django Nuxt Template',
      short_name: 'Django Nuxt Template',
      theme_color: '#18181c',
      description: 'Django Nuxt Template',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      display: 'standalone'
    },
    registerWebManifestInRouteRules: false,
    devOptions: {
      enabled: false,
      type: 'module'
    }
  },

  app: {
    layoutTransition: { name: 'loading', mode: 'out-in' },
    pageTransition: { name: 'loading', mode: 'out-in' },
    buildAssetsDir: 'static'
  },

  // Official naive-ui nuxt not support ssr
  ssr: false,
  routeRules: {
    '/a/**': { ssr: false }
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ['/', '/sitemap.xml']
    }
  },

  csurf: {
    https: false,
    cookieKey: 'csrftoken',
    headerName: 'X-Csrftoken',
    methodsToProtect: []
  },

  build: { transpile: process.env.NODE_ENV === 'production' ? ['vueuc', 'lodash'] : [] },

  colorMode: {
    // storage: 'cookie',
    storageKey: 'color-mode',
    classSuffix: ''
  },

  naiveui: {
    themeConfig: {
      shared: {
        common: {
          primaryColor: '#2080f0',
          primaryColorHover: '#4098fc',
          primaryColorPressed: '#1060c9',
          primaryColorSuppl: '#4098fc'
        },
        Checkbox: {
          textColorDisabled: 'black',
          checkMarkColorDisabled: 'black',
          checkMarkColorDisabledChecked: 'black'
        }
      }
    }
  },

  i18n: {
    locales: ['en-US', 'zh-Hans'],
    strategy: 'no_prefix',
    // defaultLocale: 'zh-Hans',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@': ['.'],
          '@/*': ['./*'],
          '@@': ['..'],
          '@@/*': ['../*'],
          '#components': ['./components']
        },
        experimentalDecorators: true,
        emitDecoratorMetadata: true
      }
    }
  }
})
