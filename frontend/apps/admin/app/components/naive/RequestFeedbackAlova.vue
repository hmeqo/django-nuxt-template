<script setup lang="ts">
import type { Event } from '@workspace/alova/lib/core'
import {
  RequestErrorEvent,
  RequestInternetErrorEvent,
  RequestStartEvent,
  RequestSuccessEvent,
  subscribe,
  unsubscribe
} from '@workspace/alova/lib/core'

const { loadingBar, message, notification } = useNaiveApi()

function onRequestStart(e: RequestStartEvent) {
  if (e.method.type === 'GET') return
  const noMessage = e.method?.meta?.noMessage
  if (!noMessage) {
    loadingBar.start()
  }
}

function onRequestSuccess(e: RequestSuccessEvent) {
  if (e.method.type === 'GET') return
  const noMessage = e.method?.meta?.noMessage
  if (!noMessage) {
    message.success(`${$t(i18nKeys.operation_succeeds)}`)
    loadingBar.finish()
  }
}

function onRequestError(e: RequestErrorEvent) {
  const noMessage = e.method?.meta?.noMessage
  if (!noMessage) {
    notification.error({
      title: `${$t(i18nKeys.status_code)}: ${e.response.status}`,
      content: `${$t(i18nKeys.detail_message)}: ${e.error ? JSON.stringify(e.error.detail) : $t(i18nKeys.error_occurred)}`,
      duration: 5000,
      keepAliveOnHover: true
    })
  }
  loadingBar.error()
}

function onRequestInternetError(e: Event) {
  message.error($t(i18nKeys.network_error))
  loadingBar.error()
}

onMounted(() => {
  subscribe(RequestStartEvent.name, onRequestStart)
  subscribe(RequestSuccessEvent.name, onRequestSuccess)
  subscribe(RequestErrorEvent.name, onRequestError)
  subscribe(RequestInternetErrorEvent.name, onRequestInternetError)
})

onUnmounted(() => {
  unsubscribe(RequestStartEvent.name, onRequestStart)
  unsubscribe(RequestSuccessEvent.name, onRequestSuccess)
  unsubscribe(RequestErrorEvent.name, onRequestError)
  unsubscribe(RequestInternetErrorEvent.name, onRequestInternetError)
})
</script>

<template>
  <slot />
</template>
