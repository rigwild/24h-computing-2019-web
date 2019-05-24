<template>
  <div>
    <!-- Pages content -->

    <!-- Header -->
    <div class="app-header d-flex justify-content-start align-items-center bg-mauve fixed-top px-2">
      <router-link :to="{ name: 'Home' }" class="mr-5">
        <span class="app-title"  size="sm">KOFFEE'LEEIS</span>
      </router-link>

      <!-- <b-button-group class="mr-2">
        <b-button disabled size="sm">Logged out</b-button>
        <b-button :to="{ name: 'Login' }" size="sm">Login</b-button>
        <b-button :to="{ name: 'Register' }" size="sm">Register</b-button>
      </b-button-group>

      <b-button-group class="mr-2">
        <b-button disabled size="sm">Logged in</b-button>
        <b-button :to="{ name: 'Profile' }" size="sm">Profile</b-button>
        <b-button :to="{ name: 'ProfileId', params: { id: '5ce5962e52d12e185cab5797' } }" size="sm">Profile/:id</b-button>
      </b-button-group>-->

      <b-button-group v-if="loggedIn && userData.role === 'exporter'" class="mx-auto align-self-stretch nav-container">
        <!-- <b-button disabled size="sm">Exporter</b-button> -->
        <b-button :to="{ name: 'Orders' }" size="sm" class="nav-btn">Orders</b-button>
        <b-button :to="{ name: 'Offers' }" size="sm" class="nav-btn">Products</b-button>
        <b-button :to="{ name: 'Profile' }" size="sm" class="nav-btn">Profile</b-button>

      </b-button-group>

      <b-button-group v-if="loggedIn && userData.role === 'importer'" class="mx-auto align-self-stretch nav-container">
        <!-- <b-button disabled size="sm">Exporter</b-button> -->
        <b-button :to="{ name: 'Profile' }" size="sm" class="nav-btn">Buy</b-button>
        <b-button :to="{ name: 'Profile' }" size="sm" class="nav-btn">Open Orders</b-button>
        <b-button :to="{ name: 'Profile' }" size="sm" class="nav-btn">Profile</b-button>

      </b-button-group>

      <b-button :to="{ name: 'Register' }" size="sm" v-if="!loggedIn" class="ml-auto mr-2" variant="light">Register</b-button>

      <b-button :to="{ name: 'Login' }" size="sm" v-if="!loggedIn" class="btn-pink">Login</b-button>

      <b-button @click="logout" class="ml-auto mr-2" variant="light" size="sm" v-if="loggedIn">
        Disconnect
      </b-button>
    </div>
    <div class="router-view-container">
      <transition name="fade" mode="out-in">
        <!-- View injected here -->
        <router-view :key="$route.fullPath" style="min-height:81vh;"/>
        <!--/ View injected here -->
      </transition>
    <footer-comp class="footer-comp"/>
    </div>
    <!--/ Pages content -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "./style.css";
import FooterComp from '@/components/FooterComp'


export default {
  computed: {
    ...mapState(["loggedIn","userData"])
  },
  methods: {
    ...mapActions(["logout"])
  },
  components: {
    FooterComp
  }
};
</script>
