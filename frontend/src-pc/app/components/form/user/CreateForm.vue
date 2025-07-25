<script setup lang="ts">
const emit = defineEmits<{
  (e: 'created', data: UserSer): void
}>()

const { send, loading } = useRequest(() => UserSrv.create(formData), {
  immediate: false,
  middleware: formValidationMiddleware(() => formRef.value)
}).onSuccess(({ data }) => {
  emit('created', data)
})
const { lockedSend } = useLockedSend(send, { once: true })

const formData = reactive({
  ...schemaToDefaults<UserSerRequest>($UserSerRequest, { password: '', is_active: true }),
  confirmPassword: ''
})

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="formData"
    :rules="{
      ...schemaToNaiveRules($UserSerRequest),
      confirmPassword: {
        required: true,
        validator: (_, value) => value === formData.password,
        message: '两次密码不一致',
        trigger: ['blur']
      }
    }"
    :show-require-mark="false"
    label-placement="top"
    label-width="auto"
    @submit.prevent="lockedSend"
  >
    <NFlex class="flex !sm:flex-nowrap !gap-4 w-full h-full *:w-full">
      <div>
        <NFormItem label="用户名" path="username" first>
          <NInput v-model:value="formData.username" />
        </NFormItem>
        <NFormItem label="名称" path="display_name" first>
          <NInput v-model:value="formData.display_name" placeholder="" />
        </NFormItem>
        <NFormItem label="密码" path="password" first>
          <div class="flex flex-col w-full">
            <NInput v-model:value="formData.password" type="password" show-password-on="click" />
            <PasswordStrengthIndicator :password="formData.password!" show-message />
          </div>
        </NFormItem>
        <NFormItem label="确认密码" path="confirmPassword" first>
          <NInput v-model:value="formData.confirmPassword" type="password" show-password-on="click" />
        </NFormItem>
        <NFlex class="*:!items-center">
          <NCheckbox v-model:checked="formData.is_superuser">超级用户</NCheckbox>
          <NCheckbox v-model:checked="formData.is_staff">工作人员</NCheckbox>
          <NCheckbox v-model:checked="formData.is_active">有效</NCheckbox>
        </NFlex>
      </div>
      <div>
        <NFormItem label="组" required>
          <NTransfer :options="[]" />
        </NFormItem>
      </div>
    </NFlex>
    <NFlex>
      <NButton class="ml-auto" :loading="loading" attr-type="submit">创建</NButton>
    </NFlex>
  </NForm>
</template>
