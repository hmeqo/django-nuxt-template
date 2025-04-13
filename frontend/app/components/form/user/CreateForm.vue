<script setup lang="ts">
const emit = defineEmits<{
  (e: 'created', data: UserCreate): void
}>()

const { send, loading } = useRequest(() => User.create(model), {
  immediate: false,
  middleware: formValidationMiddleware(() => formRef.value)
}).onSuccess(({ data }) => {
  emit('created', data)
})

const model = reactive(UserCreate.init())

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="model"
    :rules="UserCreate.$getRules(model)"
    :show-require-mark="false"
    label-placement="top"
    label-width="auto"
    @submit.prevent="send"
  >
    <NFlex class="flex !sm:flex-nowrap !gap-4 w-full h-full *:w-full">
      <div>
        <NFormItem label="用户名" path="username" first>
          <NInput v-model:value="model.username" />
        </NFormItem>
        <NFormItem label="名称" path="name" first>
          <NInput v-model:value="model.display_name" placeholder="" />
        </NFormItem>
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
          <NCheckbox v-model:checked="model.is_superuser">超级用户</NCheckbox>
          <NCheckbox v-model:checked="model.is_staff">工作人员</NCheckbox>
          <NCheckbox v-model:checked="model.is_active">激活</NCheckbox>
        </NFlex>
      </div>
      <div>
        <NFormItem label="身份" required>
          <NTransfer v-model:value="model.roles" :options="userRoleOptions" />
        </NFormItem>
      </div>
    </NFlex>
    <NFlex>
      <NButton class="ml-auto" type="success" :loading="loading" attr-type="submit">创建</NButton>
    </NFlex>
  </NForm>
</template>
