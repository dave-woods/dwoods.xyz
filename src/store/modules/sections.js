export default {
    state: {
        sections: [
            {
                id: "development",
                whoAmI: "developer",
                tldr: "I've been coding in one form or another since 2008, more seriously since 2012, with an emphasis on webdev since 2016. There's a full list of the programming languages I've used below, but the ones I'm currently most comfortable with are modern JavaScript and Python 3.",
                heroSrc: "code-large.jpg"
            },
            {
                id: "music",
                whoAmI: "musician",
                tldr: "",
                heroSrc: "music-large.jpg"
            },
            {
                id: "research",
                whoAmI: "researcher",
                tldr: "I'm currently finishing off a PhD looking into events and time in texts. My main areas of interest are natural language processing and artificial intelligence, though many subfields of linguistics fascinate me.",
                heroSrc: "research-large.jpg"
            },
            {
                id: "trampolining",
                whoAmI: "trampolinist",
                tldr: "",
                heroSrc: "trampoline-large.jpg"
            },
            {
                id: "visual",
                whoAmI: "visual artist",
                tldr: "",
                heroSrc: "art-large.jpg"
            }
        ]
    },
    getters: {
        getSections: (state) => state.sections,
        getSectionByID: (state) => id => state.sections.find(s => s.id === id)
    }
}