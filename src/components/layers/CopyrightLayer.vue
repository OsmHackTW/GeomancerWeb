<template lang="pug">
div(id="copyright-layer")
  | 圖資版權 ©&nbsp;
  a(href="https://www.openstreetmap.org/copyright", target="_blank") OpenStreetMap 貢獻者
  | &nbsp;|&nbsp;圖磚風格&nbsp;
  a(href="https://gdtile.tacosync.com/", target="_blank") 鬼島圖磚:古典
</template>

<style scoped>
#copyright-layer {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 9pt;
  background: rgba(255,255,255,0.8);
  padding: 1px 5px;
  user-select: none;
}
</style>
