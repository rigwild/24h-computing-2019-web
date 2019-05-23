import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import router from './router'
import apiWrapper from '@/apiWrapper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userData: {
      username: null,
      role: null
    }
  },

  actions: {
    async login({ commit }, { username, password }) {
      const data = await apiWrapper.login(username, password)
      commit('setLoggedIn', data)
      router.push({ name: 'Home' })
    },

    logout({ commit }) {
      apiWrapper.logout()
      commit('setLoggedOut')
      router.push({ name: 'Login' })
    }
  },

  mutations: {
    setLoggedIn(state, { username, role }) {
      state.loggedIn = true
      state.userData = {
        username,
        role
      }
    },
    setLoggedOut(state) {
      state.loggedIn = false
      state.userData = {
        username: null,
        role: null
      }
    }
  },

  plugins: [createPersistedState()]
})
