import type { HTMLAttributes } from 'vue'

export {}

declare global {
  type StrBoolean = 'true' | 'false'

  type ClassProp = HTMLAttributes['class']
}
