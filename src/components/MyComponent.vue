<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    message: {
      type: String,
      default: null,
      required: false
    }
  }
}
</script>
