<script setup lang="ts">
const props = defineProps<{
  password: string
  showMessage?: boolean
}>()

const passwordStrength = ref(-1)
watch(
  computed(() => props.password),
  async () => {
    const { default: zxcvbn } = await import('zxcvbn')
    if (!props.password) passwordStrength.value = -1
    else passwordStrength.value = zxcvbn(props.password).score
  }
)
</script>

<template>
  <div>
    <div class="password-strength-indicator" :data-strength="passwordStrength">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <div
      v-if="passwordStrength !== -1 && showMessage"
      class="flex items-center gap-1 ml-auto mt-1 w-[max-content] text-xs"
      :class="{
        'text-red': passwordStrength === 0,
        'text-yellow': passwordStrength === 1,
        'text-green': passwordStrength === 2,
        'text-blue': passwordStrength === 3,
        'text-purple': passwordStrength === 4
      }"
    >
      <div>{{ ['弱', '中', '强', '很强', '超强'][passwordStrength] }}</div>
      <div class="i-mdi:shield-lock-outline" />
    </div>
  </div>
</template>

<style scoped>
.password-strength-indicator {
  --uno: 'flex gap-1 mt-2 w-full h-1';
}

.password-strength-indicator > div {
  --uno: 'w-full h-full rounded-1 bg-truegray-400 dark:bg-truegray-200';
}

.password-strength-indicator[data-strength='0'] > div:nth-child(1) {
  --uno: 'bg-red';
}

.password-strength-indicator[data-strength='1'] > div:nth-child(-n + 2) {
  --uno: 'bg-yellow';
}

.password-strength-indicator[data-strength='2'] > div:nth-child(-n + 3) {
  --uno: 'bg-green';
}

.password-strength-indicator[data-strength='3'] > div:nth-child(-n + 4) {
  --uno: 'bg-blue';
}

.password-strength-indicator[data-strength='4'] > div:nth-child(-n + 5) {
  --uno: 'bg-purple';
}
</style>
