import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@workspace/vuetify'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    installModule('vuetify-nuxt-module')

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })
  }
})
