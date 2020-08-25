<template>
    <div v-if="postSlug">
        <v-container>
            <v-row>
                <v-col>
                    <!-- Load post here and pass in, rather than slug -->
                    <blog-post :postSlug="postSlug"></blog-post>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center">
                    <v-btn key="see-all-posts-button" to="/blog/read">See all</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <v-form class="text-center" v-model="formValid" v-else-if="writing">
        <h1>Write Post{{ !saved ? ' *' : ''}}</h1>
        <v-container>
            <v-row dense>
                <v-col><v-text-field v-model="title" placeholder="Post title" :rules="[rules.required, rules.uniqueTitle]"></v-text-field></v-col>
            </v-row>
            <v-row dense>
                <v-col><v-text-field v-model="description" placeholder="Post description"></v-text-field></v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" style="max-height: 400px; overflow-y: auto">
                    <v-textarea auto-grow class="monospace"  placeholder="Write your markdown here" v-model="contents"></v-textarea>
        <!-- Should maybe _.debounce the above -->
                </v-col>
                <v-col cols="12" sm="6" style="max-height: 400px; overflow-y: auto">
                    <div class="white pa-6 text-left" style="min-height: 120px" v-html="computedMarkdown"></div>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col><v-text-field v-model="tags" placeholder="Post tags"></v-text-field></v-col>
            </v-row>
        </v-container>
        <div class="d-flex justify-center">
            <v-btn key="save-post-button" @click="savePost(false)" class="mx-2">Save</v-btn>
            <v-btn :disabled="!formValid" key="publish-post-button" @click="publishPost" class="mx-2">Publish</v-btn>
        </div>
    </v-form>
    <div v-else>
        <v-container>
            <v-row>
                <v-col>
                    <v-card flat max-height="600" class="blog-card">
                        <v-progress-linear
                            color="primary"
                            indeterminate
                            rounded
                            height="6"
                            v-if="loading"
                        ></v-progress-linear>
                        <v-card-title v-if="!loading && !postsList.length">No posts found</v-card-title>
                        <v-card-text v-if="!loading && !postsList.length"><router-link to="/blog">Go back</router-link></v-card-text>
                        <v-list>
                            <v-list-item v-for="bp in postsList" :key="bp.id">
                            <v-card flat tile class="flex">
                                <router-link :to="`/blog/read/${bp.slug}`"><v-card-title>{{ bp.title }}</v-card-title></router-link>
                                <v-card-subtitle>{{ new Date(bp.timestamp).toLocaleDateString('en-ie') }}</v-card-subtitle>
                                <v-card-text><p>{{ bp.description }}</p></v-card-text>
                            </v-card></v-list-item>
                        </v-list>
                    </v-card>
                    <div v-if="user.isAdmin" style="position: relative">
                        <v-btn v-if="drafts.length > 0" fab absolute left bottom key="drafts-button">Drafts</v-btn>
                        <v-btn fab absolute right bottom key="new-post-button" to="/blog/write">New</v-btn>
                    </div>
                </v-col>
                <!-- <v-col v-if="!tag" cols="12" sm="6">
                    <twitter-feed url="dwoodscs"  height="600"></twitter-feed>
                </v-col> -->
            </v-row>
            <v-row v-if="tag">
                <v-col class="text-center">
                    <v-btn key="see-all-posts-button" to="/blog/read">See all</v-btn>
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
import BlogPost from '@/components/BlogPost'
// import TwitterFeed from '@/components/TwitterFeed.vue'
export default {
    props: ['postSlug', 'writing', 'tag'],
    components: {
        'blog-post': BlogPost,
        // 'twitter-feed': TwitterFeed
    },
    data() {
        return {
            contents: '',
            title: '',
            description: '',
            tags: '',
            saved: true,
            rules: {
                required: value => !!value || 'Required',
                uniqueTitle: () => this.$store.getters.getPostBySlug(this.slug)?.published ? "A post already exists with this title." : true
            },
            formValid: false,
            postID: ''
        }
    },
    computed: {
        computedMarkdown() {
            return DOMPurify.sanitize(marked('# ' + this.title + '\n\n' + this.contents))
        },
        postsList() {
            return this.$store.getters.getPublishedPosts(this.tag)
        },
        drafts() {
            return this.$store.getters.getUnpublishedPostsByAuthor(this.user.uid)
        },
        slug() {
            return this.quickSanitise(this.title).toLowerCase().replace(/\s+/g, '-')
        },
        tagList() {
            return this.tags.toLowerCase().split(/,\s*/).map(this.quickSanitise).filter(t => t !== '')
        },
        loading() {
            return this.$store.state.posts.loading
        },
        user() {
            return this.$store.state.user
        }
    },
    watch: {
        contents: function() {
            if (this.writing) this.saved = false
        }
    },
    methods: {
        savePost(published = false) {
            const payload = {
                title: this.title,
                description: this.description,
                timestamp: Date.now(),
                slug: this.slug,
                contents: this.contents,
                tags: this.tagList,
                author: this.user.uid,
                published
            }
            return new Promise((resolve, reject) => {
                if (this.postID) {
                    this.$store.dispatch('updatePost', {id: this.postID, data: payload}) //maybe reduce payload to just changed data
                    .then(() => {
                        this.saved = true
                        resolve()
                    })
                } else {
                    this.$store.dispatch('addPost', payload)
                    .then(postID => {
                        this.postID = postID
                        this.saved = true
                        resolve()
                    })
                }
            })
        },
        publishPost() {
            if (!window.confirm('Are you sure?')) return
            this.savePost(true).then(() => {
                let s = this.slug
                this.resetFields()
                this.$router.push(`/blog/read/${s}`)
            })
        },
        resetFields() {
            this.saved = true
            this.title = ''
            this.description = ''
            this.contents = ''
            this.tags = ''
            this.postID = ''
        },
        // mixin?
        quickSanitise(string) {
            return string.replace(/[^a-zA-Z0-9 ]/g, '').trim()
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.saved || window.confirm('Do you really want to leave? You have unsaved changes!')) {
            this.resetFields()
            next()
        } else {
            next(false)
        }
    }
}
</script>