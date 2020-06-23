<template>
    <v-app-bar app absolute id="site-header">
        <v-toolbar-title>David Woods</v-toolbar-title>
        <router-link to="/"><v-img src="@/assets/logo.png" max-height="64px" max-width="64px" contain class="mx-2"></v-img></router-link>
    </v-app-bar>
</template>

<style lang="scss">
#site-header {
    background: linear-gradient(to right, var(--v-primary-base), var(--v-accent-base));

    .v-toolbar__content {
        justify-content: space-between;
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
    
}
</script>