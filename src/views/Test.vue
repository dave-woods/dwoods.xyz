<template>
<div class="body">
    <div class="main">
        <h1>Hi. I'm David.</h1>
        <transition name="slide-fade"><h2 :key="jobTitle">Need a <span>{{ jobTitle }}</span>?</h2></transition>

        <div class="hero">
            <img src="@/assets/logo.png" alt="site-logo"/>
        </div>
    </div>
    <div class="footer" ref="footer">
        <router-link class="footer-item active" to="/section/development"><v-icon dark>mdi-code-tags</v-icon></router-link>
        <router-link class="footer-item" to="/section/research"><v-icon dark>mdi-feature-search-outline</v-icon></router-link>
        <router-link class="footer-item" to="/section/music"><v-icon dark>mdi-music</v-icon></router-link>
        <router-link class="footer-item" to="/section/trampolining"><v-icon dark>mdi-run</v-icon></router-link>
        <router-link class="footer-item" to="/section/visual"><v-icon dark>mdi-brush</v-icon></router-link>
    </div>
</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@900&family=Roboto:wght@400;700&display=swap');
</style>

<style lang="scss">
body {
    overflow: hidden !important;
}
* {
    padding: 0 !important;
    margin: 0 !important;
    font-family:'Roboto', 'Open Sans', sans-serif;
}
#app {
    background: white !important;
}
header, footer {
    display: none !important;
}
</style>

<style lang="scss" scoped>
.body {
    height: 100%;
    width: 100vw;
    position: relative;
}
.main {
    height: calc(100vh - calc(100vh / 12));
    display: grid;
    grid-template-areas: ". hero hero"
                         "head1 hero hero"
                         "head2 hero hero"
                         ". hero hero";
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    margin: 0 6em !important;
}
h1, h2 {
    justify-self: start;
    align-self: center;
}
h1 {
    font-family: 'Roboto Slab', serif;
    font-weight: 900;
    font-size: 4em;
    grid-area: head1;
}
h2 {
    font-weight: 400;
    grid-area: head2;
    color: #2C3E50AA;
    width: max-content;
    span {
        display: inline-block;
        font-weight: 700;
        color: #606F82FF;
    }
}
.slide-fade-enter {
    transform: translateY(-1rem);
    opacity: 0;
}
.slide-fade-enter-to {
    opacity: 1;
}
.slide-fade-enter-active {
    transition: all 500ms ease-in 500ms;
}
.slide-fade-leave-active {
    transition: all 500ms ease-in;
}
.slide-fade-leave-to {
    transform: translateY(1rem);
    opacity: 0;
}
.hero {
    grid-area: hero;
    position: relative;
    place-items: center;
    display: flex;

    img {
        height: 100%;
        margin: auto !important;
    }
}

.footer {
    height: calc(100vh / 12);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
.footer-item {
    grid-column: span 1;
    background-color: #1E1E1E;
    place-content: center;
    display: flex;
    text-decoration: none;
    transition: background-color 250ms, border-color 1000ms ease-in-out;
    position: relative;
    border-top: 5px solid transparent;

    &:hover, &:focus {
        background-color: #A73A3A;
    }
    &.active {
        border-top: 5px solid #A73A3A;
    }
}

@media (max-width: 900px) {
    .main {
        grid-template-areas: "head1"
                            "hero"
                            "head2";
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(3, 0.5fr);
        margin: 0 !important;
        height: max-content;
    }
    h1, h2 {
        justify-self: center;
        text-align: center;
        padding: 1rem 0 !important;
    }
}
</style>

<script>
export default {
    data() {
        return {
            jobTitleIndex: 0,
            jobTitles: ['developer', 'researcher', 'musician', 'trampoline coach', 'digital artist'],
            jobLinks: null,
            interval: null
        }
    },
    computed: {
        jobTitle() {
            return this.jobTitles[this.jobTitleIndex]
        }
    },
    mounted() {
        this.jobLinks = this.$refs['footer'].querySelectorAll('.footer-item')
        this.interval = setInterval(() => {
            if (this.jobLinks) this.jobLinks[this.jobTitleIndex].classList.remove('active')
            this.jobTitleIndex = ((this.jobTitleIndex + 1) >= this.jobTitles.length) ? 0 : (this.jobTitleIndex + 1)
            if (this.jobLinks) this.jobLinks[this.jobTitleIndex].classList.add('active')
        }, 3000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    }
}
</script>