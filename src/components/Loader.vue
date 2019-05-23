
<template>
  <div class="text-center">
    <b-spinner big type="grow" />
    <h6 v-text="message" />
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    message: {
      type: String,
      default: 'Loading...',
      required: false
    }
  }
}
</script>
