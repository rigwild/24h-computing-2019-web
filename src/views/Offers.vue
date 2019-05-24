<template>
<div class="mt-5">
    <ul>
      <li v-for="(offer,index) of offers" :key="offer.coffeeType">
        <div class="offer-card">
          <div class="offer-type">
            Type: {{ offer.coffeeType }}
          </div>
          <div class="offer-price">
            Price: ${{ offer.bagPrice }}
          </div>
          <div class="offer-origine">
            Origine: ${{ offer.originCountryCode}}
          </div>
          <div class="offer-amount">
            Amount: ${{ offer.oamount}}
          </div>
        </div>
        <hr v-if="index+1 < countries.length">
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
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      offers: null
    }
  },
  mounted() {
    this.offers = await apiWrapper.;
  }
}
</script>
