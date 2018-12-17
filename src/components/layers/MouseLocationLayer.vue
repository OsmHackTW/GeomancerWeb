<template lang="pug">
div(id="mouse-location-layer", :style="mouseLocationStyle")
  | ({{ operationState.mouseGeoLoc.y }}, {{ operationState.mouseGeoLoc.x }})
</template>

<script>
export default {
  props: [ 'operationState' ],

  computed: {
    mouseLocationStyle () {
      const ops = this.operationState
      if (ops.mouseInMap) {
        return {
          left: ops.mouseClientLoc.x + 8 + 'px',
          top: ops.mouseClientLoc.y + 16 + 'px'
        }
      } else {
        return { visibility: 'hidden' }
      }
    }
  }
}
</script>

<style>
#mouse-location-layer {
  position: absolute;
  padding: 0px 5px;
  color: #222;
  border: 1px dotted #444;
  background: rgba(255, 255, 255, 0.6);
  font-size: 9pt;
  white-space: nowrap;
}
</style>
