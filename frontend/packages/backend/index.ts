import { addComponentsDir, addImports, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@workspace/backend'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add composables
    addImportsDir(resolver.resolve('./composables'))

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
