<template>
  <div>
    <h1>
      Register
    </h1>

    <div class="container">
      <b-card header="Register">
        <b-form @submit.prevent="register">
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="username"
              type="text"
              required
              placeholder="Username"
            />
          </b-form-group>

          <b-form-group id="input-group-2">
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              required
              placeholder="Password"
            />
          </b-form-group>

          <ButtonLoading :loading="loadingMessage" type="submit">Register</ButtonLoading>
        </b-form>

        <b-alert v-text="errorMessage" dismissible :show="errorMessage" fade class="mt-3" variant="danger" />
      </b-card>
    </div>
  </div>
</template>

<script>
import apiWrapper from '@/apiWrapper'
import ButtonLoading from '@/components/ButtonLoading'

export default {
  name: 'Register',
  components: {
    ButtonLoading
  },
  data() {
    return {
      username: '',
      password: '',

      loadingMessage: null,
      errorMessage: null
    }
  },

  methods: {
    async register() {
      this.loadingMessage = 'Registering...'
      this.errorMessage = null
      try {
        await apiWrapper.register(this.username, this.password)
        this.$router.push({ name: 'Login' })
      }
      catch (err) {
        console.error('Failed to register', err)
        this.errorMessage = err.message
      }
      finally {
        this.loadingMessage = null
      }
    }
  }
}
</script>
