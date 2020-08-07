<template>
    <v-container class="text-center">
        <v-row>
            <v-col cols="12">
                <h1 style="margin: auto">Hi! I'm David.</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="9"  md="6">
                <p>I have a mildly eclectic group of interests, so I've decided to create a hub to talk about some of them here. Have a look around, and maybe you'll find something that catches your eye. If you do, feel free to get in touch for a chat!</p>
                <h4 style="margin: auto">I'm a learner. I'm a creator. I'm a teacher.</h4>
                <p>I love to seek out new knowledge from all kinds of places, and then to take apart what I've found, and construct new things from the pieces, then pass on what I've discovered along the way to anyone willing to listen.</p>
            </v-col>
            <v-col cols="12" sm="3" md="2" style="position: relative; margin: auto">
                <v-img src="@/assets/img/headshot-transparent.png" max-width="120px" contain class="rounded-lg" style="margin: auto; margin-top: -50px"></v-img>
                <span class="text-h5 font-weight-black photo-label">Me!</span>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row class="interest-row">
            <v-col md="2" sm="12" cols="12" align-self="center"><h3><router-link :to="`/section/development`">Developer</router-link></h3></v-col>
            <v-col md="8" sm="12" cols="12" style="text-align: left">
                <p>I've been writing code in a vast array of languages for close to a decade, from academic tools in Java and Python to modern web dev in JavaScript.</p>
                <p>See the other languages I'm comfortable with, and some projects I've been involved with. <v-btn to="/section/development" tile text><v-icon large>mdi-hand-pointing-right</v-icon></v-btn></p>
            </v-col>
            <v-col md="2" align-self="center">
                <!-- <v-icon color="primary" x-large>mdi-code-braces</v-icon> -->
                <v-img max-height="150px" src="@/assets/img/code-large.jpg"></v-img>
            </v-col>
            <!-- TODO: Add small image of something related to coding -->
        </v-row>
        <v-row class="interest-row">
            <v-col md="2" sm="12" cols="12" align-self="center"><h3><router-link :to="`/section/music`">Musician</router-link></h3></v-col>
            <v-col md="8" sm="12" cols="12" style="text-align: left">
            <p>A love of listening to and playing music is something I inherited from my dad, and though my go-to is normally a guitar, I've picked up many different instruments over the years.</p>
            <p>Check out what I like to play, and who inspired me. <v-btn to="/section/music" tile text><v-icon large>mdi-hand-pointing-right</v-icon></v-btn></p>
            </v-col>
            <v-col md="2" align-self="center">
                <!-- <v-icon color="primary" x-large>mdi-music</v-icon> -->
                <v-img max-height="150px" src="@/assets/img/music-large.jpg"></v-img>
            </v-col>
            <!-- TODO: Add small image of something related to music -->
        </v-row>
        <v-row class="interest-row">
            <v-col md="2" sm="12" cols="12" align-self="center"><h3><router-link :to="`/section/research`">Researcher</router-link></h3></v-col>
            <v-col md="8" sm="12" cols="12" style="text-align: left">
            <p>I've been in some kind of education system since I was 4 years old, most recently while undertaking a PhD on computational methods for representation of events and temporality in text.</p>
            <p>Read an overview of my research interests, and find links to my publications. <v-btn to="/section/research" tile text><v-icon large>mdi-hand-pointing-right</v-icon></v-btn></p>
            </v-col>
            <v-col md="2" align-self="center">
                <v-img max-height="150px" src="@/assets/img/research-large.jpg"></v-img>
            </v-col>
            <!-- TODO: Add small image of something related to research -->
        </v-row>
        <v-row class="interest-row">
            <v-col md="2" sm="12" cols="12" align-self="center"><h3><router-link :to="`/section/trampolining`">Trampolinist</router-link></h3></v-col>
            <v-col md="8" sm="12" cols="12" style="text-align: left">
            <p>This one might seem a little out of nowhere, but I found the sport of trampolining in 2012, and I fell for it hard. I'm now a qualified coach as well as still training as a gymnast.</p>
            <p>Have a look at my history with bouncing. <v-btn to="/section/trampolining" tile text><v-icon large>mdi-hand-pointing-right</v-icon></v-btn></p>
            </v-col>
            <v-col md="2" align-self="center">
                <v-img max-height="150px" src="@/assets/img/trampoline-large.jpg"></v-img>
            </v-col>
            <!-- TODO: Add small image of something related to trampolining -->
        </v-row>
        <v-row class="interest-row">
            <v-col md="2" sm="12" cols="12" align-self="center"><h3><router-link :to="`/section/visual`">Visual Artist</router-link></h3></v-col>
            <v-col md="8" sm="12" cols="12" style="text-align: left">
            <p><a href="https://www.instagram.com/ferguswoods_">My brother</a>'s always been the real artist of the family, but I occasionally enjoy dabbling with sketching (mostly cartoon-style) and photo-manipulation.</p>
            <p>Browse some of the pieces I've made. <v-btn to="/section/visual" tile text><v-icon large>mdi-hand-pointing-right</v-icon></v-btn></p>
            </v-col>
            <v-col md="2" align-self="center">
                <v-img max-height="150px" src="@/assets/img/art-large.jpg"></v-img>
            </v-col>
            <!-- TODO: Add small image of something related to visual arts -->
        </v-row>
        <!-- TODO: fill in rows for other link -->
        <!-- possibly use different colours for each -->
    </v-container>
</template>

<style scoped lang="scss">
.interest-row {
    min-height: 100px;
    border-top: 5px solid;
    border-image: linear-gradient(to right, var(--v-primary-base), var(--v-accent-base)) 1;
    a.v-btn {
        color: var(--v-primary-base);
    }
}
.photo-label {
    display: none;
    position: absolute;
    top: -10px;
    right: 0;
    transform: rotateZ(30deg);
    @media screen and (max-width: 800px) {
        position: initial;
        // display: initial;
    }
}
</style>

<script>
export default {
    data() {
        return {
            links: ['development', 'music', 'research', 'trampolining', 'visual']
        }
    }
}
</script>