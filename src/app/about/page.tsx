import { merriweather } from "@/utils/fonts"

export default function About() {
    return (
        <main>
            <h1>About Me</h1>
            <div className={merriweather.className}>
            <p>
                { "Hi, I'm David Woods. I like to think of myself as the kind of person who's constantly trying to learn and grow, then taking that new knowledge and building things with it, and teaching others the tricks that helped me along the way. My path has taken me through all kinds of strange places (like France), and has taught me the only sure way to move forwards is to start by making yourself uncomfortable." }
            </p>
            <p>
                { "I enjoy solving complex problems, learning new frameworks, and collaborating with others to create impactful digital experiences." }
            </p>
            <p>
                { "Outside of coding, I love gymnastic trampolining, worldbuilding, and teaching." }
            </p>
            </div>
        </main>
    );
}