<script setup lang="ts">
import type { CardProps, ModalProps } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    containerClass?: ClassProp
    title?: CardProps['title']
    segmented?: ModalProps['segmented']
    maskClosable?: ModalProps['maskClosable']
    escClosable?: ModalProps['closeOnEsc']
    onMaskClick?: ModalProps['onMaskClick']
    closable?: CardProps['closable']
    beforeClose?: () => boolean
  }>(),
  { closable: true, maskClosable: true, escClosable: true }
)
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:show', v: boolean): void
}>()
const show = defineModel<boolean>('show', { required: true })

function onClose() {
  if (props.beforeClose && !props.beforeClose()) {
    return false
  }
  emit('close')
  show.value = false
  return true
}

function hasSegmented() {
  if (props.segmented === undefined) return false
  if (typeof props.segmented === 'boolean') return props.segmented
  return !!props.segmented.content
}
</script>

<template>
  <NModal
    v-model:show="show"
    :mask-closable="maskClosable"
    :close-on-esc="escClosable"
    draggable
    @mask-click="maskClosable && onClose()"
    @esc="emit('close')"
  >
    <template #default="{ draggableClass }">
      <NCard
        class="max-w-[95vw] max-h-[90vh] mx-auto overflow-hidden"
        content-class="grid h-full overflow-hidden"
        :content-style="{ padding: 0, margin: 0 }"
        :class="containerClass"
        :closable="closable"
        :segmented="segmented"
        @close="onClose"
      >
        <template #header>
          <div :class="draggableClass">
            {{ title }}
          </div>
        </template>
        <template #header-extra>
          <slot name="header-extra" />
        </template>
        <NScrollbar
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left)',
            paddingTop: hasSegmented() ? 'var(--n-padding-top)' : '0'
          }"
        >
          <slot />
        </NScrollbar>
        <template #footer>
          <slot name="footer" />
        </template>
      </NCard>
    </template>
  </NModal>
</template>
