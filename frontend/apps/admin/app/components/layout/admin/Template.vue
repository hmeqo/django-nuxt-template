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
  <main class="fixed flex flex-col w-full h-full">
    <NLayout has-sider>
      <NaiveConfigProvider force-color-mode="dark">
        <NLayoutSider
          v-model:collapsed="collapsed"
          class="hidden sm:flex h-full"
          collapse-mode="width"
          :width="width"
          :native-scrollbar="false"
          bordered
        >
          <NMenu :value="menuValue" :options="menus" default-expand-all />
        </NLayoutSider>
        <Teleport to="#teleports">
          <NDrawer v-model:show="showDrawer" placement="left" :default-expand-all="true" @click="showDrawer = false">
            <NMenu :value="route.path" :options="menus" default-expand-all />
          </NDrawer>
        </Teleport>
      </NaiveConfigProvider>
      <NLayout content-class="flex flex-col w-full h-full">
        <LayoutAdminTemplateHeader v-model:collapsed="collapsed" v-model:show-drawer="showDrawer" bordered />
        <NLayoutContent class="w-full h-full">
          <slot />
        </NLayoutContent>
      </NLayout>
    </NLayout>
  </main>
</template>
