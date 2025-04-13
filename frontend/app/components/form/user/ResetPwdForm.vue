<script setup lang="ts">
const props = defineProps<{ user?: User }>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const { user: loginUser } = useLoginState()

const user = computed(() => props.user || loginUser.value!)

const { send, loading } = useRequest(() => user.value.resetPassword(model), {
  immediate: false,
  middleware: middlewares([formValidationMiddleware(() => formRef.value)])
}).onSuccess(() => {
  if (user.value.id === loginUser.value?.id) {
    routerRedirect(HomeUrl)
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
    :rules="UserResetPwd.$getRules(model)"
    :show-require-mark="false"
    label-width="auto"
    label-placement="left"
    @submit.prevent="send"
  >
    <NFormItem label="密码" path="password" first>
      <div class="flex flex-col w-full">
        <NInput v-model:value="model.password" type="password" show-password-toggle />
        <PasswordStrengthIndicator :password="model.password" show-message />
      </div>
    </NFormItem>
    <NFormItem label="确认密码" path="confirmPassword" first>
      <NInput v-model:value="model.confirmPassword" type="password" show-password-toggle />
    </NFormItem>
    <NFlex>
      <NButton class="ml-auto" type="primary" :loading="loading" attr-type="submit">重置</NButton>
    </NFlex>
  </NForm>
</template>
