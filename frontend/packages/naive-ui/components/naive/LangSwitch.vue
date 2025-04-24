<script setup lang="ts">
const { switchLocale, getLocale, getLocales } = useI18n()

function updateLocale(locale: string) {
  switchLocale(locale)
}
</script>

<template>
  <div>
    <NSelect
      :options="getLocales().map((x) => ({ label: $t(x.iso!), value: x.code! }))"
      :value="getLocale()"
      @update:value="updateLocale"
    />
  </div>
</template>
