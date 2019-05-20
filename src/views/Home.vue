<template>
  <div style="text-align:center;font-family:arial">
    <h1>
      This is the homepage
    </h1>

    <br><br><br>

    <h4>Here is an example component having a `message` prop</h4>
    <div>
      <transition name="fade" mode="out-in">
        <my-component :message="message" :key="message" />
      </transition>
    </div>
    <div>
      <button @click="randomizeMessage">Randomize message</button>
    </div>

    <br><br><br>

    <div>
      <h4>Send the message using WebSockets!</h4>
      (Open devtools -> Network, search `ws://localhost:5000` and see sent messages!)
    </div>
    <div>
      <button @click="sendWsMessage">Send</button>
    </div>

    <br><br><br>

    <div>
      <h4>Add the message to the database</h4>
    </div>
    <div>
      <button @click="sendDbMessage">Send</button>
    </div>
  </div>
</template>

<script>
import MyComponent from '@/components/MyComponent'

import { serverPort } from '../../config'
import { WS_SENT_EXAMPLE } from '@/../config.messagesId'
import { API_ROUTES, buildURI } from '@/functions'

export default {
  name: 'Home',
  components: {
    MyComponent
  },
  data() {
    return {
      message: 'Hello world'
    }
  },
  methods: {
    randomizeMessage() {
      this.message = this.message.split('').sort(() => 0.5 - Math.random()).join('')
    },

    sendWsMessage() {
      const obj = { msgId: WS_SENT_EXAMPLE, test: this.message }
      this.$socket.sendObj(obj)
      console.log('Sent with WebSockets: ', obj)
    },

    async sendDbMessage() {
      const route = API_ROUTES.exampleInsertDb(this.message)
      const URI = buildURI(false, 'localhost', serverPort, route)

      const res = await fetch(URI, { method: 'POST' }).then(_res => _res.json())
      console.log('API response: ', res)
    }
  }
}
</script>
