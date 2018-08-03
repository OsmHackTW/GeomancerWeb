<template lang="pug">
div(id="tile-layer", v-bind:style="tileLayerStyle")
  div(class="tile", v-bind:style="tileStyle(t)", v-for="t in tiles")
</template>

<script>
export default {
  props: [ 'mapState' ],

  data () {
    return {
      source: 'https://gdtile.tacosync.com/classic/{Z}/{X}/{Y}'
    }
  },

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
    tileLayerStyle () {
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
    tileStyle (t) {
      const ms = this.mapState
      const x = t.col * ms.tileSize
      const y = t.row * ms.tileSize
      const url = this.source
        .replace('{X}', ms.tileBeginAt.x + t.col)
        .replace('{Y}', ms.tileBeginAt.y + t.row)
        .replace('{Z}', ms.zoom)
      return {
        left: x + 'px',
        top: y + 'px',
        width: ms.tileSize + 'px',
        height: ms.tileSize + 'px',
        background: 'url(' + url + ')'
      }
    }
  }
}
</script>

<style scoped>
#tile-layer {
  position: absolute;
}

#tile-layer > .tile {
  position: absolute;
}
</style>
