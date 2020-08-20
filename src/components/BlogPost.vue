<template>
    <div>
        <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
            v-if="loading"
          ></v-progress-linear>
        <v-container v-else>
            <v-row>
                <v-col class="white pa-8 rounded flex text-justify">
                    <div v-html="computedMarkdown"></div>
                </v-col>
            </v-row>
            <v-row class="my-2" justify="space-between">
                <v-col cols="4">
                <div v-show="niceDate">Posted on {{ niceDate }}</div>
                </v-col>
                <v-col v-if="tags && tags.length > 0" cols="6" class="text-right">
                    <v-chip
                        v-for="tag in tags"
                        :key="`tag-${tag}`"
                        :to="`/blog/tag/${tag}`"
                        color="primary"
                        class="ma-1"
                        label
                        link
                    >
                        #{{tag}}
                    </v-chip>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
    props: ['postId'],
    computed: {
        computedMarkdown() {
            return this.post ? DOMPurify.sanitize(marked('# ' + this.post.title + '\n\n' + this.post.contents)) : 'Loading post'
        },
        niceDate() {
            return this.post ? new Date(this.post.timestamp).toDateString() : ''
        },
        tags() {
            return this.post ? this.post.tags : []
        },
        post() {
            return this.$store.getters.getPostBySlug(this.postId)
        },
        loading() {
            return this.$store.state.posts.loading
        }
    }
}
</script>