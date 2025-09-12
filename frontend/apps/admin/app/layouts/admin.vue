<template>
  <LayoutAdminTemplate
    :menus="[
      {
        label: naiveRenderLink('仪表盘', PP.admin.index),
        key: PP.admin.index,
        icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:dashboard-outline' } })
      },
      {
        label: naiveRenderLink('用户', PP.admin.user.index),
        key: PP.admin.user.index,
        icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:person-outline' } })
      }
    ]"
  >
    <slot />
  </LayoutAdminTemplate>
</template>
