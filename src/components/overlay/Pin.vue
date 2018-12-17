<template lang="pug">
svg(width="31", height="55", :class="pinClass", :style="pinLocation")
  g(@click="onClick")
    circle(cx="15", cy="15", r="14")
    polygon(points="10,27 15,54 20,27")
    path(d="M 10,28 L 15,54 L 20,28")
    text(x="15", y="20", class="symbol") {{ symbol }}
</template>

<script>
export default {
  props: [ 'info', 'mapState', 'symbol', 'highlight' ],

  computed: {
    pinLocation () {
      const ms = this.mapState
      const geoLoc = { x: this.info.location.lng, y: this.info.location.lat }
      const clientLoc = ms.geoLocToClientLoc(geoLoc)
      return {
        left: (clientLoc.x - 15) + 'px',
        top: (clientLoc.y - 55) + 'px'
      }
    },
    pinClass () {
      return {
        highlight: this.highlight
      }
    }
  },

  methods: {
    onClick () {
      this.$emit('click', this.info)
    }
  }
}
</script>

<style scoped>
svg {
  position: absolute;
  user-select: none;
}

svg > g > circle {
  fill: #800000;
  stroke: #333333;
  stroke-width: 1;
}

svg > g > polygon {
  fill: #800000;
}

svg.highlight > g > circle,
svg.highlight > g > polygon {
  fill: #e00000;
}

svg > g > path {
  fill: none;
  stroke: #333333;
  stroke-width: 0.8;
}

svg > g > .symbol {
  fill: #ffffff;
  text-anchor: middle;
  font-size: 11pt;
}
</style>
