<template>
    <div v-html="computedMarkdown"></div>
</template>

<script>
import marked from 'marked'
export default {
    props: ['postId'],
    data() {
        return {
            contents: 'Loading post'
        }
    },
    computed: {
        computedMarkdown() {
            return marked(this.contents)
        }
    },
    methods: {
        loadPost() {
            import(`raw-loader!@/assets/posts/${this.postId}.md`)
            .then(m => {
                this.contents = marked(m.default)
            })
            .catch (() => {
                this.contents = 'Error: post not found'
            })
        }
    },
    created() {
        this.loadPost()
    }
}
</script>