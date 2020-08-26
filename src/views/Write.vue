<template>
    <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
        v-if="id && !postLoaded"
    ></v-progress-linear>
    <v-form v-else class="text-center" v-model="formValid">
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
</template>

<style scoped>
.monospace {
    font-family: monospace;
}
.container {
    padding: 12px !important;
}
</style>

<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
    props: ['id'],
    data() {
        return {
            contents: '',
            title: '',
            description: '',
            tags: '',
            saved: true,
            rules: {
                required: value => !!value || 'Required',
                uniqueTitle: () => !this.postID && this.$store.getters.getPostBySlug(this.slug)?.published ? "A post already exists with this title." : true
            },
            formValid: false,
            postID: '',
            postLoaded: false
        }
    },
    created() {
        if (this.id) {
            new Promise((resolve) => {
                let interval = setInterval(() => {
                    if (this.$store.state.posts.loaded) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 100);
            }).then(this.loadPost)
            .then(() => {
                this.postLoaded = true
                this.saved = true
            })
        }
    },
    computed: {
        computedMarkdown() {
            return DOMPurify.sanitize(marked('# ' + this.title + '\n\n' + this.contents))
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
        contents() {
            this.saved = false
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
        },
        async loadPost() {
            let post = this.$store.getters.getPostByID(this.id)
            if (post) {
                this.contents = post.contents
                this.title = post.title
                this.description = post.description
                this.tags = post.tags.join(', ')
                this.postID = this.id
            }
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