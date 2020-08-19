import Vue from 'vue'
import Vuex from 'vuex'

import Posts from './modules/Posts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    posts: Posts
  }
})
