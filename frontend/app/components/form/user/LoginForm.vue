<script setup lang="ts">
const model = reactive(schemaToDefaults<LoginSerRequest>($LoginSerRequest))

const loginState = useLoginState()

const {
  refresh: send,
  pending,
  status
} = useAsyncData(
  () =>
    withLifecycle(() => AuthService.authLoginCreate(model), {
      before: async () => {
        await formRef.value?.validate()
      },
      onSuccess: (data) => {
        loginState.set(data.user)
      },
      fireEvents: true
    }),
  {
    immediate: false
  }
)
const { lockedSend } = useLockedSend(send, { once: true, status })

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="model"
    :rules="schemaToNaiveRules($LoginSerRequest)"
    :show-require-mark="false"
    label-placement="top"
    label-width="auto"
    @submit.prevent="lockedSend"
  >
    <NFormItem path="username" label="用户名" first>
      <NInput v-model:value="model.username">
        <template #prefix>
          <NIcon class="i-material-symbols:person-outline mr-1" />
        </template>
      </NInput>
    </NFormItem>
    <NFormItem path="password" label="密码" first>
      <NInput v-model:value="model.password" type="password" show-password-on="click">
        <template #prefix>
          <NIcon class="i-material-symbols:lock-outline mr-1" />
        </template>
      </NInput>
    </NFormItem>
    <NFlex>
      <NButton class="w-full" attr-type="submit" :loading="pending || loginState.isLoggedIn()">登录</NButton>
    </NFlex>
  </NForm>
</template>
