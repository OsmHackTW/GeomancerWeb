<template lang="pug">
div(id="github-login")
  p(v-show="!done") 身分驗證中，請稍候 ...
  p(v-show="done && successful") 登入完成
  p(v-show="done && !successful")
    | 登入失敗，
    a(:href="URL_AUTHORIZE") 再試一次
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      client_id: 'a564c04f554415036378',
      client_secret: '1973a4a16b88767ffcff49db34d9f3057471c584',
      done: false,
      successful: false
    }
  },
  computed: {
    URL_AUTHORIZE () {
      return 'https://github.com/login/oauth/authorize?client_id=' + this.client_id
    },
    URL_TOKEN () {
      // CORS Proxies:
      const proxies = [
        'https://thingproxy.freeboard.io/fetch/',
        'https://cors-anywhere.herokuapp.com/',
        'https://crossorigin.me/'
      ]
      return proxies[0] + 'https://github.com/login/oauth/access_token'
    },
    URL_USER () {
      return 'https://api.github.com/user'
    }
  },
  methods: {
    pairsToObject (pairs) {
      const params = {}
      pairs.split('&').forEach((stmt) => {
        const eqp = stmt.indexOf('=')
        if (eqp > 0) {
          const k = stmt.substr(0, eqp)
          const v = decodeURIComponent(stmt.substr(eqp + 1)).replace(/\+/g, ' ')
          params[k] = v
        } else {
          if (eqp === -1) {
            params[stmt] = ''
          }
        }
      })
      return params
    }
  },
  created () {
    const pairs = window.location.search.substr(1)
    const params = this.pairsToObject(pairs)
    if (params['code'] !== undefined) {
      this.code = params['code']
      axios.post(this.URL_TOKEN, {
        client_id: this.client_id,
        client_secret: this.client_secret,
        code: params['code']
      }).then((resp) => {
        if (resp.status === 200) {
          console.log('Get GitHub access token.')
          const result = this.pairsToObject(resp.data)
          if (result['access_token'] !== undefined) {
            return axios.get(this.URL_USER, {
              headers: {
                'Authorization': 'token ' + result.access_token
              }
            })
          } else {
            throw result.error_description
          }
        } else {
          throw resp.statusText
        }
      }).then((resp) => {
        if (resp.status === 200) {
          console.log('Get GitHub user info.')
          const userInfo = {
            login: resp.data.login,
            name: resp.data.name,
            auth: resp.config.headers.Authorization
          }
          this.done = true
          this.successful = true
          this.$store.commit('login', userInfo)
          setTimeout(() => this.$router.push('mapviewer'), 1500)
          return
        }
        throw resp.statusText
      }).catch((ex) => {
        console.error(ex)
        this.done = true
      })
    }
  }
}
</script>
