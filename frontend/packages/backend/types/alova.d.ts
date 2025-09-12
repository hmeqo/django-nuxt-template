import type { AlovaCustomTypeMeta } from '@workspace-hmeqo/alova/types'

declare module '@workspace-hmeqo/alova/types' {
  export interface AlovaCustomTypeMeta {
    noMessage?: boolean
  }
}
