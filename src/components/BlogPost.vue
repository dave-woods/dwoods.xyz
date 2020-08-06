<template>
    <div>
        <div v-html="computedMarkdown"></div>
        <hr/>
        <div>{{ postDate }}</div>
        <div v-if="postTags && postTags.length > 0">
            <router-link class="primary white--text pa-1 ma-2" v-for="tag in postTags" :to="`/section/${tag}`" :key="`tag-${tag}`">+ {{tag}}</router-link>
        </div>
        <hr/>
    </div>
</template>

<script>
import marked from 'marked'
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
            return marked(this.contents)
        }
    },
    methods: {
        async loadPost() {
            await import(`raw-loader!@/assets/posts/${this.postId}.md`)
            .then(m => {
                this.contents = marked(m.default)
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