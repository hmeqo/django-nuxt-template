<script setup lang="ts">
const { availableLocales, locale, setLocaleCookie } = useI18n()

watch(locale, (v) => {
  setLocaleCookie(v)
})
</script>

<template>
  <div>
    <NSelect v-model:value="locale" :options="availableLocales.map((x) => ({ label: $t(x), value: x }))" />
  </div>
</template>
