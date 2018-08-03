<template lang="pug">
div(id="overlay-layer")
  Pin(
    :mapState="mapState", :info="poi", :symbol="symbol", :highlight="highlightPoi(poi)",
    v-for="(poi, index) in visiblePois", :key="index",
    @click="onClickPoi")
  Tips(
    :mapState="mapState",
    :location="selectedPoi.location",
    :title="selectedPoi.label",
    :properties="selectedPoi.properties"
  )
</template>

<script>
import axios from 'axios'
import TextUtils from '@/lib/TextUtils'
import Pin from '@/components/overlay/Pin'
import Tips from '@/components/overlay/Tips'

export default {
  props: [ 'mapState' ],
  components: { Pin, Tips },

  data () {
    const emptyPoi = {
      label: '',
      location: { lat: 0, lng: 0 },
      properties: [
        { name: '', value: '', linkto: '' }
      ]
    }
    return {
      emptyPoi: emptyPoi,
      selectedPoi: emptyPoi,
      symbol: '凶',
      pois: [
        {
          label: '跳樓',
          location: { lat: 25.0525, lng: 121.5268 },
          properties: [
            { name: '資料來源', value: '台灣凶宅網', linkto: '#' },
            { name: '相關新聞', value: '蘋果日報', linkto: '#' },
            { name: '法院公告', value: '他字第00001號' }
          ]
        }
      ]
    }
  },

  computed: {
    visiblePois () {
      const bbox = this.mapState.boundingBox
      const pins = this.pois.filter((p) => {
        return p.location.lng > bbox.x1 &&
               p.location.lng < bbox.x2 &&
               p.location.lat > bbox.y1 &&
               p.location.lat < bbox.y2
      })
      return pins
    }
  },

  methods: {
    loadPois () {
      const src = 'https://raw.githubusercontent.com/virus-warnning/twag/master/categories/unluckyhouse/unluckyhouse.geojson'
      axios.get(src)
        .then((resp) => {
          if (resp.status === 200) {
            const poisInGeoJSON = resp.data.features
            const pois = poisInGeoJSON.map((item) => {
              const props = item.properties
              const unluckyHouse = TextUtils.toUnluckyHouseURL(props.id)
              const newsProvider = TextUtils.urlToName(props.news)
              return {
                label: props.approach,
                location: {
                  lat: item.geometry.coordinates[1],
                  lng: item.geometry.coordinates[0]
                },
                properties: [
                  { name: '資料來源', value: '台灣凶宅網', linkto: unluckyHouse },
                  { name: '相關新聞', value: newsProvider, linkto: props.news }
                ]
              }
            })
            this.pois = pois
          }
        })
        .catch((e) => {
          console.log('載入凶宅資料時發生錯誤')
          console.log(e)
        })
    },
    highlightPoi (pin) {
      return (pin === this.selectedPoi)
    },
    onClickPoi (pin) {
      if (this.selectedPoi === pin) {
        this.selectedPoi = this.emptyPoi
      } else {
        this.selectedPoi = pin
      }
    }
  },

  created () {
    this.loadPois()
  }
}
</script>

<style scoped>
#overlay-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
