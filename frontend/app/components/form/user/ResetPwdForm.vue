<script setup lang="ts">
const props = defineProps<{ user?: User }>()

const { user: loginUser } = useLoginState()

const user = computed(() => props.user || loginUser.value!)

const { send, loading } = useRequest(() => user.value.resetPassword(model), {
  immediate: false,
  middleware: middlewares([
    formValidationMiddleware(() => formRef.value),
    dialogMiddleware(naiveDialogOptionPresets.resetPwd)
  ])
}).onSuccess(() => {
  if (user.value.id === loginUser.value?.id) {
    routerRedirect(HomeUrl)
  }
})

const model = reactive<UserResetPwdIn & { confirmPassword: string }>({
  password: '',
  confirmPassword: ''
})

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="model"
    :rules="{
      ...schemaToNaiveRules($UserResetPwdIn),
      confirmPassword: {
        required: true,
        validator: (_, value) => value === model.password,
        message: '两次密码不一致',
        trigger: ['blur']
      }
    }"
    :show-require-mark="false"
    label-width="auto"
    label-placement="left"
    @submit.prevent="send"
  >
    <NFormItem label="密码" path="password" first>
      <NInput v-model:value="model.password" />
    </NFormItem>
    <NFormItem label="确认密码" path="confirmPassword" first>
      <NInput v-model:value="model.confirmPassword" />
    </NFormItem>
    <NFlex>
      <NButton class="ml-auto" type="primary" :loading="loading" attr-type="submit">重置</NButton>
    </NFlex>
  </NForm>
</template>
