<template>
  <div>
    <coffee-map :countries="countries" />
    <coffee-list :countries="countries" />
  </div>
</template>

<script>
import apiWrapper from '@/apiWrapper'
import { delay } from '@/functions'
import CoffeeMap from '@/components/CoffeeMap'
import CoffeeList from '@/components/CoffeeList'


export default {
  name: 'Home',
  components: {
    CoffeeMap,
    CoffeeList
  },
  data() {
    return {
      countries: null
    }
  },
  async mounted() {
    this.countries = (await apiWrapper.countries()).sort((a,b) => b.coffee_quantity - a.coffee_quantity)
  }
}
</script>
