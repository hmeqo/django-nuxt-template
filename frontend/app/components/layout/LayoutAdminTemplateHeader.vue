<script setup lang="ts">
import { UserInfo } from '#components'
import type { DropdownOption } from 'naive-ui'

const collapsed = defineModel<boolean>('collapsed', { default: false })
const showDrawer = defineModel<boolean>('showDrawer', { default: false })

const route = useRoute()
const { user } = useLoginState()

const { send: logout } = useRequest(() => Auth.logout(), {
  immediate: false,
  middleware: dialogMiddleware(naiveDialogOptionPresets.logout)
}).onSuccess(() => {
  routerRedirect(HomeUrl)
})

const resetPasswordVisible = ref(false)

const userMenuOptions = computed((): DropdownOption[] => [
  {
    type: 'render',
    key: 'user-info',
    render: () => h(UserInfo, { user: user.value })
  },
  {
    type: 'divider'
  },
  {
    label: renderLink('个人中心', Urls.admin.profile.index),
    key: 'profile',
    icon: renderIcon({ attr: { class: 'i-material-symbols:person-outline w-5 h-5' } })
  },
  {
    label: '重置密码',
    key: 'reset-password',
    icon: renderIcon({ attr: { class: 'i-material-symbols:lock-outline w-5 h-5' } }),
    props: {
      onClick: () => {
        resetPasswordVisible.value = true
      }
    }
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon({ attr: { class: 'i-material-symbols:logout w-5 h-5' } }),
    props: { onClick: logout }
  }
])

function menuButton() {
  if (responsive.small) collapsed.value = !collapsed.value
  else showDrawer.value = !showDrawer.value
}
</script>

<template>
  <NLayoutHeader class="flex gap-1 px-4 py-3" bordered>
    <NPopover trigger="hover" :disabled="!responsive.small">
      <template #trigger>
        <NButton :focusable="false" quaternary @click="menuButton">
          <div class="i-material-symbols:lists w-5 h-5" />
        </NButton>
      </template>
      <div>菜单</div>
    </NPopover>
    <NPopover trigger="hover" :disabled="!responsive.small">
      <template #trigger>
        <NButton :focusable="false" quaternary @click="navigateBack">
          <div class="i-material-symbols:arrow-back-ios-new-rounded w-5 h-5" />
        </NButton>
      </template>
      <div>返回</div>
    </NPopover>
    <div class="invisible sm:visible mx-auto text-xl">{{ route.meta.title }}</div>
    <NPopover trigger="hover" :disabled="!responsive.small">
      <template #trigger>
        <ColorModeSwitch class="px-3.5 self-stretch justify-stretch" quaternary :text="false" iconify />
      </template>
      <div>主题</div>
    </NPopover>
    <NDropdown class="min-w-40" trigger="hover" :options="userMenuOptions">
      <NButton quaternary :focusable="false">
        <div class="i-material-symbols:account-circle-outline w-5 h-5" />
      </NButton>
    </NDropdown>
    <NaiveModal v-model:show="resetPasswordVisible" class="w-100" title="重置密码">
      <UserResetPwdForm />
    </NaiveModal>
  </NLayoutHeader>
</template>
