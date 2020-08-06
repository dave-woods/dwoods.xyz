<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>I'm a <span class="who-am-i">developer</span>.</h1>
            </v-col>
        </v-row>
        <v-row>
        <!-- Add large, related image -->
            <v-col>
                <v-img height="200px" src="@/assets/img/code-large.jpg"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" class="tldr">
                <v-card>
                    <v-card-title>The TL;DR</v-card-title>
                    <v-card-text>
                        <p>I've been coding in one form or another since 2008, more seriously since 2012, with an emphasis on webdev since 2016. There's a full list of the programming languages I've used below, but the ones I'm currently most comfortable with are modern <b>JavaScript</b> and <b>Python 3</b>.</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <!-- Add full descriptive text and examples of related works/links -->
            <!-- <v-col cols="12" sm="6" class="history">
                <v-card>
                    <v-container class="py-0 v-card__title">
                        <v-row @click="showHistory = !showHistory" style="cursor: pointer">
                            <v-card-title>The Backstory</v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn icon fab tile><v-icon>{{showHistory ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon></v-btn>
                        </v-row>
                    </v-container>
                    <v-card-text v-show="showHistory">
                    
                    </v-card-text>
                </v-card>
            </v-col> -->
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

<style scoped>
.history p {
    text-align: left;
}
.v-card__text {
    max-height: 300px;
    overflow-y: auto;
}
</style>

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
            return list.filter(p => p.tags.includes('development'))
        }
    }
}
</script>