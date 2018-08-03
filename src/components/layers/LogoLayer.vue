<template lang="pug">
div(id="logo-layer")
  img(src="@/assets/geomancer.png", width="16")
  div(class="name") 鄉民風水師 Web
</template>

<style scoped>
#logo-layer {
  position: absolute;
  right: 0;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #777;
  border-radius: 4px;
  padding: 3px 5px;
}

img {
  margin-right: 5px;
}

div.name {
  font-size: 9pt;
}

img, div.name {
  float: left;
  height: 16px;
  line-height: 18px;
  color: #555;
}
</style>
