export {}

declare module 'vue-router' {
  interface PageMeta {
    title?: string
    tags?: string[]
    icon?: string
  }
}
