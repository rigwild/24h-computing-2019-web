<template>
  <div>
    <div class="container register-container">
      <b-card header="Register to Koffee'leeis">
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

          <b-form-group id="input-group-2">
            <b-form-select v-model="role" :options="[{ value: 'importer', text: 'importer' }, { value: 'exporter', text: 'exporter' }]" />
          </b-form-group>


          <b-form-group id="input-group-1">
            Address<br>
            <b-form-input
              id="input-1"
              v-model="street.number"
              type="text"
              required
              placeholder="Street number (ex: 12 bis)"
            />

            <b-form-input
              id="input-1"
              v-model="street.name"
              type="text"
              required
              placeholder="Street name"
            />

            <b-form-input
              id="input-1"
              v-model="postalCode"
              type="text"
              required
              placeholder="Postal code"
            />

            <b-form-input
              id="input-1"
              v-model="city"
              type="text"
              required
              placeholder="City"
            />

            <b-form-input
              id="input-1"
              v-model="countryCode"
              type="text"
              required
              placeholder="Country code (ex: FR)"
            />
          </b-form-group>

          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="phone"
              type="text"
              required
              placeholder="Phone"
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
      role: '',
      phone: '',
      street: {
        number: '',
        name: ''
      },
      city: '',
      postalCode: '',
      countryCode: '',

      loadingMessage: null,
      errorMessage: null
    }
  },

  methods: {
    async register() {
      this.loadingMessage = 'Registering...'
      this.errorMessage = null
      try {
        await apiWrapper.register(this.username, this.password, this.role, this.street, this.postalCode, this.countryCode, this.phone, this.city)
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
