import Vue from 'vue'
import Router from 'vue-router'
// import MapViewer from '@/components/MapViewer'
// import GitHubLogin from '@/components/GitHubLogin'
import Privacy from '@/components/Privacy'

Vue.use(Router)

export default new Router({
  routes: [
    // 標準路徑
    /*
    {
      name: 'mapviewer',
      path: '/mapviewer/:zoom/:lat/:lng',
      component: MapViewer
    },
    */
    // 預設位置
    // TODO: 改成從 local storage 讀取預設座標
    /*
    {
      path: '/mapviewer',
      redirect: '/mapviewer/16/25.05328/121.52734'
    },
    */
    // 重新定向到預設位置
    {
      path: '/',
      redirect: '/privacy'
    },
    // GitHub 登入
    /*
    {
      name: 'github-login',
      path: '/github-login',
      component: GitHubLogin
    },
    */
    // 隱私權聲明
    {
      name: 'privacy',
      path: '/privacy',
      component: Privacy
    }
  ]
})
