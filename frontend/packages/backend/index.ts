import { addComponentsDir, addImports, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: '@workspace/backend'
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Pass module options to runtimeConfig object
    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      backend: options
    })
    nuxt.options.csurf = defu(nuxt.options.csurf, {
      https: false,
      cookieKey: 'csrftoken',
      headerName: 'X-Csrftoken',
      methodsToProtect: []
    })

    await installModule('nuxt-csurf')

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
