<template>
  <NaiveConfigProvider class="fixed w-dvw h-dvh" dark>
    <NaiveRequestFeedback />
    <NLayout class="w-full h-full" content-class="flex flex-col justify-center items-center">
      <slot />
    </NLayout>
  </NaiveConfigProvider>
</template>
