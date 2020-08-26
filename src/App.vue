<template>
  <v-app id="app">
    <!-- <v-navigation-drawer app>
      Stuff
    </v-navigation-drawer> -->
    <app-header></app-header>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-navigation-drawer color="primary" app dark absolute temporary v-model="$store.state.drawer">
      <v-list two-line>
        <v-list-item class="text-button" to="/">Home</v-list-item>
        <v-list-item class="text-button" to="/read">Posts</v-list-item>
        <v-list-item class="text-button" v-if="$store.state.user.uid" @click="handleSignInOut(false)">Sign Out</v-list-item>
        <v-list-item class="text-button" v-else @click="handleSignInOut(true)">Sign In</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { signinout } from "@/mixins/signinout";
export default {
  name: 'App',
  mixins: [signinout],
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  created() {
      this.$store.dispatch('retrievePosts')
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === 'xs'
    }
  },
  methods: {
    handleSignInOut(val) {
      this[val ? 'signIn' : 'signOut']().then(() => {
        this.$store.dispatch('setDrawer', false)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #E7E7E4;
}
.who-am-i {
  font-style: italic;
  text-decoration: underline;
  padding: 2px 5px;
  background-color: var(--v-accent-base);
}
@media screen and (max-width: 600px) {
  .container {
    padding: 0px !important;
  }
}
</style>