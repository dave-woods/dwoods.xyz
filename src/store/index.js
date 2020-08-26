import Vue from 'vue'
import Vuex from 'vuex'

import { auth, provider } from '@/firebase'

import PostsModule from './modules/posts'
import SectionsModule from './modules/sections'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    drawer: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setDrawer(state, open) {
      state.drawer = open
    }
  },
  actions: {
    login(context) {
      return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then(result => {
          context.dispatch('setUser', result.user)
          resolve()
        })
        .catch(err => {
          if (err.code !== 'auth/popup-closed-by-user') reject(err)
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        auth.signOut().then(() => {
          commit('setUser', {})
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    setUser({ commit }, user) {
      let isAdmin = user.uid === 'oGt1gEXpKohT1cNo2JyAQ7JqcBy1'
      let { displayName, email, photoURL, uid } = user
      commit('setUser', {uid, displayName, email, photoURL, isAdmin})
    },
    setDrawer({ commit }, open) {
      commit('setDrawer', open)
    }
  },
  modules: {
    posts: PostsModule,
    sections: SectionsModule
  }
})
