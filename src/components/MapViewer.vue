<template lang="pug">
div
  div(id="layer-container", ref="layerContainer",
    @mousemove="onMouseMove",
    @mousedown="onMouseDown",
    @mouseenter="onMouseEnter",
    @mouseleave="onMouseLeave",
    @dblclick="onMouseDoubleClick",
    @wheel="onMouseWheel"
  )
    TileLayer(:mapState="mapState")
    GridLayer(:mapState="mapState", v-show="showLayers.grid")
    StatusLayer(:mapState="mapState", v-show="showLayers.status")
    EditingToolLayer(:mapState="mapState")
    OverlayLayer(:mapState="mapState")
    LogoLayer
    CopyrightLayer
    MouseLocationLayer(:operationState="operationState", v-show="showLayers.mouseLocation")
</template>

<script>
import MapState from '@/lib/MapState'
import TileLayer from '@/components/layers/TileLayer'
import GridLayer from '@/components/layers/GridLayer'
import LogoLayer from '@/components/layers/LogoLayer'
import OverlayLayer from '@/components/layers/OverlayLayer'
import EditingToolLayer from '@/components/layers/EditingToolLayer'
import StatusLayer from '@/components/layers/StatusLayer'
import CopyrightLayer from '@/components/layers/CopyrightLayer'
import MouseLocationLayer from '@/components/layers/MouseLocationLayer'

export default {
  components: { TileLayer, GridLayer, OverlayLayer, EditingToolLayer, StatusLayer, LogoLayer, CopyrightLayer, MouseLocationLayer },

  data () {
    // TODO: path validation
    const zoom = parseInt(this.$route.params.zoom)
    const lat = parseFloat(this.$route.params.lat)
    const lng = parseFloat(this.$route.params.lng)
    MapState.setZoomRange(10, 18)
    MapState.setZoom(zoom)
    MapState.setCenter({ x: lng, y: lat })
    return {
      // 地圖相關座標狀態
      mapState: MapState,
      // 上次同步 route 的時間
      prevSyncPathTime: 0,
      // 地圖整體操作狀態
      operationState: {
        moving: false,
        movingFromGeoLoc: { x: 0, y: 0 },
        movingFromClientLoc: { x: 0, y: 0 },
        mouseGeoLoc: { x: 0, y: 0 },
        mouseClientLoc: { x: 0, y: 0 },
        mouseInMap: false,
        prevMovingTime: 0
      },
      // 圖層開關狀態
      showLayers: {
        status: true,
        grid: true,
        mouseLocation: true
      }
    }
  },

  methods: {
    syncRouterPath () {
      const ms = this.mapState
      this.$router.replace({
        name: 'mapviewer',
        params: {
          zoom: ms.zoom,
          lat: ms.center.y,
          lng: ms.center.x
        }
      })
    },
    onWindowResize (e) {
      // 可以用 Safari 關閉開發視窗測試，幾乎必中
      // 可能從 window 觸發 resize 到 layerContainer 完成 resize 需要一小段時間
      const lc = this.$refs.layerContainer
      if (lc !== undefined) {
        setTimeout(() => {
          const width = lc.clientWidth
          const height = lc.clientHeight
          if (width > 0 && height > 0) {
            const clientSize = { width, height }
            this.mapState.setClientSize(clientSize)
          }
        }, 100)
      }
    },
    onMouseMove (e) {
      const ops = this.operationState

      // 限制速率 30fps
      const currMovingTime = (new Date()).getTime()
      if (currMovingTime - ops.prevMovingTime < 1000 / 30) return
      ops.prevMovingTime = currMovingTime

      const ms = this.mapState
      if (ops.moving) {
        const clientOffset = {
          x: e.clientX - ops.movingFromClientLoc.x,
          y: e.clientY - ops.movingFromClientLoc.y
        }
        ms.moveCenter(ops.movingFromGeoLoc, clientOffset)
      } else {
        const clientLoc = { x: e.clientX, y: e.clientY }
        ops.mouseGeoLoc = ms.clientLocToGeoLoc(clientLoc)
      }

      // 更新滑鼠座標介面位置
      ops.mouseClientLoc.x = e.clientX
      ops.mouseClientLoc.y = e.clientY
    },
    onMouseDown (e) {
      const ms = this.mapState
      const ops = this.operationState
      ops.moving = true
      ops.movingFromGeoLoc = ms.center
      ops.movingFromClientLoc = { x: e.clientX, y: e.clientY }
    },
    onMouseUp (e) {
      const ops = this.operationState
      ops.moving = false
      this.syncRouterPath()
    },
    onMouseWheel (e) {
      // TODO: Throttling history state changes to prevent the browser from hanging.
      const threshold = 5
      const dz = -Math.sign(Math.round(e.deltaY / threshold))
      const ms = this.mapState
      if (ms.setZoom(ms.zoom + dz)) {
        this.syncRouterPath()
      }
    },
    onMouseEnter (e) {
      const ops = this.operationState
      ops.mouseInMap = true
    },
    onMouseLeave (e) {
      const ops = this.operationState
      ops.mouseInMap = false
    },
    onMouseDoubleClick (e) {
      const ms = this.mapState
      if (ms.setZoom(ms.zoom + 1)) {
        this.syncRouterPath()
      }
    }
  },

  mounted () {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize)
    window.addEventListener('mouseup', this.onMouseUp)
  }
}
</script>

<style scoped>
#layer-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
