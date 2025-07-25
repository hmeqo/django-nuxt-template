// https://nuxt.com/docs/api/configuration/nuxt-config
import { existsSync } from 'fs'
import { resolve } from 'path'

const sslKeyPath = resolve('./localhost-key.pem')
const sslCertPath = resolve('./localhost.pem')
const hasSSLFiles = existsSync(sslKeyPath) && existsSync(sslCertPath)

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
      cors: false
    }
  },

  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ...(hasSSLFiles &&
    process.env.SSL === 'true' && {
      devServer: {
        https: {
          key: sslKeyPath,
          cert: sslCertPath
        }
      }
    }),

  modules: [
    '@workspace-hmeqo/i18n',
    '@workspace-hmeqo/common',
    '@workspace-hmeqo/backend',
    '@workspace-hmeqo/naive-ui',
    '@workspace-hmeqo/pwa',
    '@workspace-hmeqo/unocss',
    '@workspace/backend',
    '@workspace/tauri'
  ],
  components: [
    { path: '~/components' },
    { path: '~/components/common' },
    { path: '~/components/template' },
    { path: '~/components/part' },
    { path: '~/components/form' }
  ],
  css: ['~/assets/css/main.css'],

  app: {
    // layoutTransition: { name: 'fade', mode: 'out-in' },
    // pageTransition: { name: 'fade', mode: 'out-in' },
    buildAssetsDir: 'static',
    rootAttrs: {
      id: 'root'
    }
  },

  routeRules: {
    '/**': {
      // cache: {
      //   swr: true,
      //   maxAge: 60
      // }
    }
  },

  site: {
    url: 'https://example.com',
    indexable: false
  },
  seo: {
    meta: {
      description: 'Django Nuxt Template'
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

  pwa: {
    manifest: {
      name: 'Django Nuxt Template',
      short_name: 'Django Nuxt Template',
      theme_color: '#0a0a0a',
      description: 'Django Nuxt Template'
    }
  },
  colorMode: {
    preference: 'dark'
  },
  i18n: {
    locales: [
      {
        code: 'zh-Hans',
        language: 'zh-Hans'
      },
      {
        code: 'en',
        language: 'en'
      }
    ],
    defaultLocale: 'zh-Hans'
  },

  vite: {
    build: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  },
  build: {
    transpile: [...(process.env.NODE_ENV === 'production' ? ['lodash'] : [])]
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true
      }
    }
  },

  watch: ['./packages/*', './package/core/*']
})
