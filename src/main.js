import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { serverPort } from '../config'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false

// Connect the WebSocket client to the store
Vue.use(VueNativeSock, `ws://localhost:${serverPort}`, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
  format: 'json'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
