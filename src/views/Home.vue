<template>
  <div style="width:30%;margin:0 auto;font-family:arial">
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
      <div>WebSocket received message:</div>
      <pre>{{ wsResponseMessage }}</pre>
    </div>

    <br><br><br>

    <div>
      <h4>Add the message to the database</h4>
    </div>
    <div>
      <button @click="sendDbMessage">Send</button>
      <div>API response:</div>
      <pre>{{ apiResponseMessage }}</pre>
    </div>

    <br><br><br>

    <button @click="sendDbMessageThrow">Trigger an API error</button>
    <div>Error:</div>
    <pre>{{ apiErrorMessage }}</pre>
  </div>
</template>

<script>
import MyComponent from '@/components/MyComponent'

import { WS_SENT_EXAMPLE } from '@/../config.messagesId'
import { exampleInsertDb } from '@/apiWrapper'

export default {
  name: 'Home',
  components: {
    MyComponent
  },
  data() {
    return {
      message: 'Hello world',

      wsResponseMessage: null,
      apiResponseMessage: null,
      apiErrorMessage: null
    }
  },

  // This will be triggered when the page is loaded
  mounted() {
    // When received a message from the WebSocket server, handle it
    this.$options.sockets.onmessage = data => {
      const json = JSON.parse(data.data)
      this.wsResponseMessage = json
      console.log('Received from WebSocket server: ', json)
    }
  },

  methods: {
    randomizeMessage() {
      this.message = this.message.split('').sort(() => 0.5 - Math.random()).join('')
    },

    sendWsMessage() {
      const obj = { msgId: WS_SENT_EXAMPLE, test: this.message }
      this.$socket.sendObj(obj)
      console.log('Sent with WebSocket client: ', obj)
    },

    async sendDbMessage() {
      try {
        const data = await exampleInsertDb(this.message)
        console.log('API response (It was expected):')
        console.log(data)
        this.apiResponseMessage = data
      }
      catch (err) {
        console.error('API throw (It was not expected!!): ', err)
        this.apiResponseMessage = err
      }
    },

    async sendDbMessageThrow() {
      try {
        const data = await exampleInsertDb('42')
        console.warn('API response (Should have thrown!!)')
        console.warn(data)
      }
      catch (err) {
        console.error('API throw (It was expected): ', err)
        this.apiErrorMessage = { message: err.message, data: err.data }
      }
    }
  }
}
</script>
