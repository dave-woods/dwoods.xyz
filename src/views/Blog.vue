<template>
    <v-container>
        <v-row no-gutters>
            <v-col>
                <blog-post v-if="postSlug" :postSlug="postSlug"></blog-post>
                <post-list v-else :postsList="drafts ? draftsList : postsList" :drafts="drafts" :loading="loading"></post-list>
                <div v-if="!postSlug && user.isAdmin" style="position: relative; margin-top: 64px;">
                    <v-btn v-if="draftsList.length > 0 && !drafts" absolute left bottom key="drafts-button" to="/read?drafts=true">Drafts</v-btn>
                    <v-btn absolute right bottom key="new-post-button" to="/write">New</v-btn>
                </div>
            </v-col>
            <!-- <v-col v-if="!tag" cols="12" sm="6">
                <twitter-feed url="dwoodscs"  height="600"></twitter-feed>
            </v-col> -->
        </v-row>
        <v-row v-if="postSlug || tag || drafts" :class="$vuetify.breakpoint.name === 'xs' ? 'mb-2' : ''">
            <v-col class="text-center">
                <v-btn key="see-all-posts-button" to="/read">See all posts</v-btn>
            </v-col>
        </v-row>
    </v-container>
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
import PostList from '@/components/PostList'
// import TwitterFeed from '@/components/TwitterFeed.vue'
export default {
    props: ['postSlug', 'tag', 'drafts'],
    components: {
        'blog-post': BlogPost,
        'post-list': PostList
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
        draftsList() {
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
            // sanitise before saving?
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
                    .catch(err => reject(err))
                } else {
                    this.$store.dispatch('addPost', payload)
                    .then(postID => {
                        this.postID = postID
                        this.saved = true
                        resolve()
                    })
                    .catch(err => reject(err))
                }
            })
        },
        publishPost() {
            if (!window.confirm('Are you sure?')) return
            this.savePost(true).then(() => {
                let s = this.slug
                this.resetFields()
                this.$router.push(`/read/${s}`)
            })
            .catch(err => {
                console.error(err)
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