<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>I'm a <span class="who-am-i">developer</span>.</h1>
            </v-col>
        </v-row>
        <v-row>
        <!-- Add large, related image -->
            <v-col>
                <v-img height="200px" src="@/assets/img/code-large.jpg"></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="tldr">
                <v-card>
                    <v-card-title>The TL;DR</v-card-title>
                    <v-card-text>
                        <p>I've been coding in one form or another since 2008, more seriously since 2012, with an emphasis on webdev since 2016. There's a full list of the programming languages I've used below, but the ones I'm currently most comfortable with are modern <b>JavaScript</b> and <b>Python 3</b>.</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <!-- Add full descriptive text and examples of related works/links -->
            <v-col class="history">
                <v-card>
                    <v-container class="py-0 v-card__title">
                        <v-row @click="showHistory = !showHistory" style="cursor: pointer">
                            <v-card-title>The Backstory</v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn icon fab tile><v-icon>{{showHistory ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon></v-btn>
                        </v-row>
                    </v-container>
                    <v-card-text v-show="showHistory">
                    <p>My first experience with coding of any kind was when I was about 14. For the first time, I had access to the internet, and since that was around the time I started playing guitar properly, I went online to find tabs and sheet music that I could learn to play. As a direct result, I stumbled upon the forums of <a href="https://www.ultimate-guitar.com/">Ultimate Guitar</a>, and I made my first "internet friends". Back then, the site allowed users to include their own <b>HTML</b> and <b>CSS</b> on their profile pages in order to style it to their tastes. I had little idea of what I was doing, beyond tinkering with some copy-pasted code I'd found on someone else's page, but I tinkered with every line I could. It got to the point where some other users asked me to design their pages for them -- not many people, and almost never again after the first couple months, but it was exciting all the same.</p>
                    <p>I didn't realise I had taken my first steps into a much larger world (I didn't even know I was fiddling with two languages at once, much less what they were called), and it was a number of years before my next real foray past the walled gardens of tech. I was coming to the end of my school life, and looking to decide what I wanted to study in university. I had decided already that I wanted to keep up my French language skills, but I also wanted to find something that I thought would be new and interesting. My impetus for choosing Computer Science at the time was mostly based around the idea that, "Hey, I like the internet. That's gotta be similar, right?" I was wrong, but I'm glad for it nonetheless.</p>
                    <p>I started <a href="https://www.tcd.ie/courses/undergraduate/az/course.php?id=DUBMF-CSLA-2F09">my degree</a> in 2012, and learned the basics of <b>Java</b>, a tiny bit of <b>Perl</b> and <b>Prolog</b>, and even some <b>ARM Assembly</b>. As I came to the end of the first year, I was contacted by a cousin of mine, who (ever the entrepeneur) had a business idea, and since he knew I was studying Computer Science, he asked if I'd be able to build a website for him, which he would pay me to build. I said, "Of course!" and spent the next two days buried deep in forums and documentation pages as I got to grips with the fundamentals of <b>PHP</b>, <b>MySQL</b>, and <b>JQuery</b>, as well as learning how to properly use <b>HTML5</b> and <b>CSS3</b>. Unfortunately, I didn't know enough at that point to really make my cousin's film recommendation idea come to fruition, but it did teach me a lot about website design as it existed in around 2013. You can see my cousin's latest (and much more successful) venture <a href="https://dublininstagramtours.com/">here</a>.</p>
                    <p>Through the rest of my undergrad, I picked up a lot more <b>Java</b> and <b>Prolog</b>, as well as <b>C</b>, <b>C++</b> (with a little of the <a href="https://www.opengl.org/">OpenGL</a> framework), <b>Python</b> (2 and 3, as well as some popular libraries like <a href="https://www.nltk.org/">NLTK</a>), <b>Oracle SQL</b>, as well as a working familiarity with Linux systems due to writing some productivity scripts for myself, primarily using <b>Bash</b>. The courses I took were varied, from algorithms and data structures, to natural language processing, artificial intelligence, and graphics programming.</p>
                    <p>Immediately after completing my degree, I took an internship with a research group based in the same university. I worked on a project that was developing an expressive text-to-speech synthesis system (primarily in <b>Java</b>) using machine learning. I got a chance to expand my knowledge of web technologies, in particular <b>PHP</b> and <b>JavaScript</b> as I designed a responsive online interface for post-editing of automatically generated sentiment labels.</p>
                    <p>I began my PhD exploring the ordering and relations between events an times in narrative texts in 2016, and since then I've primarily worked with <b>Python 3</b>, though I've often used (and taught) <b>Prolog</b> and <b>Java</b> since then. I've also used this time to hugely extend my repetoire where web development is concerned, taking opportunities to learn vanilla <b>JavaScript</b>, both as a frontend language in the browser and backend as part of <b>Node</b>. I've also picked up an understanding of the <b>React</b> framework, and this site is built with <b>Vue</b>.</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.who-am-i {
    /* maybe different colour for each page */
    background-color: #D69B03;
}
.history p {
    text-align: left;
}
.v-card__text {
    max-height: 300px;
    overflow-y: auto;
}
</style>

<script>
export default {
    data() {
        return {
            showHistory: false
        }
    }
}
</script>