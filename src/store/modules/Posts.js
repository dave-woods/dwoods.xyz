import { postsCollection } from '@/firebase.js'
export default {
    state: {
        posts: [],
        loading: false
    },
    getters: {
        getPosts: (state) => tag => tag ? state.posts.filter(p => p.tags.includes(tag)) : state.posts,
        getPublishedPosts: (state) => tag => tag ? state.posts.filter(p => p.published && p.tags.includes(tag)) : state.posts.filter(p => p.published),
        getUnpublishedPosts: (state) => tag => tag ? state.posts.filter(p => !p.published && p.tags.includes(tag)) : state.posts.filter(p => !p.published),
        getPostBySlug: (state) => slug => state.posts.find(p => p.slug === slug)
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        addPost(state, newPost) {
            console.log('add post')
            state.posts = [newPost, ...state.posts]
        },
        deletePost(state, postID) {
            state.posts = state.posts.filter(post => post.id !== postID)
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        retrievePosts({ commit }) {
            commit('setLoading', true)
            postsCollection.orderBy('timestamp', 'desc').get().then(snapshot => {
                let postsArray = []
                snapshot.forEach(doc => {
                    postsArray.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                commit('setLoading', false)
                commit('setPosts', postsArray)
            })
        },
        addPost({ commit }, newPost) {
            postsCollection.add({
                ...newPost
            }).then(docRef => {
                commit('addPost', {
                    id: docRef.id,
                    ...newPost
                })
            })
        },
        deletePost({ commit }, postID) {
            postsCollection.doc(postID).delete().then(() => {
                commit('deletePost', postID)
            })
        }
    }
}