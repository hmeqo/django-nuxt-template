import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt()
  .overrideRules({
    'vue/multi-word-component-names': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false
      }
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/require-default-prop': 'off'
  })
  .prepend({
    ignores: ['packages/backend/lib/sdk']
  })
