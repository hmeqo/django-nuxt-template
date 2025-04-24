import { addComponentsDir, addImports, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: '@workspace/backend'
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

    // Add stores
    addImportsDir(resolver.resolve('./stores'))

    // Add utils
    addImportsDir(resolver.resolve('./utils'))

    addImports({
      name: 'Branch',
      from: '@hmeqo/easymodel',
      type: true
    })

    addImportsDir([
      resolver.resolve('./lib/sdk/models'),
      resolver.resolve('./lib/sdk/schemas'),
      resolver.resolve('./lib/sdk/services'),
      resolver.resolve('./lib/auto-imports')
    ])
  }
})
