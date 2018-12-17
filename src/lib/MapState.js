export default {

  center: { x: 0, y: 0 },
  tileCenter: { x: 0, y: 0 },
  clientCenter: { x: 0, y: 0 },

  zoom: 16,
  zoomMin: 0,
  zoomMax: 18,

  tileSize: 256,
  tileCount: { cols: 0, rows: 0 },
  tileBeginAt: { x: 0, y: 0 },
  tileLayerOffset: { x: 0, y: 0 },

  clientSize: { width: 1024, height: 768 },
  boundingBox: { x1: 0, x2: 0, y1: 0, y2: 0 },

  // 設定地圖中心點
  setCenter (center) {
    const n = 100000
    const x = Math.floor(center.x * n) / n
    const y = Math.floor(center.y * n) / n
    this.center = { x, y }
    this.updateTileCenter()
    this.updateTileBeginAt()
    this.updateBoundingBox()
  },

  // 移動地圖中心點
  moveCenter (prevCenter, clientOffset) {
    const tileOffset = {
      x: clientOffset.x / this.tileSize,
      y: clientOffset.y / this.tileSize
    }
    const prevTileCenter = this.geoLocToTileLoc(prevCenter)
    // 移動方向與滑鼠向量相反
    const currTileCenter = {
      x: prevTileCenter.x - tileOffset.x,
      y: prevTileCenter.y - tileOffset.y
    }
    const currCenter = this.tileLocToGeoLoc(currTileCenter)
    this.setCenter(currCenter)
  },

  // 設定縮放比
  setZoom (zoom) {
    const nz = Math.min(Math.max(zoom, this.zoomMin), this.zoomMax)
    if (nz !== this.zoom) {
      this.zoom = zoom
      this.updateTileCenter()
      this.updateTileBeginAt()
      this.updateBoundingBox()
      return true
    } else {
      return false
    }
  },

  // 設定介面尺寸
  setClientSize (clientSize) {
    const x = clientSize.width / 2
    const y = clientSize.height / 2
    this.clientSize = clientSize
    this.clientCenter = { x, y }
    this.updateTileCount()
    this.updateTileBeginAt()
    this.updateBoundingBox()
  },

  // 設定縮放比範圍
  setZoomRange (zoomMin, zoomMax) {
    this.zoomMin = zoomMin
    this.zoomMax = zoomMax
  },

  // 設定圖磚尺寸
  setTileSize (tileSize) {
    this.tileSize = tileSize
    // this.updateBoundingBox()
    // this.updateTileCount()
  },

  // 重算地圖可見範圍
  updateBoundingBox () {
    const corner1 = { x: 0, y: 0 }
    const corner2 = { x: this.clientSize.width - 1, y: this.clientSize.height - 1 }
    const loc1 = this.clientLocToGeoLoc(corner1)
    const loc2 = this.clientLocToGeoLoc(corner2)
    this.boundingBox = {
      x1: loc1.x,
      y1: loc2.y,
      x2: loc2.x,
      y2: loc1.y
    }
  },

  // 重新計算需要的圖磚數量
  updateTileCount () {
    const cols = Math.ceil(this.clientSize.width / this.tileSize) + 1
    const rows = Math.ceil(this.clientSize.height / this.tileSize) + 1
    this.tileCount = { cols, rows }
  },

  // 重新計算中心點圖磚座標
  updateTileCenter () {
    this.tileCenter = this.geoLocToTileLoc(this.center)
  },

  // 重新計算起始圖磚編號
  updateTileBeginAt () {
    const cornerTx = this.tileCenter.x - (this.clientCenter.x / this.tileSize)
    const cornerTy = this.tileCenter.y - (this.clientCenter.y / this.tileSize)
    this.tileBeginAt = {
      x: Math.floor(cornerTx),
      y: Math.floor(cornerTy)
    }
    this.tileLayerOffset = {
      x: -Math.ceil((cornerTx - this.tileBeginAt.x) * this.tileSize),
      y: -Math.ceil((cornerTy - this.tileBeginAt.y) * this.tileSize)
    }
  },

  // WGS84座標 -> 圖磚座標
  geoLocToTileLoc (geoLoc) {
    const n = Math.pow(2, this.zoom)
    const r = geoLoc.y * Math.PI / 180
    const tx = n * (geoLoc.x + 180) / 360
    const ty = n * (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2
    const p = 1000
    const x = Math.floor(tx * p) / p
    const y = Math.floor(ty * p) / p
    return { x, y }
  },

  // 圖磚座標 -> WGS84座標
  tileLocToGeoLoc (tileLoc) {
    const n = Math.pow(2, this.zoom)
    const gx = -180 + tileLoc.x * 360 / n
    const gy = Math.atan(Math.sinh(Math.PI * (1 - 2.0 * tileLoc.y / n))) * 180 / Math.PI
    const p = 100000
    const x = Math.floor(gx * p) / p
    const y = Math.floor(gy * p) / p
    return { x, y }
  },

  // WGS84座標 -> 介面座標
  geoLocToClientLoc (geoLoc) {
    const destTileLoc = this.geoLocToTileLoc(geoLoc)
    const dcx = (destTileLoc.x - this.tileCenter.x) * this.tileSize
    const dcy = (destTileLoc.y - this.tileCenter.y) * this.tileSize
    const clientLoc = {
      x: Math.round(this.clientCenter.x + dcx),
      y: Math.round(this.clientCenter.y + dcy)
    }
    return clientLoc
  },

  // 介面座標 -> WGS84座標
  clientLocToGeoLoc (clientLoc) {
    const dtx = (clientLoc.x - this.clientCenter.x) / this.tileSize
    const dty = (clientLoc.y - this.clientCenter.y) / this.tileSize
    const tileLoc = {
      x: dtx + this.tileCenter.x,
      y: dty + this.tileCenter.y
    }
    return this.tileLocToGeoLoc(tileLoc)
  }

}
