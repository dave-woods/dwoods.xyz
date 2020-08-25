<template>
    <v-app-bar app absolute id="site-header">
        <router-link to="/"><v-toolbar-title style="color: #E7E7E4; letter-spacing: 3px;">David Woods</v-toolbar-title></router-link>
        <v-spacer></v-spacer>
        <v-btn dark text tile height="100%" to="/read">Posts</v-btn>
        <v-btn dark text tile height="100%" v-if="user" @click="logout">Sign Out</v-btn>
        <v-btn dark text tile height="100%" v-else @click="login">Sign In</v-btn>
        <router-link to="/"><v-img src="@/assets/logo.png" max-height="64px" max-width="64px" contain class="mx-2"></v-img></router-link>
    </v-app-bar>
</template>

<style lang="scss">
#site-header {
    background: linear-gradient(to right, var(--v-primary-base), var(--v-accent-base));

    .v-toolbar__content {
        justify-content: space-between;

        a {
            text-decoration: none;
        }
    }

    @media screen and (max-width: 960px) {
        .v-image {
            max-height: 56px !important;
            max-width: 56px !important;
        }
    }
}
</style>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user.uid
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login')
        },
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push('/')
            })
        }
    }
    
}
</script>