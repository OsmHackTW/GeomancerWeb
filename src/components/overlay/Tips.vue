<template lang="pug">
div(class="tips", :style="tipsStyle")
  div(class="tips-content")
    h4 {{ title }}
    p ({{ location.lat }}, {{ location.lng }})
    p(v-for="(p, index) in properties", :key="index")
      span {{ p.name }}&nbsp;
      span(v-if="p.linkto == ''") {{ p.value }}
      span(v-if="p.linkto != ''")
        // TODO: 連結點不到
        a(:href="p.linkto", target="_blank") {{ p.value }}
  div(class="tips-arrow")
    svg(width="31", height="9")
      polygon(points="0,4 30,0 30,8")
      path(d="M 30,0 L 0,4 L 30,8")
</template>

<script>
export default {
  props: [ 'mapState', 'location', 'title', 'properties' ],

  computed: {
    tipsStyle () {
      const ms = this.mapState
      const geoLoc = { x: this.location.lng, y: this.location.lat }
      const clientLoc = ms.geoLocToClientLoc(geoLoc)
      const x = clientLoc.x + 20
      const y = clientLoc.y - 28
      return {
        left: x + 'px',
        top: y + 'px'
      }
    }
  }
}
</script>

<style scoped>
.tips {
  position: absolute;
  opacity: 0.85;
}

.tips-content {
  position: absolute;
  left: 29px;
  top: -50px;
  background: #ffffff;
  border: 1px solid #555555;
  border-radius: 8px;
  min-width: 150px;
}

.tips-content > h4 {
  font-size: 10pt;
  font-weight: bold;
  margin: 5px 10px 2px 10px;
  white-space: nowrap;
}

.tips-content > p {
  font-size: 9pt;
  font-weight: normal;
  margin: 0px 10px 2px 10px;
  white-space: nowrap;
}

.tips-content > p:last-child {
  margin-bottom: 5px;
}

.tips-arrow {
  position: absolute;
}

.tips-arrow > svg > polygon {
  fill: #ffffff;
}

.tips-arrow > svg > path {
  fill: none;
  stroke: #555555;
}
</style>
