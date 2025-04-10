<script setup lang="ts">
withDefaults(
  defineProps<{
    loadingBarProps?: { navigation?: boolean }
  }>(),
  {
    loadingBarProps: () => ({})
  }
)
</script>

<template>
  <NLoadingBarProvider>
    <NaiveLoadingBar :navigation="loadingBarProps.navigation" />
    <NNotificationProvider>
      <NaiveNotification />
      <NMessageProvider>
        <NDialogProvider>
          <NModalProvider>
            <slot />
          </NModalProvider>
        </NDialogProvider>
      </NMessageProvider>
    </NNotificationProvider>
  </NLoadingBarProvider>
</template>
