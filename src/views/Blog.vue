<template>
    <div v-if="postId">
        <blog-post :postId="postId"></blog-post>
        <v-btn key="see-all-posts-button" to="/blog/read">See all</v-btn>
    </div>
    <div v-else-if="writing">
        <h1>Write Post{{ !saved ? ' *' : ''}}</h1>
        
        <v-textarea class="monospace" auto-grow placeholder="Write your markdown here" v-model="contents"></v-textarea>
        <v-btn key="save-text-button" @click="downloadMarkdown">Save Markdown</v-btn>
        <div v-html="computedMarkdown"></div>
    </div>
    <div v-else>
        <v-list>
            <v-list-item v-for="bp in blogPosts" :key="bp.id">
            <v-card>
                <router-link :to="`/blog/read/${bp.id}`"><v-card-title>{{ bp.title }}</v-card-title></router-link>
                <v-card-subtitle>{{ bp.date }}</v-card-subtitle>
                <v-card-text>{{ bp.description }}</v-card-text>
            </v-card></v-list-item>
        </v-list>
        <v-btn key="new-post-button" to="/blog/write">New</v-btn>
    </div>
</template>

<style scoped>
.monospace {
    font-family: monospace;
}
</style>

<script>
import marked from 'marked'
import list from '@/assets/meta/posts'
import BlogPost from '@/components/BlogPost'
export default {
    props: ['postId', 'writing'],
    components: {
        'blog-post': BlogPost
    },
    data() {
        return {
            contents: '# Title\n\nContents',
            saved: true
        }
    },
    computed: {
        computedMarkdown() {
            return marked(this.contents)
        },
        blogPosts() {
            return list
        }
    },
    watch: {
        contents: function() {
            if (this.writing) this.saved = false
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
            setTimeout(() => {
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
                this.saved = true
            }, 0)
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.saved || window.confirm('Do you really want to leave? you have unsaved changes!')) {
            next()
        } else {
            next(false)
        }
    }
}
</script>