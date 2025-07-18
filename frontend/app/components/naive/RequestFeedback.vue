<script setup lang="ts">
import {
  type Event,
  RequestErrorEvent,
  RequestInternetErrorEvent,
  RequestStartEvent,
  RequestSuccessEvent,
  subscribe,
  unsubscribe
} from '@workspace/backend/lib/core'

const { loadingBar, message, notification } = useNaiveApi()

function onRequestStart(e: RequestStartEvent) {
  loadingBar.start()
}

function onRequestSuccess(e: RequestSuccessEvent) {
  message.success(`${$t(i18nKeys.operation_succeeds)}`)
  loadingBar.finish()
}

function onRequestError(e: RequestErrorEvent) {
  notification.error({
    title: isTauri ? `${$t(i18nKeys.error_occurred)}` : `${$t(i18nKeys.status_code)}: ${e.status}`,
    content: `${$t(i18nKeys.detail_message)}: ${JSON.stringify(e.detail)}`,
    duration: 5000,
    keepAliveOnHover: true
  })
  loadingBar.error()
}

function onRequestInternetError(e: Event) {
  message.error($t(i18nKeys.network_error))
  loadingBar.finish()
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
