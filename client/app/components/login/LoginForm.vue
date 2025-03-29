<script setup lang="ts">
const model = reactive(schemaToDefaults<LoginIn>($LoginIn))
const { send, loading } = useRequest(() => Auth.login(model), {
  immediate: false,
  middleware: formValidationMiddleware(() => formRef.value)
}).onSuccess(() => {
  routerRedirect(Urls.mgr.index)
})

const formRef = ref()
</script>

<template>
  <NForm
    ref="formRef"
    :model="model"
    :rules="schemaToNaiveRules($LoginIn)"
    :show-require-mark="false"
    label-placement="top"
    label-width="auto"
    @submit.prevent="send"
  >
    <NFormItem path="username" label="用户名" :rule="naiveRulePresets.required()">
      <NInput v-model:value="model.username">
        <template #prefix>
          <NIcon class="i-carbon:user mr-2" />
        </template>
      </NInput>
    </NFormItem>
    <NFormItem path="password" label="密码">
      <NInput v-model:value="model.password" type="password">
        <template #prefix>
          <NIcon class="i-carbon:password mr-2" />
        </template>
      </NInput>
    </NFormItem>
    <NFormItem>
      <NButton class="w-full" type="primary" attr-type="submit" :loading="loading">登录</NButton>
    </NFormItem>
  </NForm>
</template>
