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
                <div>Posted on {{ niceDate }}</div>
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
    data() {
        return {
            contents: 'Loading post',
            postDate: '',
            postTags: null
        }
    },
    computed: {
        computedMarkdown() {
            return DOMPurify.sanitize(marked(this.contents))
        },
        niceDate() {
            return new Date(this.postDate).toDateString()
        }
    },
    methods: {
        async loadPost() {
            await import(`raw-loader!@/assets/posts/${this.postId}.md`)
            .then(m => {
                this.contents = DOMPurify.sanitize(marked(m.default))
            })
            .catch (() => {
                this.contents = 'Error: post not found'
            })
            await import('@/assets/meta/posts')
            .then(data => data.default.find(p => p.id === this.postId))
            .then(({date, tags}) => {
                this.postDate = date
                this.postTags = tags
            })
        }
    },
    created() {
        this.loadPost()
    }
}
</script>