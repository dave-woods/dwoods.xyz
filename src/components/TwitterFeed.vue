<template>
    <div>
        <a
            class="twitter-timeline"
            :href="`https://twitter.com/${url}?ref_src=twsrc%5Etfw`"
            :data-theme="dark ? 'dark' : 'light'"
            :data-height="height"
            :data-width="width"
            data-chrome="nofooter noscrollbar"
        >Tweets by {{url}}</a>
    </div>
</template>

<script>
export default {
    props: ['url', 'dark', 'height', 'width'],
    created() {
        let twitterExtScript = document.createElement('script')
        twitterExtScript.setAttribute('async', '')
        twitterExtScript.setAttribute('charset', 'utf-8')
        twitterExtScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
        document.head.appendChild(twitterExtScript)
    }
}
</script>