<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="white pa-8 rounded flex text-justify">
                    <div v-html="computedMarkdown"></div>
                </v-col>
            </v-row>
            <v-row class="my-2" justify="space-between">
                <v-col cols="4">
                <div v-show="niceDate">Posted on {{ niceDate }}</div>
                </v-col>
                <v-col v-if="postTags && postTags.length > 0" cols="6" class="text-right">
                    <v-chip
                        v-for="tag in postTags"
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
            return DOMPurify.sanitize(marked(this.postData?.contents || ''))
        },
        niceDate() {
            return this.postData && new Date(this.postData.timestamp).toLocaleDateString('en-ie')
        },
        postData() {
            return this.$store.getters.getPostBySlug(this.postId)
        },
        postTags() {
            return this.postData?.tags || []
        }
    }
}
</script>