import Vue from 'vue'
import Vuex from 'vuex'

import { auth, provider } from '@/firebase'

import Posts from './modules/Posts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }) {
      auth.signInWithPopup(provider).then(result => {
        commit('setUser', result.user)
      })
      .catch(err => {
        if (err.code !== 'auth/popup-closed-by-user') console.error(err)
      })
    },
    async logout({ commit }) {
      await auth.signOut()
      commit('setUser', {})
    }
  },
  modules: {
    posts: Posts
  }
})
