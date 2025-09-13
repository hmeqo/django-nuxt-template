<script setup lang="ts">
const model = reactive(schemaToDefaults<LoginSerRequest>($LoginSerRequest))

const loginState = useAuthState()

const { send, loading } = useRequest(() => AuthSrv.login(model), {
  immediate: false,
  middleware: formValidationMiddleware(() => formRef.value)
}).onSuccess(({ data }) => {
  loginState.setState(data)
  checkLoginPagePerm?.()
})
const { lockedSend } = useLockedSend(send, { once: true })

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
          <NIcon class="i-ic:outline-person-outline mr-1" />
        </template>
      </NInput>
    </NFormItem>
    <NFormItem path="password" label="密码" first>
      <NInput v-model:value="model.password" type="password" show-password-on="click">
        <template #prefix>
          <NIcon class="i-ic:outline-lock mr-1" />
        </template>
      </NInput>
    </NFormItem>
    <NFlex>
      <NButton class="w-full" attr-type="submit" :loading="loading || loginState.isLoggedIn()">登录</NButton>
    </NFlex>
  </NForm>
</template>
