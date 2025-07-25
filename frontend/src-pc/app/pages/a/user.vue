<script setup lang="ts">
import { ActiveState, NIcon } from '#components'
import type { DataTableColumns, DropdownProps } from 'naive-ui'

definePageMeta({
  middleware: () => routeAuth([{ auth: [IsSuperUser] }]),
  layout: 'admin',
  title: '用户管理',
  icon: 'i-material-symbols:person-outline',
  tags: [Urls.admin.user.index]
})

const { data: users, loading } = useRequest(() => UserSrv.list(), { initialData: [] })

const chosen = ref<UserSer>()

const columns = computed(
  (): DataTableColumns<UserSer> => [
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
      sorter: { compare: compareLocalely((x) => x.display_name!), multiple: 2 }
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
    // {
    //   title: '组',
    //   key: 'groups',
    //   resizable: true,
    //   filterOptions: userRoleOptions,
    //   filter: (value, row) => checkUserRole(row, value as UserRole),
    //   render: (row) => row.roles.map((x) => userRoleToText(x)).join(', ') || '-',
    //   sorter: { compare: 'default', multiple: 1 }
    // },
    {
      title: '有效',
      key: 'is_active',
      width: 120,
      resizable: true,
      render: (row) => h(ActiveState, { active: row.is_active }),
      sorter: { compare: (a, b) => +b.is_active! - +a.is_active!, multiple: 2 },
      defaultSortOrder: 'ascend',
      filterOptions: activityFilterOptions,
      filterMultiple: false,
      filter: (value, row) => activityFilter(value as Activity, () => row.is_active!)
    }
  ]
)

const dropmenuVisible = ref(false)
const dropmenuOptions = computed((): DropdownProps['options'] =>
  chosen.value
    ? [
        {
          label: '修改',
          key: 'update',
          icon: () => h(NIcon, { class: 'i-material-symbols:edit-square-outline' }),
          props: {
            onClick: () => {
              dropmenuVisible.value = false
              updateVisible.value = true
            }
          }
        },
        {
          label: '重置密码',
          key: 'reset-password',
          icon: () => h(NIcon, { class: 'i-material-symbols:lock-reset' }),
          props: {
            onClick: () => {
              dropmenuVisible.value = false
              resetPasswordVisible.value = true
            }
          }
        },
        {
          label: '删除',
          key: 'delete',
          icon: () => h(NIcon, { class: 'i-material-symbols:delete-outline text-red-500' }),
          props: {
            class: '!text-red-500',
            onClick: () => {
              dropmenuVisible.value = false
              useRequest(UserSrv.destroy(chosen.value!.id), {
                middleware: dialogMiddleware(naiveDialogOptionPresets.delete)
              }).onSuccess(() => (users.value = users.value.filter((x) => x.id !== chosen.value!.id)))
            }
          },
          show: IsSuperUser.verify()
        }
      ]
    : []
)

const createVisible = ref(false)
const updateVisible = ref(false)
const resetPasswordVisible = ref(false)
</script>

<template>
  <PageBase>
    <NCard class="h-full">
      <template #header>
        <div class="truncate">用户管理</div>
      </template>
      <template #header-extra>
        <NFlex>
          <NButton
            @click="
              () => {
                chosen = undefined
                createVisible = true
              }
            "
            >创建</NButton
          >
        </NFlex>
      </template>
      <NaiveDataTable
        v-model:selected="chosen"
        v-model:show-menu="dropmenuVisible"
        state-key="user"
        :loading="loading"
        :data="users"
        :columns="columns"
        :scroll-x="1200"
        :menu-options="dropmenuOptions"
        :row-force-active="updateVisible || resetPasswordVisible"
      />
    </NCard>
    <Teleport to="#teleports">
      <NaiveModal v-model:show="createVisible" width="200" title="创建">
        <UserCreateForm
          @created="
            (data) => {
              users.unshift(data)
              createVisible = false
            }
          "
        />
      </NaiveModal>
      <NaiveModal v-model:show="updateVisible" width="200" title="更新">
        <UserUpdateForm v-if="chosen" v-model:model="chosen" @updated="updateVisible = false" />
      </NaiveModal>
      <NaiveModal v-model:show="resetPasswordVisible" width="100" title="重置密码">
        <UserResetPwdForm v-if="chosen" :user="chosen" @success="resetPasswordVisible = false" />
      </NaiveModal>
    </Teleport>
  </PageBase>
</template>
