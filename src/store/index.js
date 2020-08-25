import Vue from 'vue'
import Vuex from 'vuex'

import { auth, provider } from '@/firebase'

import PostsModule from './modules/posts'
import SectionsModule from './modules/sections'

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
    async login(context) {
      auth.signInWithPopup(provider).then(result => {
        context.dispatch('setUser', result.user)
      })
      .catch(err => {
        if (err.code !== 'auth/popup-closed-by-user') console.error(err.message)
      })
    },
    async logout({ commit }) {
      await auth.signOut()
      commit('setUser', {})
    },
    setUser({ commit }, user) {
      let isAdmin = user.uid === 'oGt1gEXpKohT1cNo2JyAQ7JqcBy1'
      let { displayName, email, photoURL, uid } = user
      commit('setUser', {uid, displayName, email, photoURL, isAdmin})
    }
  },
  modules: {
    posts: PostsModule,
    sections: SectionsModule
  }
})
