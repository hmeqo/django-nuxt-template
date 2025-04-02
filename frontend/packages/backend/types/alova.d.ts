import type { ModelType } from '@hmeqo/easymodel'

export interface AlovaCustomTypeMeta {
  model?: ModelType
  multipart?: boolean
}

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: AlovaCustomTypeMeta
  }
}
