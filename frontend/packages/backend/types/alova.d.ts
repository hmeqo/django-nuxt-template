import type { AlovaCustomTypeMeta } from '@workspace-hmeqo/backend/types'

declare module '@workspace-hmeqo/backend/types' {
  export interface AlovaCustomTypeMeta {
    noMessage?: boolean
  }
}
