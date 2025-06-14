<template>
  <NLayout class="w-full h-full" content-class="fixed flex flex-col  w-full h-full">
    <TauriTitlebar />
    <div class="flex flex-col justify-center items-center w-full h-full">
      <slot />
    </div>
  </NLayout>
</template>
