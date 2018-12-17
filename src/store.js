import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      name: '',
      login: '',
      auth: false,
      timestamp: 0
    }
  },
  getters: {
    userInfo (state) {
      if (state.userInfo.auth === false) {
        if (window.sessionStorage.userInfo !== undefined) {
          const ssu = JSON.parse(window.sessionStorage.userInfo)
          const now = (new Date()).getTime() / 1000
          if (now - ssu.timestamp < 30) {
            this.commit('login', ssu)
            return ssu
          }
        }
      }
      return state.userInfo
    }
  },
  mutations: {
    login (state, userInfo) {
      userInfo.timestamp = (new Date()).getTime() / 1000
      window.sessionStorage.userInfo = JSON.stringify(userInfo)
      state.userInfo = userInfo
    },
    logout (state) {
      const userInfo = {
        name: '',
        login: '',
        auth: false,
        timestamp: 0
      }
      window.sessionStorage.userInfo = JSON.stringify(userInfo)
      state.userInfo = userInfo
    }
  }
})
