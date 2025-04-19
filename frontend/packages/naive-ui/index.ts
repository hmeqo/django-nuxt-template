import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@workspace/naive-ui'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    installModule('@bg-dev/nuxt-naiveui')

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add composables
    addImportsDir(resolver.resolve('./composables'))

    // Add utils
    addImportsDir(resolver.resolve('./utils'))

    // Add stores
    addImportsDir(resolver.resolve('./stores'))
  }
})
