// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
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
            store.commit('login', ssu)
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
