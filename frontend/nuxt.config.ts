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
    '@workspace/i18n',
    '@workspace/common',
    '@workspace/app',
    '@workspace/backend',
    '@workspace/naive-ui',
    '@workspace/pwa',
    '@workspace/unocss',
    '@unocss/nuxt'
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

  // ssr: false,
  routeRules: {},

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
