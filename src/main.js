// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import Axios from 'axios'
import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://localhost:3000'
Axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
