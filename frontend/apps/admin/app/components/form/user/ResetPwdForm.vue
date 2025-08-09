<script setup lang="ts">
const props = defineProps<{ user?: UserSer }>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const loginState = useLoginState()

const user = computed(() => props.user || loginState.getUser())

const { send, loading } = useRequest(() => UserSrv.resetPassword(user.value.id, model), {
  immediate: false,
  middleware: middlewares([formValidationMiddleware(() => formRef.value)])
}).onSuccess(() => {
  if (user.value?.id === loginState.getUser().id) {
    loginState.$reset()
    navigateTo(getLoginUrl())
  }
  emit('success')
})
const { lockedSend } = useLockedSend(send, { once: true })

const model = reactive({
  ...schemaToDefaults<UserResetPwdSerRequest>($UserResetPwdSerRequest, {
    password: ''
  }),
  confirmPassword: ''
})

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="model"
    :rules="{
      ...schemaToNaiveRules($UserResetPwdSerRequest),
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
    @submit.prevent="lockedSend"
  >
    <NFormItem label="密码" path="password" first>
      <div class="flex flex-col w-full">
        <NInput v-model:value="model.password" type="password" show-password-on="click" />
        <PasswordStrengthIndicator :password="model.password" show-message />
      </div>
    </NFormItem>
    <NFormItem label="确认密码" path="confirmPassword" first>
      <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" />
    </NFormItem>
    <NFlex>
      <NButton class="ml-auto" :loading="loading" attr-type="submit">重置</NButton>
    </NFlex>
  </NForm>
</template>
