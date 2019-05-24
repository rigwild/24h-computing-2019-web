<template>
  <div id="coffee-map" />
</template>

<script>
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
      this.map.applyData(Object.assign({}, {

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
      }, (this.map.options = this.options(newValue))).data)
    }
  },
  mounted() {
    /* eslint no-undef:0  */
    this.map = new svgMap(this.options())
  },
  methods: {
    options(countries = this.$props.countries) {
      return {
        targetElementID: 'coffee-map',
        data: {
          data: {
            area: {
              thousandSeparator: ' ',
              name: 'Surface',
              format: '{0}'
            },
            population: {
              thousandSeparator: ' ',
              name: 'Population',
              format: '{0}'
            },
            total: {
              name: 'Total',
              format: '{0} %',
              thousandSeparator: ' ',

              thresholdMax: 100,
              thresholdMin: 0
            }
          },
          applyData: 'total',
          values: (countries || []).reduce((values, { countryCode: code, population, area, coffee_quantity: total }) => {
            values[code.toUpperCase()] = {
              population,
              area,
              total
            }
            return values
          }, {})
        }
      }
    }
  }
}
</script>
