import { merriweather } from "@/utils/fonts";
import styles from "./homepage.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        { "Hi! I'm David." }
      </h1>
      <h2>
        { "Learner · Teacher · Creator" }
      </h2>
      <p className={`${styles.description} ${merriweather.className}`}>
        { "I love to make things: code 💻, gymnasts 🤸, and fictional worlds 🗺️. Welcome to my digital space." }
      </p>
    </main>
  );
}
