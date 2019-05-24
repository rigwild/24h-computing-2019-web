<template>
  <div>
    <coffee-map :countries="countries" />
  </div>
</template>

<script>
import apiWrapper from '@/apiWrapper'
import { delay } from '@/functions'
import CoffeeMap from '@/components/CoffeeMap'

export default {
  name: 'Home',
  components: {
    CoffeeMap
  },
  data() {
    return {
      countries: null
    }
  },
  async mounted() {
    this.countries = await apiWrapper.countries()
  }
}
</script>
