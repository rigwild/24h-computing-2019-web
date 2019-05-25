<template>
  <div class="container d-flex justify-content-around" style="margin-top:25vh;">
    <div class="container" style="margin-top:7%;">
      <b-card header="Orders">
        <Promised v-if="orders" :promise="orders">
          <template v-slot:pending>
            <Loader />
          </template>
          <template v-slot="data">
            <div class="container">
              <p><pre>{{ data }}</pre></p><hr>
            </div>
          </template>
          <template v-slot:rejected="error">
            <b-alert v-text="error.message" dismissible show class="mt-3" variant="danger" />
          </template>
        </Promised>
      </b-card>
    </div>
  </div>
</template>

<script>
import apiWrapper from '@/apiWrapper'
// import ButtonLoading from '@/components/ButtonLoading'
import Loader from '@/components/Loader'

export default {
  name: 'Orders',
  components: {
    Loader
  },
  data() {
    return { orders: [] }
  },
  async mounted() {
    this.orders = apiWrapper.getOrders()
  }
}
</script>
