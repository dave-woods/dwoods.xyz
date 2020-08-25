<template>
    <v-card flat max-height="600" class="blog-card">
        <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
            v-if="loading"
        ></v-progress-linear>
        <v-card-title v-if="!loading && !postsList.length">No posts found</v-card-title>
        <v-card-text v-if="!loading && !postsList.length"><router-link to="/read">Go back</router-link></v-card-text>
        <v-list>
            <v-list-item v-for="post in postsList" :key="post.id">
                <v-card flat tile class="flex">
                    <router-link :to="drafts ? `/write/${post.id}` : `/read/${post.slug}`"><v-card-title>{{ post.title }}</v-card-title></router-link>
                    <v-card-subtitle>{{ new Date(post.timestamp).toLocaleDateString('en-ie') }}</v-card-subtitle>
                    <v-card-text>
                        <p>{{ post.description }}</p>
                        <p style="overflow-x: auto"><v-chip
                        v-for="(t, i) in post.tags"
                        :key="`${post.id}-${i}`"
                        :to="`/read?tag=${t}`"
                        color="primary"
                        class="mr-1"
                        label
                        link
                    >#{{ t }}</v-chip></p>
                    </v-card-text>
                </v-card>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: ['loading', 'postsList', 'drafts']
}
</script>