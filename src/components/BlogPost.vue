<template>
    <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
        v-if="loading"
    ></v-progress-linear>
    <div v-else>
        <div class="white pa-8 rounded flex text-left" style="position: relative">
            <div v-html="computedMarkdown"></div>
            <div style="position: absolute; top: 0; right: 0;" class="pa-2">
                <v-btn v-if="user.isAdmin" icon @click="editPost"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn v-if="user.isAdmin" icon @click="deletePost"><v-icon>mdi-delete</v-icon></v-btn>
            </div>
        </div>
        <div class="my-2 d-flex justify-space-between" >
            <div style="min-width: 50%" v-show="niceDate">Posted on {{ niceDate }}</div>
            <div v-if="tags && tags.length > 0" class="text-right">
                <v-chip
                    v-for="tag in tags"
                    :key="`tag-${tag}`"
                    :to="`/read?tag=${tag}`"
                    color="primary"
                    class="ml-1 mb-1"
                    label
                    link
                >
                    #{{tag}}
                </v-chip>
            </div>
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import DOMPurify from 'dompurify'
export default {
    props: ['postSlug'],
    computed: {
        computedMarkdown() {
            return this.post ? DOMPurify.sanitize(marked('# ' + this.post.title + '\n\n' + this.post.contents)) : 'Loading post'
        },
        niceDate() {
            return this.post ? new Date(this.post.timestamp).toDateString() : ''
        },
        tags() {
            return this.post ? this.post.tags : []
        },
        post() {
            return this.$store.getters.getPostBySlug(this.postSlug)
        },
        user() {
            return this.$store.state.user
        },
        loading() {
            return this.$store.state.posts.loading
        }
    },
    methods: {
        editPost() {
            this.$router.push(`/write/${this.post.id}`)
        },
        deletePost() {
            if (window.confirm('Are you sure you want to delete this post?')) {
                this.$store.dispatch('deletePost', this.post.id).then(() => {
                    this.$router.push('/read')
                })
            }
        }
    }
}
</script>