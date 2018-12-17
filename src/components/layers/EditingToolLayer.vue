<template lang="pug">
div(id="editing-tool-layer")
  span OOO&nbsp;
  span(v-show="!authorized")
    a(href="https://github.com/login/oauth/authorize?client_id=a564c04f554415036378") 登入
  span(v-show="authorized")
    | {{ username }}&nbsp;
    a(@click="logout") 登出
</template>

<script>
export default {
  props: [ 'mapState' ],

  computed: {
    authorized () {
      return this.$store.getters.userInfo.auth !== false
    },
    username () {
      console.log(this.$store.getters.userInfo)
      return this.$store.getters.userInfo.name
    }
  },

  methods: {
    logout () {
      this.$store.commit('logout')
    }
  }
}
</script>

<style scoped>
#editing-tool-layer {
  position: absolute;
  right: 5px;
  top: 5px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 10pt;
  font-weight: normal;
  user-select: none;
}
</style>
