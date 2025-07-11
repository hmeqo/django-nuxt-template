<script setup lang="ts">
const _model = defineModel<User>('model', { required: true })
const model = reactive(useBranch(_model.value).$newBranch())

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const { send, loading } = useRequest(() => model.update(), {
  immediate: false,
  middleware: middlewares([formValidationMiddleware(() => formRef.value)])
}).onSuccess(() => {
  model.$apply()
  emit('updated')
})
const { lockedSend } = useLockedSend(send, { once: true })

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="model"
    :rules="schemaToNaiveRules($UserSer)"
    :show-require-mark="false"
    label-placement="top"
    label-width="auto"
    @submit.prevent="lockedSend"
  >
    <NFlex class="flex !sm:flex-nowrap !gap-4 w-full h-full *:w-full">
      <div>
        <NFormItem label="用户名" path="username" first>
          <NInput v-model:value="model.username" />
        </NFormItem>
        <NFormItem label="名称" path="name" first>
          <NInput v-model:value="model.display_name" placeholder="" />
        </NFormItem>
        <NFlex class="*:!items-center">
          <NCheckbox v-model:checked="model.is_superuser">超级用户</NCheckbox>
          <NCheckbox v-model:checked="model.is_staff">工作人员</NCheckbox>
          <NCheckbox v-model:checked="model.is_active">有效</NCheckbox>
        </NFlex>
      </div>
      <div>
        <NFormItem label="角色" required>
          <NTransfer v-model:value="model.roles" :options="userRoleOptions" />
        </NFormItem>
      </div>
    </NFlex>
    <NFlex>
      <NButton class="ml-auto" :loading="loading" attr-type="submit">保存</NButton>
    </NFlex>
  </NForm>
</template>
