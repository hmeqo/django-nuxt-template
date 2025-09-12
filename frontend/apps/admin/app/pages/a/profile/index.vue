<script setup lang="ts">
definePageMeta({
  middleware: () => routeAuth([{ auth: [IsStaff] }]),
  layout: 'admin',
  title: '个人中心',
  icon: 'i-material-symbols:person-outline',
  tags: [PP.admin.profile.index]
})

const { user } = useLoginState()
</script>

<template>
  <PageBase>
    <div class="p-4">
      <NCard class="max-w-lg mx-auto rounded-md shadow">
        <div v-if="user" class="space-y-4">
          <div class="flex items-center space-x-4">
            <div
              class="flex shrink-0 items-center justify-center w-16 h-16 rounded-full text-2xl text-gray-500 bg-gray-200 dark:(text-gray-300 bg-gray-700) transition-all duration-300"
            >
              {{ (user.display_name || user.username)?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <NText class="text-xl font-semibold">{{ user.display_name || user.username }}</NText>
              <NText class="block text-sm text-truegray-500">@{{ user.username }}</NText>
            </div>
          </div>

          <NDivider />

          <div
            class="grid cols-[auto_1fr] gap-x-4 gap-y-2 items-center [&>:nth-child(odd)]:(text-right text-sm text-truegray-500)"
          >
            <div>用户ID:</div>
            <div>
              <NText>{{ user.id }}</NText>
            </div>

            <div>用户名:</div>
            <div>
              <NText>{{ user.username }}</NText>
            </div>

            <div>显示名称:</div>
            <div>
              <NText>{{ user.display_name }}</NText>
            </div>

            <!-- <div>角色:</div>
            <div>
              <NSpace size="small">
                <NTag v-for="role in user.roles" :key="role" type="info" size="small" round>
                  {{ role }}
                </NTag>
              </NSpace>
            </div> -->
          </div>
        </div>
        <div v-else>
          <NText type="error">无法加载用户信息。</NText>
        </div>
      </NCard>
    </div>
  </PageBase>
</template>
