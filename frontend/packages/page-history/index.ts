import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@workspace/path-history'
  },

  hooks: {
    'prepare:types': ({ references }) => {
      references.push({
        types: '@workspace/page-history/types'
      })
    }
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add plugin
    addPlugin({
      src: resolver.resolve('./plugins/history.ts')
    })

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add imports
    addImportsDir(resolver.resolve('./composables'))
  }
})
