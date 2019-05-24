<template>
  <div id="coffee-map" />
</template>

<script>
const elementId = 'coffee-map'

export default {
  name: 'CoffeeMap',
  props: {
    countries: {
      type: Array,
      default: null
    }
  },
  data() {
    return {}
  },
  watch: {
    countries(newValue) {
      this.map.applyData((this.map.options = Object.assign({}, {

        // The element to render the map in
        targetElementID: '',

        // Minimum and maximum zoom
        minZoom: 1,
        maxZoom: 10,

        // Initial zoom
        initialZoom: 1.06,

        // Zoom sensitivity
        zoomScaleSensitivity: 0.2,

        // Zoom with mousewheel
        mouseWheelZoomEnabled: true,

        // Data colors
        colorMax: '#CC0033',
        colorMin: '#FFE5D9',
        colorNoData: '#E2E2E2',

        // The flag type can be 'image' or 'emoji'
        flagType: 'image',

        // The URL to the flags when using flag type 'image', {0} will get replaced with the lowercase country id
        flagURL: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg'
      }, this.options(newValue))).data)
    }
  },
  mounted() {
    /* eslint no-undef:0  */
    const root = document.getElementById(elementId)
    root.addEventListener('wheel', e => {
      e.preventDefault()
      e.returnValue = false
    }, {
      capture: true,
      passive: false
    })
    this.map = new svgMap(this.options())
  },
  methods: {
    options(countries = this.$props.countries) {
      let maxTotal = 0
      const values = (countries || []).reduce((values, country) => {
        values[country.countryCode.toUpperCase()] = {
          ...country, 
          robusta : (country.robusta * 100 || 0),
          arabica : ((1 - country.robusta) * 100 || 0)
        };
        if (maxTotal < country.coffee_quantity)
          maxTotal = country.coffee_quantity
        return values
      }, {})
      return {
        targetElementID: 'coffee-map',
        colorMax: '#5010B0',
        colorMin: '#B070FF',
        colorNoData: '#BBB',
        data: {
          data: {
            /* coffee_quantity: {
              thousandSeparator: ' ',
              name: 'Total Production',
              format: '{0} Tons'
            }, */
            arabica: {
              thousandSeparator: ' ',
              name: 'Arabica',
              format: '{0} %'
            },
            robusta: {
              thousandSeparator: ' ',
              name: 'Robusta',
              format: '{0} %'
            },
            coffee_quantity: {
              name: 'Production',
              format: '{0} Tons of Coffee',
              thousandSeparator: ' ',

              thresholdMax: maxTotal,
              thresholdMin: 0
            }
          },
          applyData: 'coffee_quantity',
          values
        }
      }
    }
  }
}
</script>
