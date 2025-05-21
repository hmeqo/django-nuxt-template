import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from '@nuxtjs/i18n'

export default defineNuxtModule({
  meta: {
    name: '@workspace/i18n'
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.i18n = defu(nuxt.options.i18n, <ModuleOptions>{
      locales: ['en', 'zh-CN'],
      defaultLocale: 'zh-CN',
      strategy: 'no_prefix',
      detectBrowserLanguage: {
        useCookie: false
      },
      bundle: {
        optimizeTranslationDirective: false
      },
      lazy: true,

      langDir: resolver.resolve('./locales'),
      vueI18n: resolver.resolve('./i18n.config.ts')
    })

    await installModule('@nuxtjs/i18n')

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add composables
    addImportsDir(resolver.resolve('./composables'))

    // Add composables
    addImportsDir(resolver.resolve('./utils'))
  }
})
