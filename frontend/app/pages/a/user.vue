<script setup lang="ts">
import { ActiveState, NaiveMultiButton } from '#components'
import type { DataTableColumns } from 'naive-ui'

definePageMeta({
  middleware: () => routeAuth({ auth: [FA] }, { auth: [IsSuperuser], showError: true }),
  layout: 'admin',
  title: '用户',
  icon: 'i-material-symbols:person-outline',
  tags: [Urls.admin.user.index]
})

const configStore = useConfigStore()

const { data: users, loading } = useRequest(() => User.list(), { initialData: UserSet.init() })

const page = usePiniaSessionStorage('users-page', () => 1)
const pageSize = computed({
  get: () => configStore.cache.users__pageSize,
  set: (v) => (configStore.cache.users__pageSize = v)
})

const chosen = ref<User>()

const columns = computed(
  (): DataTableColumns<User> => [
    {
      title: '用户名',
      key: 'username',
      resizable: true,
      sorter: { compare: 'default', multiple: 2 },
      defaultSortOrder: 'ascend'
    },
    {
      title: '名称',
      key: 'display_name',
      resizable: true,
      sorter: { compare: compareLocalely((x) => x.display_name), multiple: 2 }
    },
    {
      title: '超级用户',
      key: 'is_superuser',
      width: 120,
      resizable: true,
      sorter: { compare: 'default', multiple: 2 },
      render: (row) => h(ActiveState, { active: row.is_superuser })
    },
    {
      title: '工作人员',
      key: 'is_staff',
      width: 120,
      resizable: true,
      sorter: { compare: 'default', multiple: 2 },
      render: (row) => h(ActiveState, { active: row.is_staff })
    },
    {
      title: '身份',
      key: 'roles',
      resizable: true,
      filterOptions: userRoleOptions,
      filter: (value, row) => checkUserRole(row, value as UserRole),
      render: (row) => row.roles.map((x) => userRoleToText(x)).join(', ') || '-',
      sorter: { compare: 'default', multiple: 1 }
    },
    {
      title: '有效',
      key: 'is_active',
      width: 120,
      resizable: true,
      render: (row) => h(ActiveState, { active: row.is_active }),
      sorter: { compare: (a, b) => +b.is_active - +a.is_active, multiple: 2 },
      defaultSortOrder: 'ascend',
      filterOptions: activityFilterOptions,
      filterMultiple: false,
      filter: (value, row) => activityFilter(value as Activity, () => row.is_active)
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
      render: (row) =>
        h(NaiveMultiButton, {
          buttons: [
            {
              text: '修改',
              onclick: () => {
                chosen.value = row
                updateVisible.value = true
              }
            },
            {
              text: '重置密码',
              onclick: () => {
                chosen.value = row
                resetPasswordVisible.value = true
              }
            },
            {
              text: '删除',
              onclick: () => {
                useRequest(row.destroy(), { middleware: dialogMiddleware(naiveDialogOptionPresets.delete) }).onSuccess(
                  () => (users.value = UserSet.init(users.value.filter((x) => x.id !== row.id)))
                )
              },
              type: 'error'
            }
          ]
        }),
      fixed: responsive.medium ? 'right' : undefined
    }
  ]
)

const createVisible = ref(false)
const updateVisible = ref(false)
const resetPasswordVisible = ref(false)
</script>

<template>
  <PageBase>
    <NCard class="h-full" content-class="flex flex-col gap-2">
      <NFlex>
        <NButton
          type="success"
          @click="
            () => {
              chosen = undefined
              createVisible = true
            }
          "
          >创建</NButton
        >
      </NFlex>
      <NDataTable
        v-model:page="page"
        v-model:page-size="pageSize"
        class="h-full"
        :loading="loading"
        :data="users"
        :columns="columns"
        :scroll-x="1200"
        :pagination="getNaivePagination({ page, pageSize })"
        flex-height
      />
    </NCard>
    <NaiveModal v-model:show="createVisible" class="w-200" title="创建">
      <UserCreateForm
        @created="
          (data) => {
            users.unshift(data)
            createVisible = false
          }
        "
      />
    </NaiveModal>
    <NaiveModal v-model:show="updateVisible" class="w-200" title="更新">
      <UserUpdateForm v-if="chosen" v-model:model="chosen" @updated="updateVisible = false" />
    </NaiveModal>
    <NaiveModal v-model:show="resetPasswordVisible" class="w-100" title="重置密码">
      <UserResetPwdForm v-if="chosen" :user="chosen" @success="resetPasswordVisible = false" />
    </NaiveModal>
  </PageBase>
</template>
