<script setup lang="ts">
const model = reactive(schemaToDefaults<LoginIn>($LoginIn))
const { send, loading } = useRequest(() => Auth.login(model), {
  immediate: false,
  middleware: formValidationMiddleware(() => formRef.value)
}).onSuccess(() => {
  routerRedirect(Urls.admin.index)
})

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="model"
    :rules="schemaToNaiveRules($LoginIn)"
    :show-require-mark="false"
    label-placement="top"
    label-width="auto"
    @submit.prevent="send"
  >
    <NFormItem path="username" label="用户名" first>
      <NInput v-model:value="model.username">
        <template #prefix>
          <NIcon class="i-ic:baseline-person mr-2" />
        </template>
      </NInput>
    </NFormItem>
    <NFormItem path="password" label="密码" first>
      <NInput v-model:value="model.password" type="password">
        <template #prefix>
          <NIcon class="i-ic:baseline-lock mr-2" />
        </template>
      </NInput>
    </NFormItem>
    <NFlex>
      <NButton class="w-full" type="primary" attr-type="submit" :loading="loading">登录</NButton>
    </NFlex>
  </NForm>
</template>
