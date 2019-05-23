<template>
  <b-button
    :type="type"
    :variant="variant"
    :disabled="!!loading"
  >
    <template v-if="loading">
      <b-spinner small type="grow" />
      Loading...
    </template>
    <slot v-else></slot>
  </b-button>
</template>

<script>
export default {
  name: 'ButtonLoading',
  props: {
    loading: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    variant: {
      type: String,
      required: false,
      default: 'primary'
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    }
  }
}
</script>
