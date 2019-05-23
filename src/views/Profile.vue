<template>
  <div>
    <h1>
      Profile
    </h1>

    <div class="container">
      <b-card header="Profile">
        <Promised v-if="profilePromise" :promise="profilePromise">
          <template v-slot:pending>
            <Loader />
          </template>
          <template v-slot="data">
            <pre>{{ data }}</pre>
          </template>
          <template v-slot:rejected="error">
            <b-alert v-text="error.message" dismissible show class="mt-3" variant="danger" />
          </template>
        </Promised>
      </b-card>
    </div>
  </div>
</template>

<script>
import apiWrapper from '@/apiWrapper'
// import ButtonLoading from '@/components/ButtonLoading'
import Loader from '@/components/Loader'

export default {
  name: 'Profile',
  components: {
    // ButtonLoading
    Loader
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      profilePromise: null,

      loadingMessage: null,
      errorMessage: null
    }
  },

  mounted() {
    this.loadProfile()
  },

  methods: {
    // Load the requested profile
    loadProfile() {
      this.profilePromise = apiWrapper.profile(this.id)
    }
  }
}
</script>
