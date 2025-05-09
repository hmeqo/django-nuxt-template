<template>
  <NaiveConfigProvider class="fixed flex flex-col w-full h-full">
    <NGlobalStyle />
    <NaiveProviderBundle>
      <NaiveRequestFeedback />
      <slot />
    </NaiveProviderBundle>
  </NaiveConfigProvider>
</template>
