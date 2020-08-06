<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>I'm a <span class="who-am-i">researcher</span>.</h1>
            </v-col>
        </v-row>
        <v-row>
        <!-- Add large, related image -->
            <v-col>
                <v-img height="200px" src="@/assets/img/research-large.jpg"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" class="tldr">
                <v-card>
                    <v-card-title>The TL;DR</v-card-title>
                    <v-card-text>
                        <p>I'm currently finishing off a PhD looking into events and time in texts. My main areas of interest are natural language processing and artificial intelligence, though many subfields of linguistics fascinate me.</p>
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
    data() {
        return {
            showHistory: false
        }
    },
    computed: {
        blogPosts() {
            return list.filter(p => p.tags.includes('research'))
        }
    }
}
</script>