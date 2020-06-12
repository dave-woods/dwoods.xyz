<template>
    <v-container>
        <v-row>
            <h1 style="margin: auto">Hi! I'm David.</h1>
            <p>I have a mildly eclectic group of interests, so I've decided to create a hub to some of them here. Have a look around, and maybe you'll find something that catches your eye. If you do, feel free to get in touch for a chat!</p>
            <h4 style="margin: auto">I'm a learner. I'm a creator. I'm a teacher.</h4>
            <p>I love to seek out new knowledge from all kinds of places, and then to take apart what I've found, and construct new things from the pieces, then pass on what I've discovered along the way to anyone willing to listen.</p>
        </v-row>
        <v-row style="min-height: 100px; border-top: 1px solid black; background-color: #D69B03">
            <v-col cols="auto"><h3><router-link :to="`/development`">Development</router-link></h3></v-col>
            <v-col style="text-align: left">
            <p>I've been writing code in a vast array of languages for close to a decade, from academic tools in Java and Python to modern web dev in JavaScript.</p>
            <p>See the other languages I'm comfortable with, and some projects I've been involved with. <v-btn to="/development" tile icon><v-icon>mdi-hand-pointing-right</v-icon></v-btn></p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            links: ['development', 'music', 'research', 'trampolining', 'visual']
        }
    }
}
</script>