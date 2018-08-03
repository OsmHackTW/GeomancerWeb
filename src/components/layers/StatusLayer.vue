<template lang="pug">
div(id="status-layer")
  h4 Status
  p WGS84 Center: ({{ mapState.center.y }}, {{ mapState.center.x }})
  p Zoom: {{ mapState.zoom }} ({{ mapState.zoomMin }} ~ {{ mapState.zoomMax }})
  p Tile Center: ({{ mapState.tileCenter.x }}, {{ mapState.tileCenter.y }})
  p Tile Layer Offset: ({{ mapState.tileLayerOffset.x }}, {{ mapState.tileLayerOffset.y }})
  p First Tile: ({{ mapState.tileBeginAt.x }}, {{ mapState.tileBeginAt.y }})
  p Num of Tiles: {{ mapState.tileCount.cols }} x {{ mapState.tileCount.rows }}
  p Viewport: {{ mapState.clientSize.width }} x {{ mapState.clientSize.height }}
  p Bounding Box LT: {{ mapState.boundingBox.x1 }} {{ mapState.boundingBox.y1 }}
  p Bounding Box RB: {{ mapState.boundingBox.x2 }} {{ mapState.boundingBox.y2 }}
</template>

<script>
export default {
  props: [ 'mapState' ]
}
</script>

<style scoped>
#status-layer {
  position: absolute;
  right: 5px;
  top: 5px;
  min-width: 230px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid black;
  border-radius: 5px;
  font-size: 10pt;
  font-weight: normal;
  user-select: none;
}

#status-layer > h4,
#status-layer > p {
  margin: 0;
}
</style>
