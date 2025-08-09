import { addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: '@workspace/backend'
  },

  hooks: {
    'prepare:types': ({ references }) => {
      references.push({
        types: '@workspace/backend/types'
      })
    }
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Pass module options to runtimeConfig object
    // @ts-expect-error unknown type
    nuxt.options.csurf = defu(nuxt.options.csurf, {
      https: false,
      cookieKey: 'csrftoken',
      headerName: 'X-Csrftoken',
      methodsToProtect: []
    })

    await installModule('nuxt-csurf')

    // Add stores
    addImportsDir(resolver.resolve('./stores'))

    addImportsDir([
      resolver.resolve('./lib/sdk/models'),
      resolver.resolve('./lib/sdk/schemas'),
      resolver.resolve('./lib/sdk/services'),
      resolver.resolve('./lib/sdk-extra'),
      resolver.resolve('./lib/models'),
      resolver.resolve('./lib/choices'),
      resolver.resolve('./lib/services'),
      resolver.resolve('./lib/permissions')
    ])
  }
})
