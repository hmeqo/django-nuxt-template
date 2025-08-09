<script setup lang="ts">
import { UserInfo } from '#components'
import type { DropdownOption } from 'naive-ui'

defineProps<{
  showIcon?: boolean
  bordered?: boolean
}>()

const collapsed = defineModel<boolean>('collapsed', { default: false })
const showDrawer = defineModel<boolean>('showDrawer', { default: false })

const loginState = useLoginState()

const { send: logout } = useRequest(() => AuthSrv.logout(), {
  middleware: dialogMiddleware(naiveDialogOptionPresets.logout),
  immediate: false
}).onSuccess(() => {
  loginState.$reset()
  navigateTo(getLoginUrl())
})

const resetPasswordVisible = ref(false)

const userMenuOptions = computed((): DropdownOption[] => [
  {
    type: 'render',
    key: 'user-info',
    render: () => h(UserInfo, { user: loginState.user })
  },
  {
    type: 'divider'
  },
  {
    label: naiveRenderLink('个人中心', Urls.admin.profile.index),
    key: 'profile',
    icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:person-outline w-5 h-5' } })
  },
  {
    label: '重置密码',
    key: 'reset-password',
    icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:lock-outline w-5 h-5' } }),
    props: {
      onClick: () => {
        resetPasswordVisible.value = true
      }
    }
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:logout w-5 h-5' } }),
    props: { onClick: () => logout() }
  }
])

function menuButton() {
  if (responsive.small) collapsed.value = !collapsed.value
  else showDrawer.value = !showDrawer.value
}
</script>

<template>
  <NLayoutHeader class="flex items-center px-4 py-1" :bordered="bordered">
    <div class="flex flex-1 grow items-center gap-1 overflow-hidden" data-tauri-drag-region>
      <template v-if="showIcon">
        <img v-if="isTauri" src="/favicon.ico" class="no-drag w-6 h-6" data-tauri-drag-region />
        <NuxtLink v-else class="shrink-0 mr-2" :to="getHomeUrl()">
          <img src="/favicon.ico" class="no-drag w-6 h-6" />
        </NuxtLink>
      </template>
      <NPopover trigger="hover" :disabled="!responsive.small">
        <template #trigger>
          <NButton :focusable="false" quaternary @click="menuButton">
            <div class="i-material-symbols:menu w-5 h-5" />
          </NButton>
        </template>
        <div>{{ collapsed ? '展开' : '收起' }}</div>
      </NPopover>
      <NPopover trigger="hover" :disabled="!responsive.small">
        <template #trigger>
          <NButton :focusable="false" quaternary @click="navigateBack">
            <div class="i-material-symbols:arrow-back-ios-new-rounded w-4 h-4" />
          </NButton>
        </template>
        <div>返回</div>
      </NPopover>
    </div>
    <div class="invisible sm:visible text-[16px] cursor-default" data-tauri-drag-region>
      {{ $route.meta.title }}
    </div>
    <div class="flex flex-1 grow items-center justify-end gap-1" data-tauri-drag-region>
      <NPopover trigger="hover" :disabled="!responsive.small">
        <template #trigger>
          <ColorModeSwitch quaternary iconify min />
        </template>
        <div>主题</div>
      </NPopover>
      <NDropdown class="min-w-40 border-card" trigger="hover" :options="userMenuOptions">
        <NButton quaternary :focusable="false">
          <div class="i-material-symbols:account-circle-outline w-5 h-5" />
        </NButton>
      </NDropdown>
      <TauriTitlebar embedded />
    </div>
    <Teleport to="#teleports">
      <NaiveModal v-model:show="resetPasswordVisible" width="100" title="重置密码">
        <UserResetPwdForm @success="resetPasswordVisible = false" />
      </NaiveModal>
    </Teleport>
  </NLayoutHeader>
</template>
