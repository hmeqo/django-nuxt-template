<script setup lang="ts">
import type { DropdownOption, MenuOption } from 'naive-ui'

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

const { user } = useLoginState()

const { send: logout } = useRequest(() => Auth.logout(), {
  immediate: false,
  middleware: dialogMiddleware(naiveDialogOptionPresets.logout)
}).onSuccess(() => {
  routerRedirect(HomeUrl)
})

const collapsed = ref(false)
const drawer = ref(false)
const resetPasswordVisible = ref(false)

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

const userMenuOptions = computed((): DropdownOption[] => [
  {
    type: 'render',
    key: 'user-info',
    render: () =>
      h('div', { class: 'flex gap-2 px-2 py-1' }, [
        h('div', { class: 'i-ic:baseline-account-circle text-4xl' }),
        h(
          'div',
          { class: 'flex-1 min-w-0' },
          user.value?.display_name
            ? [
                h(
                  'div',
                  {
                    class: 'truncate',
                    title: user.value.display_name
                  },
                  user.value.display_name
                ),
                h(
                  'div',
                  {
                    class: 'text-truegray-400 text-xs truncate',
                    title: user.value.username
                  },
                  `@${user.value.username}`
                )
              ]
            : [
                h(
                  'div',
                  {
                    class: 'truncate',
                    title: user.value!.username
                  },
                  `@${user.value!.username}`
                )
              ]
        )
      ])
  },
  {
    type: 'divider'
  },
  {
    label: '重置密码',
    key: 'reset-password',
    icon: renderIcon({ attr: { class: 'i-ic:baseline-lock w-5 h-5' } }),
    props: {
      onClick: () => {
        resetPasswordVisible.value = true
      }
    }
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon({ attr: { class: 'i-ic:baseline-logout w-5 h-5' } }),
    props: { onClick: logout }
  }
])

function menuButton() {
  if (responsive.small) collapsed.value = !collapsed.value
  else drawer.value = !drawer.value
}
</script>

<template>
  <NaiveConfigProvider class="fixed w-full h-full">
    <NaiveProviderBundle>
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
        <NDrawer v-if="!responsive.small" v-model:show="drawer" placement="left" @click="drawer = false">
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
                <NButton :focusable="false" quaternary @click="navigateBack">
                  <template #icon>
                    <div class="i-material-symbols:arrow-back-ios-new-rounded" />
                  </template>
                </NButton>
              </template>
              <div>返回</div>
            </NPopover>
            <div class="mx-auto text-xl">{{ responsive.small ? route.meta.title : undefined }}</div>
            <NPopover trigger="hover" :disabled="!responsive.small">
              <template #trigger>
                <NaiveColorModeSwitch class="px-3.5 self-stretch justify-stretch" quaternary :text="false" />
              </template>
              <div>主题</div>
            </NPopover>
            <NDropdown class="min-w-40" trigger="hover" :options="userMenuOptions">
              <NButton quaternary :focusable="false">
                <template #icon>
                  <div class="i-ic:baseline-account-circle" />
                </template>
                <span v-if="!responsive.small" class="ml-1">{{ user?.display_name || user?.username || '用户' }}</span>
              </NButton>
            </NDropdown>
          </NLayoutHeader>
          <div class="grid rows-[auto_1fr] w-full h-full overflow-hidden">
            <NaivePageNavigator />
            <NLayoutContent>
              <slot />
            </NLayoutContent>
          </div>
        </NaiveConfigProvider>
      </NLayout>
    </NaiveProviderBundle>
    <NaiveModal v-model:show="resetPasswordVisible" class="w-100" title="重置密码">
      <ResetPasswordForm />
    </NaiveModal>
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
