import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@workspace/naive-ui',
    configKey: 'naiveUi'
  },

  defaults: {
    // defaultColorMode: 'light',
    colorModePreference: 'system',
    colorModePreferenceCookieName: 'color-mode'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // installModule('nuxtjs-naive-ui')
    // installNaiveUiAutoImport(options, nuxt)

    installModule('@bg-dev/nuxt-naiveui')

    // Pass module options to runtimeConfig object
    // @ts-expect-error icon size can be number or string
    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      naiveUi: options,
      naiveui: defu(nuxt.options.runtimeConfig.public.naiveui, options),
      colorMode: {
        storageKey: options.colorModePreferenceCookieName
      }
    })

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add composables
    addImportsDir(resolver.resolve('./composables'))

    // Add plugins
    // addPlugin(resolver.resolve('./plugins/naiveUiColorMode'))

    // Add utils
    addImportsDir(resolver.resolve('./utils'))

    // Add stores
    addImportsDir(resolver.resolve('./stores'))
  }
})
