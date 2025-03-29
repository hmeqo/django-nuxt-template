import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@workspace/i18n'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    installModule('@nuxtjs/i18n')

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
