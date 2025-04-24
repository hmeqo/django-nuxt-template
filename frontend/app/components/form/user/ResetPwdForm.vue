<script setup lang="ts">
const props = defineProps<{ user?: User }>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const loginState = useLoginState()

const user = computed(() => props.user || loginState.get())

const { send, loading } = useRequest(() => user.value!.resetPassword(model), {
  immediate: false,
  middleware: middlewares([formValidationMiddleware(() => formRef.value)])
}).onSuccess(() => {
  if (user.value?.id === loginState.get().id) {
    loginState.$reset()
    navigateTo(LoginUrl)
  }
  emit('success')
})

const model = reactive<UserResetPwd>(UserResetPwd.init())

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
      <div class="flex flex-col w-full">
        <NInput v-model:value="model.password" type="password" show-password-on="click" />
        <PasswordStrengthIndicator :password="model.password" show-message />
      </div>
    </NFormItem>
    <NFormItem label="确认密码" path="confirmPassword" first>
      <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" />
    </NFormItem>
    <NFlex>
      <NButton class="ml-auto" type="primary" :loading="loading" attr-type="submit">重置</NButton>
    </NFlex>
  </NForm>
</template>
