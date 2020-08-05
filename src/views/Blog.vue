<template>
    <div v-if="$route.params.post">
        <blog-post :postId="$route.params.post"></blog-post>
    </div>
    <div v-else>
        <h1>Write Post</h1>
        
        <v-textarea class="monospace" auto-grow placeholder="Write your markdown here" v-model="contents"></v-textarea>
        <v-btn @click="downloadMarkdown">Save Markdown</v-btn>
        <div v-html="computedMarkdown"></div>
    </div>
</template>

<style scoped>
.monospace {
    font-family: monospace;
}
</style>

<script>
import marked from 'marked'
import BlogPost from '@/components/BlogPost'
export default {
    components: {
        'blog-post': BlogPost
    },
    data() {
        return {
            contents: '# Title\n\nContents'
        }
    },
    computed: {
        computedMarkdown() {
            return marked(this.contents)
        }
    },
    methods: {
        downloadMarkdown() {
            const file = new Blob([this.contents], {type: 'text/plain'})
            const a = document.createElement('a')
            const url = URL.createObjectURL(file)
            a.href = url
            a.download = 'blog-post.md'
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()
            setTimeout(function() {
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
            }, 0)
        }
    }
}
</script>