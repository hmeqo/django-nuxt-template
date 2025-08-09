<template>
  <LayoutAdminTemplate
    :menus="[
      {
        label: naiveRenderLink('仪表盘', Urls.admin.index),
        key: Urls.admin.index,
        icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:dashboard-outline' } })
      },
      {
        label: naiveRenderLink('用户', Urls.admin.user.index),
        key: Urls.admin.user.index,
        icon: naiveRenderIcon({ attr: { class: 'i-material-symbols:person-outline' } })
      }
    ]"
  >
    <slot />
  </LayoutAdminTemplate>
</template>
