<template>
  <div class="mt-5">
    <div class="d-flex justify-content-around add-btn-container">
      <b-button class="add-btn btn-pink">Add an offer</b-button>
    </div>
    <ul>
      <li v-for="(offer,index) of offers" :key="index">
        <div class="offer-card">
          <div class="offer-type">
            Type: {{ offer.coffeeType }}
          </div>
          <div class="offer-price">
            Price: ${{ offer.bagPrice }}
          </div>
          <div class="offer-origine">
            Origin: {{ offer.originCountryCode }}
          </div>
          <div class="offer-amount">
            Amount: {{ offer.real }}
          </div>
        </div>
        <hr v-if="index+1 < offers.length">
      </li>
    </ul>
    <div class="d-flex justify-content-around add-btn-container">
      <b-button class="add-btn btn-pink">Add an offer</b-button>
    </div>
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
      offers: []
    }
  },
  async mounted() {
    this.offers = await apiWrapper.getOffers()
  },
  methods: {
    async createOffer() {
      await apiWrapper.createOffer()
    }
  }
}
</script>
