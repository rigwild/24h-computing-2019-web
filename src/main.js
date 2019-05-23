import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import BootstrapVue from 'bootstrap-vue'
import { Promised } from 'vue-promised'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'

import { serverPort } from '../config'
import { buildWsURI } from '../src/functions'

Vue.config.productionTip = false

// Connect the WebSocket client to the store
Vue.use(VueNativeSock, buildWsURI('localhost', serverPort), {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
  format: 'json'
})

Vue.use(BootstrapVue)
Vue.component('Promised', Promised)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
