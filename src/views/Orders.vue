<template>
  <div class="container d-flex justify-content-around" style="margin-top:25vh;">
     WIP : Oops Sorry !
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
    return {orders:[]}
  }
}
</script>
