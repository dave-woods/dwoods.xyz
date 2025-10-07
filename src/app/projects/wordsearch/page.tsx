"use client";

import { useState } from "react";
import { WordsearchGrid } from "./_wordsearch";
import styles from "./wordsearch.module.css";

export default function Wordsearch() {
  const wordlist = [
    "example",
    "goes",
    "here",
    "test",
    "wordsearch",
    "puzzle",
    "nextjs",
    "react",
    "typescript",
    "javascript",
    "css",
    "html",
    "frontend",
    "backend",
    "fullstack",
  ];
  const [found, setFound] = useState<string[]>([]);
  const gridSize = 15;

  function handleWordFind(word: string) {
    if (wordlist.includes(word) && !found.includes(word)) {
      setFound((prev) => [...prev, word]);
    }
  }

  return (
    <main className={styles.main}>
      <h1>Wordsearch</h1>
      <ul className={styles.wordlist}>
        {wordlist.map((word) => (
          <li
            key={word}
            className={`${styles.word} ${
              found.includes(word) ? styles.found : ""
            }`}
          >
            {word}
          </li>
        ))}
      </ul>
      <WordsearchGrid
        onWordFind={handleWordFind}
        gridSize={gridSize}
        wordlist={wordlist}
      />
    </main>
  );
}
