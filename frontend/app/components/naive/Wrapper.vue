<template>
  <NaiveConfigProvider class="fixed flex flex-col w-full h-full">
    <NGlobalStyle />
    <NaiveProviderBundle>
      <NaiveRequestFeedback />
      <NaiveRequestFeedbackAlova />
      <slot />
    </NaiveProviderBundle>
  </NaiveConfigProvider>
</template>
