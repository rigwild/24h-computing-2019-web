<template>
  <div>
    <!-- Pages content -->
    <div class="container mt-3">
      <div class="container my-2">
        <b-button class="mr-2" :to="{ name: 'Home' }" size="sm">Home</b-button>
        <b-button-group class="mr-2">
          <b-button disabled size="sm">Logged out</b-button>
          <b-button :to="{ name: 'Login' }" size="sm">Login</b-button>
          <b-button :to="{ name: 'Register' }" size="sm">Register</b-button>
        </b-button-group>

        <b-button-group class="mr-2">
          <b-button disabled size="sm">Logged in</b-button>
          <b-button :to="{ name: 'Profile' }" size="sm">Profile</b-button>
          <b-button :to="{ name: 'ProfileId', params: { id: '5ce5962e52d12e185cab5797' } }" size="sm">Profile/:id</b-button>
        </b-button-group>

        <b-button @click="logout" class="mr-2" variant="info" size="sm" :disabled="!loggedIn">Your are logged {{ loggedIn ? 'in. Disconnect' : 'out' }}</b-button>
      </div>

      <transition name="fade" mode="out-in">
        <!-- View injected here -->
        <router-view :key="$route.fullPath" />
        <!--/ View injected here -->
      </transition>
    </div>
    <!--/ Pages content -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import './style.css'

export default {
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
