export const signinout = {
    methods: {
        signIn() {
            return this.$store.dispatch('login')
        },
        signOut() {
            return this.$store.dispatch('logout').then(() => {
                this.$router.push('/')
            })
        }
    }
}