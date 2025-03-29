<template>
  <LayoutMgrBase
    :menus="[
      {
        label: renderLink('仪表盘', Urls.mgr.index),
        key: Urls.mgr.index,
        icon: renderIcon({ attr: { class: 'i-ic:baseline-dashboard' } })
      }
    ]"
  >
    <slot />
  </LayoutMgrBase>
</template>
