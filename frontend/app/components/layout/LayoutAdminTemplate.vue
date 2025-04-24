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

const configStore = useConfigStore()

const route = useRoute()
const darkMode = useNaiveDarkMode()

const collapsed = computed({
  get: () => configStore.cache.menuCollapsed ?? false,
  set: (v) => {
    configStore.cache.menuCollapsed = v
  }
})
const showDrawer = ref(false)

const menuValue = computed(() => {
  if (!route.meta.tags) return
  return route.meta.tags[0]
})
</script>

<template>
  <NaiveConfigProvider class="fixed flex flex-col w-full h-full">
    <NaiveProviderBundle>
      <NaiveRequestFeedback />
      <LayoutAdminTemplateHeader v-model:collapsed="collapsed" v-model:show-drawer="showDrawer" />
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
        <NLayout content-class="flex flex-col w-full h-full" :theme-overrides="darkMode ? {} : { color: '#f3f4f6' }">
          <NaivePageNavigator v-if="!isAppMode" class="shrink-0" />
          <NLayoutContent class="w-full h-full bg-transparent">
            <slot />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NaiveProviderBundle>
  </NaiveConfigProvider>
</template>
