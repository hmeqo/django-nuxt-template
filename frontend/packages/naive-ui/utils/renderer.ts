import { NuxtLink } from '#components'
import { NIcon } from 'naive-ui'
import type { VNodeProps } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export function renderAction(text: string, onclick: () => void) {
  return () => h('a', { onclick }, text)
}

export function renderIcon(data: {
  type?: unknown
  content?: string | VNode
  attr?: VNodeProps & Record<string, unknown>
}) {
  return () =>
    h(data.type || NIcon, data.attr, {
      default: () => data.content
    })
}

export function renderLink(text: string, url: RouteLocationRaw, attr?: VNodeProps & Record<string, unknown>) {
  return () =>
    h(
      NuxtLink,
      {
        ...attr,
        to: url,
        onClick: (e: Event) => {
          ;(e.target as HTMLAnchorElement)?.blur()
        },
        draggable: false
      },
      () => text
    )
}
