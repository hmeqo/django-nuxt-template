<script setup lang="ts">
const model = defineModel<UserSer>('model', { required: true })
const formData = reactive(schemaToDefaults<UserSerRequest>($UserSerRequest, model.value))

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const { send, loading } = useRequest(() => UserSrv.update(model.value.id, formData), {
  immediate: false,
  middleware: middlewares([formValidationMiddleware(() => formRef.value)])
}).onSuccess(({ data }) => {
  Object.assign(model.value, data)
  emit('updated')
})
const { lockedSend } = useLockedSend(send, { once: true })

const formRef = useTemplateRef('form')
</script>

<template>
  <NForm
    ref="form"
    :model="formData"
    :rules="schemaToNaiveRules($UserSerRequest)"
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
      <NButton class="ml-auto" :loading="loading" attr-type="submit">保存</NButton>
    </NFlex>
  </NForm>
</template>
