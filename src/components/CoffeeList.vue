<template>
  <div class="mt-5">
    <ul>
      <li v-for="(country,index) of countries" :key="country.countryName">
        <div class="country-list-card d-flex justify-content-around">
          <div class="country-rank">
            <span>#{{ index+1 }}</span>
          </div>
          <div class="country-detail d-flex flex-column justify-content-between">
            <div class="country-title d-flex align-items-center">
              <img :src="country.flag" :alt="country.name" class="country-flag mr-3">
              <span class="country-name mr-5">
                {{ country.name }}
              </span>
              <span class="country-coffee">
                {{ country.coffee_quantity/1000 }}k Ton of Coffee / {{ Math.round(country.coffee_quantity/total*10000)/100 }}% of worldwide production
              </span>
            </div>
            <div class="country-metadata">
              <span class="country-capital mr-3">
                Capital: {{ country.capital }}
              </span>
              <span class="country-pop mr-3">
                Population: {{ country.population }}
              </span>
              <span class="country-area">
                Area: {{ country.area }}
              </span>
            </div>
            <div class="country-descr">
              <p>{{ country.descr }}</p>
            </div>
          </div>
        </div>
        <hr v-if="index+1 < countries.length">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    countries:{
      type: Array,
      default: []
    }
  },
  computed:{
    total(countries) {
      return this.countries.reduce((sum,country) => sum + country.coffee_quantity,0)
    }
  }
}
</script>
<style>
li {
  list-style: none;
}

.country-list-card {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.country-name {
  font-size: 4vh;
  text-transform: uppercase;
}

.country-detail {
  width: 85vw;
}

.country-descr {
  text-align: justify;
  padding-left: 64px;
}

.country-rank {
  font-size: 5vh;
  font-style: italic;
  font-weight: bolder;
  color: #333;
}

.country-metadata {
  font-size: 2vh;
  color: #999;
}

.country-coffee {
  font-size: 2vh;
  color: #73D;
  font-style: italic
}
</style>

