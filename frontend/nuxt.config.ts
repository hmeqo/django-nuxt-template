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
    '@workspace/app',
    '@workspace/backend',
    '@workspace/i18n',
    '@workspace/naive-ui',
    '@workspace/page-history',
    '@workspace/pwa',
    '@workspace/watermark',
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
    'nuxt-csurf',
    '@vueuse/nuxt'
  ],
  components: [
    { path: '@/components' },
    { path: '@/components/common' },
    { path: '@/components/template' },
    { path: '@/components/part' },
    { path: '@/components/form' }
  ],
  css: ['assets/css/main.css'],
  fonts: {
    families: [{ name: 'Outfit', provider: 'google', global: true }]
  },

  app: {
    // layoutTransition: { name: 'fade', mode: 'out-in' },
    // pageTransition: { name: 'fade', mode: 'out-in' },
    buildAssetsDir: 'static'
  },

  routeRules: {
    '/a/**': { prerender: false }
  },

  csurf: {
    https: false,
    cookieKey: 'csrftoken',
    headerName: 'X-Csrftoken',
    methodsToProtect: []
  },

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

  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ['/', '/login', '/sitemap.xml']
    }
  },

  vite: {
    cacheDir: '.vite'
  },

  build: {
    transpile: [...(process.env.NODE_ENV === 'production' ? ['vueuc', 'lodash'] : [])]
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
  },

  watch: ['packages']
})
