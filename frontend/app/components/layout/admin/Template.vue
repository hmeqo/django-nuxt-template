<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

withDefaults(
  defineProps<{
    title?: string
    menus?: MenuOption[]
    width?: number
  }>(),
  {
    title: '',
    menus: () => []
  }
)

const route = useRoute()

const collapsed = usePiniaCookie('menu-collapsed', { default: () => false })
const showDrawer = ref(false)

const menuValue = computed(() => {
  if (!route.meta.tags) return
  return route.meta.tags[0]
})
</script>

<template>
  <div class="fixed flex flex-col w-full h-full">
    <LayoutAdminTemplateHeader v-model:collapsed="collapsed" v-model:show-drawer="showDrawer" bordered />
    <NLayout has-sider>
      <NLayoutSider
        v-model:collapsed="collapsed"
        class="hidden sm:flex"
        collapse-mode="width"
        :width="width"
        :native-scrollbar="false"
        bordered
      >
        <NMenu :value="menuValue" :options="menus" />
        <NDrawer v-if="!responsive.small" v-model:show="showDrawer" placement="left" @click="showDrawer = false">
          <NMenu :value="route.path" :options="menus" />
        </NDrawer>
      </NLayoutSider>
      <NLayout content-class="flex flex-col w-full h-full">
        <NLayoutContent class="w-full h-full bg-transparent">
          <slot />
        </NLayoutContent>
      </NLayout>
    </NLayout>
  </div>
</template>
