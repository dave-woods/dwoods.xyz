<template>
    <div v-if="postId">
        <v-container>
            <v-row>
                <v-col>
                    <blog-post :postId="postId"></blog-post>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center">
                    <v-btn key="see-all-posts-button" to="/blog/read">See all</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <div class="text-center" v-else-if="writing">
        <h1>Write Post{{ !saved ? ' *' : ''}}</h1>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" style="max-height: 400px; overflow-y: auto">
                    <v-textarea auto-grow class="monospace"  placeholder="Write your markdown here" v-model="contents"></v-textarea>
        <!-- Should maybe _.debounce the above -->
                </v-col>
                <v-col cols="12" sm="6" style="max-height: 400px; overflow-y: auto">
                    <div class="white pa-6 text-left" v-html="computedMarkdown"></div>
                </v-col>
            </v-row>
        </v-container>
        <v-btn key="save-text-button" @click="downloadMarkdown">Save Markdown</v-btn>
    </div>
    <div v-else>
        <v-container>
            <v-row>
                <v-col cols="12" :sm="tag ? 12 :6">
                    <v-card flat max-height="600" class="blog-card">
                        <v-list>
                            <v-list-item v-for="bp in blogPosts" :key="bp.id">
                            <v-card flat tile class="flex">
                                <router-link :to="`/blog/read/${bp.id}`"><v-card-title>{{ bp.title }}</v-card-title></router-link>
                                <v-card-subtitle>{{ bp.date }}</v-card-subtitle>
                                <v-card-text><p>{{ bp.description }}</p></v-card-text>
                            </v-card></v-list-item>
                        </v-list>
                    </v-card>
                    <div style="position: relative">
                        <v-btn fab absolute right bottom key="new-post-button" to="/blog/write">New</v-btn>
                    </div>
                </v-col>
                <v-col v-if="!tag" cols="12" sm="6">
                    <twitter-feed url="dwoodscs"  height="600"></twitter-feed>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
.monospace {
    font-family: monospace;
}
.blog-card {
    overflow-y: auto
}
.blog-card::-webkit-scrollbar {
    display: none;
}
</style>

<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
import list from '@/assets/meta/posts'
import BlogPost from '@/components/BlogPost'
import TwitterFeed from '@/components/TwitterFeed.vue'
export default {
    props: ['postId', 'writing', 'tag'],
    components: {
        'blog-post': BlogPost,
        'twitter-feed': TwitterFeed
    },
    data() {
        return {
            contents: '# Title\n\nContents',
            saved: true
        }
    },
    computed: {
        computedMarkdown() {
            return DOMPurify.sanitize(marked(this.contents))
        },
        blogPosts() {
            return this.tag ? list.filter(bp => bp.tags.includes(this.tag)) : list
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