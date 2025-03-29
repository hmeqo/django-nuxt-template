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

const collapsed = ref(false)
const drawer = ref(false)
const fullscreen = ref(false)
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

const { send: logout } = useRequest(() => Auth.logout(), {
  immediate: false,
  middleware: dialogMiddleware(naiveDialogOptionPresets.logout)
}).onSuccess(() => {
  routerRedirect(HomeUrl)
})

function menuButton() {
  if (responsive.small) collapsed.value = !collapsed.value
  else drawer.value = !drawer.value
}

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value
  if (fullscreen.value) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}
</script>

<template>
  <NaiveConfigProvider class="fixed w-full h-full">
    <NLayout class="w-full h-full" has-sider>
      <NLayoutSider
        v-model:collapsed="collapsed"
        class="hidden sm:flex"
        collapse-mode="width"
        :width="width"
        :native-scrollbar="false"
        bordered
      >
        <NMenu :value="menuValue" :options="menuOptions" />
      </NLayoutSider>
      <NDrawer v-model:show="drawer" class="sm:hidden" placement="left" @click="drawer = false">
        <NMenu :value="route.path" :options="menuOptions" />
      </NDrawer>
      <NaiveConfigProvider class="grid rows-[auto_1fr] w-full h-full overflow-hidden">
        <NLayoutHeader class="flex gap-1 p-4" bordered>
          <NPopover trigger="hover" :disabled="!responsive.small">
            <template #trigger>
              <NButton :focusable="false" quaternary @click="menuButton">
                <template #icon>
                  <div class="i-material-symbols:lists" />
                </template>
              </NButton>
            </template>
            <div>菜单</div>
          </NPopover>
          <NPopover trigger="hover" :disabled="!responsive.small">
            <template #trigger>
              <NButton :focusable="false" quaternary @click="toggleFullscreen">
                <template #icon>
                  <div class="i-material-symbols:fullscreen-rounded" />
                </template>
              </NButton>
            </template>
            <div>全屏模式</div>
          </NPopover>
          <div class="mx-auto text-xl">{{ responsive.small ? route.meta.title : undefined }}</div>
          <NPopover trigger="hover" :disabled="!responsive.small">
            <template #trigger>
              <NButton :focusable="false" quaternary @click="navigateBack">
                <template #icon>
                  <div class="i-material-symbols:arrow-back-ios-new-rounded" />
                </template>
              </NButton>
            </template>
            <div>返回</div>
          </NPopover>
          <NPopover trigger="hover" :disabled="!responsive.small">
            <template #trigger>
              <NButton :focusable="false" quaternary @click="refreshPage">
                <template #icon>
                  <div class="i-material-symbols:refresh" />
                </template>
              </NButton>
            </template>
            <div>刷新页面</div>
          </NPopover>
          <NPopover trigger="hover" :disabled="!responsive.small">
            <template #trigger>
              <NaiveColorModeSwitch class="px-3.5 self-stretch justify-stretch" quaternary :text="false" />
            </template>
            <div>主题</div>
          </NPopover>
          <NPopover trigger="hover" :disabled="!responsive.small">
            <template #trigger>
              <NButton :focusable="false" quaternary @click="logout">
                <template #icon>
                  <div class="i-material-symbols:logout-rounded" />
                </template>
              </NButton>
            </template>
            <div>退出登录</div>
          </NPopover>
        </NLayoutHeader>
        <div class="grid rows-[auto_1fr] w-full h-full overflow-hidden">
          <NaivePageNavigator />
          <NLayoutContent>
            <slot />
          </NLayoutContent>
        </div>
      </NaiveConfigProvider>
    </NLayout>
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
