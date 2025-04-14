<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

const props = withDefaults(
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
const darkMode = useNaiveDarkMode()

const collapsed = ref(false)
const showDrawer = ref(false)

const menuOptions = computed((): MenuOption[] => [
  {
    label: renderLink(props.title, Urls.index),
    key: '',
    icon: renderIcon({
      type: 'img',
      attr: { class: 'w-full h-full object-contain rounded-1 p-[1px]', src: '/favicon.ico' }
    }),
    props: { style: { color: '#ff0' } }
  },
  ...props.menus
])
const menuValue = computed(() => {
  if (!route.meta.tags) return
  return route.meta.tags[0]
})
</script>

<template>
  <NaiveConfigProvider class="fixed flex flex-col w-full h-full">
    <NGlobalStyle />
    <NaiveProviderBundle>
      <NaiveRequestFeedback />
      <LayoutAdminTemplateHeader v-model:collapsed="collapsed" v-model:show-drawer="showDrawer" class="shrink-0" />
      <NLayout has-sider>
        <NLayoutSider
          v-model:collapsed="collapsed"
          class="hidden sm:flex"
          collapse-mode="width"
          :width="width"
          :native-scrollbar="false"
          bordered
        >
          <NMenu :value="menuValue" :options="menuOptions" />
          <NDrawer v-if="!responsive.small" v-model:show="showDrawer" placement="left" @click="showDrawer = false">
            <NMenu :value="route.path" :options="menuOptions" />
          </NDrawer>
        </NLayoutSider>
        <NLayout
          content-class="flex flex-col w-full h-full overflow-hidden"
          :theme-overrides="darkMode ? {} : { color: '#f3f4f6' }"
        >
          <NaivePageNavigator class="shrink-0" />
          <NLayoutContent class="w-full h-full bg-transparent">
            <slot />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NaiveProviderBundle>
  </NaiveConfigProvider>
</template>

<style>
.n-menu > div:first-child > div:first-child::before {
  display: none;
}

.n-menu {
  user-select: none;
}
</style>
