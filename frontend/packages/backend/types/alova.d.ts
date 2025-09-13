import type { AlovaCustomTypeMeta } from '@workspace/alova/types'

declare module '@workspace/alova/types' {
  export interface AlovaCustomTypeMeta {
    noMessage?: boolean
  }
}
