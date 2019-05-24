<template>
  <div>
    <div class="container login-container">
      <b-card header="Login to Koffee'leeis">
        <b-form @submit.prevent="onSubmit">
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

          <ButtonLoading :loading="loadingMessage" type="submit">Login</ButtonLoading>
        </b-form>

        <b-alert v-text="errorMessage" dismissible :show="errorMessage" fade class="mt-3" variant="danger" />
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ButtonLoading from '@/components/ButtonLoading'

export default {
  name: 'Login',
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
    ...mapActions(['login']),

    async onSubmit() {
      this.loadingMessage = 'Logging in...'
      this.errorMessage = null
      try {
        await this.login({ username: this.username, password: this.password })
      }
      catch (err) {
        console.error('Failed to login', err)
        this.errorMessage = err.message
      }
      finally {
        this.loadingMessage = null
      }
    }
  }
}
</script>
