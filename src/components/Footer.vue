<template>
    <v-footer app absolute dark min-height="100px" padless>
        <v-card color="transparent" flat tile class="flex">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn v-for="link in links" :key="link.id" class="mx-4" dark icon :href="link.url">
                    <v-icon size="24px">{{ link.icon }}</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="py-2 white--text text-center">
                © {{ new Date().getFullYear() }} — <strong>David Woods</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    data() {
        return {
            links: []
        }
    },
    methods: {
        fetchLinks() {
            import('@/assets/meta/socialMedia')
            .then(data => {
                this.links = [...data.default]
            })
        }
    },
    created() {
        this.fetchLinks()
    }
}
</script>