import { postsCollection } from '@/firebase.js'
export default {
    state: {
        posts: [],
        loading: false
    },
    getters: {
        getPosts: (state) => tag => tag ? state.posts.filter(p => p.tags.includes(tag)) : state.posts,
        getPostBySlug: (state) => slug => state.posts.find(p => p.slug === slug)
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        addPost(state, newPost) {
            state.posts = [newPost, ...state.posts]
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    actions: {
        retrievePosts({ commit }) {
            commit('setLoading', true)
            postsCollection.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                let postsArray = []
                snapshot.forEach(doc => {
                    doc
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
        }
    }
}