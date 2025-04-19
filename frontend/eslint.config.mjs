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
    'vue/require-default-prop': 'off',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  })
  .prepend({
    ignores: ['packages/backend/lib/sdk']
  })
