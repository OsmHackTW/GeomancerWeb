<template lang="pug">
div(id="grid-layer", :style="gridLayerStyle")
  div(class="grid", v-bind:style="gridStyle(t)", v-for="t in tiles")
    div Tile ({{ mapState.tileBeginAt.x + t.col }}, {{ mapState.tileBeginAt.y + t.row }}), Grid ({{ t.col }}, {{ t.row }})
</template>

<script>
export default {
  props: [ 'mapState' ],

  computed: {
    tiles () {
      let items = []
      const ms = this.mapState
      for (let r = 0; r < ms.tileCount.rows; r++) {
        for (let c = 0; c < ms.tileCount.cols; c++) {
          items.push({ col: c, row: r })
        }
      }
      return items
    },
    gridLayerStyle () {
      const ms = this.mapState
      return {
        left: ms.tileLayerOffset.x + 'px',
        top: ms.tileLayerOffset.y + 'px',
        width: (ms.tileSize * ms.tileCount.cols) + 'px',
        height: (ms.tileSize * ms.tileCount.rows) + 'px'
      }
    }
  },

  methods: {
    gridStyle (t) {
      const ms = this.mapState
      const x = t.col * ms.tileSize
      const y = t.row * ms.tileSize
      return {
        left: x + 'px',
        top: y + 'px',
        width: ms.tileSize - 1 + 'px',
        height: ms.tileSize - 1 + 'px'
      }
    }
  }
}
</script>

<style scoped>
#grid-layer {
  position: absolute;
}

#grid-layer > .grid {
  position: absolute;
  border: 1px dashed rgb(224, 0, 0);
  border-right-width: 0px;
  border-bottom-width: 0px;
}

#grid-layer > .grid > div {
  display: inline-block;
  margin: 0px;
  padding: 0px 5px;
  color: rgb(224, 0, 0);
  background: rgba(255, 255, 255, 0.7);
  border: 1px dashed rgb(224, 0, 0);
  border-top-width: 0px;
  border-left-width: 0px;
  font-size: 9pt;
  user-select: none;
}
</style>
