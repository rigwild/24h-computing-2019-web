<template>
  <div class="container">
        <b-button class="primary-color">Commander</b-button>
    <ul>
      <li v-for="(order) of orders" :key="order.coffeeType">
        <span>{{order}}</span> <br>
      </li>
    </ul>
  </div>
</template>

<script>
import apiWrapper from '@/apiWrapper'
// import ButtonLoading from '@/components/ButtonLoading'
import Loader from '@/components/Loader'

export default {
  name: 'Orders',
  components: {
  },
  async mounted(){
    this.orders = await apiWrapper.getOrders();
  },
  data(){
    return {orders:[null]}
  }
}
</script>
