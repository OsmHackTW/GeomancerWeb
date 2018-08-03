<template lang="pug">
div(class="symbol-pin", :style="pinLocation")
  svg(width="150", height="75", :class="pinClass", @click="onClick")
    circle(cx="75", cy="15", r="14")
    polygon(points="70,27 75,55 80,27")
    path(d="M 70,28 L 75,55 L 80,28")
    text(x="75", y="20", class="symbol") {{ symbol }}
    text(x="75", y="70", class="label") {{ info.label }}
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
        left: (clientLoc.x - 75) + 'px',
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
.symbol-pin {
  position: absolute;
  width: 150px;
  height: 75px;
  user-select: none;
}

svg > circle {
  fill: #800000;
  stroke: #333333;
  stroke-width: 1;
}

svg > polygon {
  fill: #800000;
}

svg.highlight > circle,
svg.highlight > polygon {
  fill: #e00000;
}

svg > path {
  fill: none;
  stroke: #333333;
  stroke-width: 0.8;
}

svg > .symbol {
  fill: #ffffff;
  text-anchor: middle;
  font-size: 11pt;
}

svg > .label {
  fill: #000000;
  text-anchor: middle;
  font-size: 10pt;
  font-weight: bold;
}
</style>
