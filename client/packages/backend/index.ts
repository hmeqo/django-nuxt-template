import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@workspace/backend',
    configKey: 'backend'
  },

  defaults: {
    alovaBaseUrl: '/api'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Pass module options to runtimeConfig object
    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      backend: options
    })

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add composables
    addImportsDir(resolver.resolve('./composables'))

    // Add utils
    addImportsDir(resolver.resolve('./utils'))

    addPlugin(resolver.resolve('./plugins/backend.ts'))
  }
})
