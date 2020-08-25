<template>
    <v-container>
        <v-row>
            <v-col class="text-center">
                <h1>I'm a <span class="who-am-i">{{ whoAmI }}</span>.</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <!-- path prefix apparently has to be here and not in a variable... -->
                <!-- https://stackoverflow.com/questions/56806020/vue-cannot-find-the-dynamic-source-of-the-vuetify-v-img-element -->
                <v-img v-if="heroSrc" height="200px" :src="require('@/assets/img/' + heroSrc)"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" class="tldr">
                <v-card flat>
                    <v-card-title>The TL;DR</v-card-title>
                    <v-card-text>
                        <p>{{ tldr }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <post-list :postsList="blogPosts"></post-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import PostList from '@/components/PostList'
export default {
    props: ['sectionID'],
    components: {
        'post-list': PostList
    },
    data() {
        return {
            whoAmI: '',
            tldr: '',
            heroSrc: ''
        }
    },
    computed: {
        blogPosts() {
            return this.$store.getters.getPosts(this.sectionID)
        },
        section() {
            return this.$store.getters.getSectionByID(this.sectionID)
        }
    },
    mounted() {
        this.whoAmI = this.section?.whoAmI ?? ''
        this.tldr = this.section?.tldr ?? ''
        this.heroSrc = this.section?.heroSrc ?? ''
    }
}
</script>