import { postsCollection } from '@/firebase.js'
export default {
    state: {
        posts: [],
        loading: false
    },
    getters: {
        getPosts: (state) => tag => tag ? state.posts.filter(p => p.tags.includes(tag)) : state.posts,
        getPublishedPosts: (state) => tag => tag ? state.posts.filter(p => p.published && p.tags.includes(tag)) : state.posts.filter(p => p.published),
        getUnpublishedPostsByAuthor: (state) => author => state.posts.filter(p => !p.published && p.author === author),
        getPostBySlug: (state) => slug => state.posts.find(p => p.slug === slug && p.published),
        getPostByID: (state) => id => state.posts.find(p => p.id === id)
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        addPost(state, newPost) {
            state.posts = [newPost, ...state.posts]
        },
        deletePost(state, postID) {
            state.posts = state.posts.filter(p => p.id !== postID)
        },
        updatePost(state, { id, data }) {
            Object.assign(state.posts.find(p => p.id === id), data)
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
            return new Promise((resolve) => {
                postsCollection.add({
                    ...newPost
                }).then(docRef => {
                    commit('addPost', {
                        id: docRef.id,
                        ...newPost
                    })
                    resolve(docRef.id)
                })
            })
        },
        deletePost({ commit }, postID) {
            postsCollection.doc(postID).delete().then(() => {
                commit('deletePost', postID)
            })
        },
        updatePost({ commit }, { id, data }) {
            postsCollection.doc(id).update(data).then(() => {
                commit('updatePost', { id, data })
            })
        }
    }
}