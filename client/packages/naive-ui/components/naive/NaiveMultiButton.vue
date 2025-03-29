<script setup lang="ts">
import type { ButtonProps } from 'naive-ui'
import type { RouteLocationRaw } from 'vue-router'

type BtnProps = {
  to?: RouteLocationRaw
  show?: boolean
  class?: string | Record<string, unknown>
  type?: ButtonProps['type']
  size?: ButtonProps['size']
  text?: string
  onclick?: (e: MouseEvent) => void
}

defineProps<{
  buttons: BtnProps[]
}>()
</script>

<template>
  <NFlex size="small">
    <div v-for="(i, index) in buttons" :key="index">
      <NuxtLink :to="i.to" @click="i.onclick">
        <NButton v-show="i.show === undefined ? true : i.show" :class="i.class" :type="i.type" size="small" secondary>
          {{ i.text }}
        </NButton>
      </NuxtLink>
    </div>
  </NFlex>
</template>
