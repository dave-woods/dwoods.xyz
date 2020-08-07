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
                <v-card>
                    <v-card-title>The TL;DR</v-card-title>
                    <v-card-text>
                        <p>{{ tldr }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Posts</v-card-title>
                    <v-list>
                        <v-list-item v-for="bp in blogPosts" :key="bp.id">
                        <v-card flat>
                            <router-link :to="`/blog/read/${bp.id}`"><v-card-title>{{ bp.title }}</v-card-title></router-link>
                            <v-card-subtitle>{{ bp.date }}</v-card-subtitle>
                            <v-card-text>{{ bp.description }}</v-card-text>
                        </v-card></v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import list from '@/assets/meta/posts'
export default {
    props: ['sectionId'],
    data() {
        return {
            whoAmI: '',
            tldr: '',
            heroSrc: ''
        }
    },
    computed: {
        blogPosts() {
            return list.filter(p => p.tags.includes(this.sectionId))
        }
    },
    methods: {
        fetchSectionData() {
            import('@/assets/meta/sections')
            .then(data => data.default.find(s => s.id === this.sectionId))
            .then(section => {
                this.whoAmI = section.whoAmI
                this.tldr = section.tldr
                this.heroSrc = section.heroSrc
            })
        }
    },
    created() {
        this.fetchSectionData()
    }
}
</script>