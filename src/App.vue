<template lang="pug">
div(id="app" v-bind:style="appSize")
  router-view(id="map-area")
  span(id="app-tag", v-show="showTag") {{ name }}
</template>

<script>
export default {
  data () {
    return {
      name: 'App',
      clientWidth: 0,
      clientHeight: 0,
      borderWidth: 1,
      showTag: false
    }
  },

  computed: {
    appSize () {
      const appWidth = this.clientWidth - this.borderWidth * 2
      const appHeight = this.clientHeight - this.borderWidth * 2
      return {
        width: appWidth + 'px',
        height: appHeight + 'px'
        /* border: this.borderWidth + 'px dashed #000000' */
      }
    }
  },

  methods: {
    onWindowResize () {
      this.clientWidth = window.innerWidth
      this.clientHeight = window.innerHeight
    }
  },

  mounted () {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
  }
}
</script>

<style lang="stylus">
#app {
  position: relative;
}

#map-area {
  width: 100%;
  height: 100%;
}

#app-tag {
  position: absolute;
  right: 0;
  top: 0;
  padding: 3px 10px;
  border: 1px solid #777;
  background: rgba(255,255,0,0.5);
}
</style>
