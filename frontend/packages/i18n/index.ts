import { addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from 'nuxt-i18n-micro'

export default defineNuxtModule({
  meta: {
    name: '@workspace/i18n'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.i18n = defu(nuxt.options.i18n, <ModuleOptions>{
      strategy: 'no_prefix',
      locales: [
        { code: 'en', iso: 'en-US', dir: 'ltr' },
        { code: 'zh', iso: 'zh-Hans', dir: 'ltr' }
      ],
      autoDetectLanguage: true,
      localeCookie: 'language',
      translationDir: 'packages/i18n/locales',
      meta: true
    })

    installModule('nuxt-i18n-micro')

    // Add utils
    addImportsDir(resolver.resolve('./utils'))
  }
})
