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
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer
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
</style>
