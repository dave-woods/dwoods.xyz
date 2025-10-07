"use client";

import React, { useState, useEffect, use } from "react";
import styles from "./wordsearch.module.css";

type WordsearchCellProps = {
  children: React.ReactNode;
  row: number;
  col: number;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
};

export function WordsearchCell({
  children,
  row,
  col,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
}: WordsearchCellProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={styles.cell}
    >
      {children}
    </div>
  );
}

function useGrid({ size, wordlist }: { size: number; wordlist: string[] }) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: size }, () => Array.from({ length: size }, () => "?"))
  );

  function canPlaceWord(
    word: string,
    row: number,
    col: number,
    direction: "H" | "V"
  ) {
    if (direction === "H") {
      if (col + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== "?" && grid[row][col + i] !== word[i])
          return false;
      }
    } else {
      if (row + word.length > size) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== "?" && grid[row + i][col] !== word[i])
          return false;
      }
    }
    return true;
  }

  function placeWord(word: string) {
    let placed = false;
    const maxAttempts = size * size;
    let attempts = 0;
    while (!placed && attempts < maxAttempts) {
      attempts++;

      const direction = Math.random() < 0.5 ? "H" : "V";
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (canPlaceWord(word, row, col, direction)) {
        for (let i = 0; i < word.length; i++) {
          if (direction === "H") {
            grid[row][col + i] = word[i];
          } else {
            grid[row + i][col] = word[i];
          }
        }
        placed = true;
      }
    }
    return placed;
  }
  for (const word of wordlist.toSorted((a, b) => b.length - a.length)) {
    placeWord(word);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "?") {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
  return grid;
}

var ghostimg = document.createElement("img");
ghostimg.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function WordsearchGrid({
  gridSize,
  wordlist,
  onWordFind,
}: {
  gridSize: number;
  wordlist: string[];
  onWordFind: (word: string) => void;
}) {
  const grid = useGrid({ size: gridSize, wordlist });

  const [selected, setSelected] = useState<string[]>([]);
  const [startCell, setStartCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  function handleDragStart(
    e: React.DragEvent,
    row: number,
    col: number,
    letter: string = ""
  ) {
    e.dataTransfer.setDragImage(ghostimg, 0, 0);
    console.log("Drag start:", letter);
    setStartCell({ row, col });
    setSelected([letter]);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDragEnter(
    e: React.DragEvent,
    row: number,
    col: number,
    letter: string = ""
  ) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drag enter", letter);
    if (startCell?.row === row && startCell?.col === col) return;
    if (startCell?.row !== row && startCell?.col !== col) return; // only allow straight lines
    setSelected((prev) => [...prev, letter]);
    console.log("Selected:", [...selected, letter]);
  }

  function handleDrop(
    e: React.DragEvent,
    row: number,
    col: number,
    letter: string = ""
  ) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Drop", letter);
    if (selected.length > 1) {
      onWordFind(selected.join(""));
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      className={styles.grid}
    >
      {grid.map(
        (row, rowIndex) =>
          // <div key={rowIndex} className="row">
          // {row.map((cell, colIndex) => (
          row.map((cell, colIndex) => (
            <WordsearchCell
              key={`cell-${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              onDragStart={(e) => handleDragStart(e, rowIndex, colIndex, cell)}
              onDragEnter={(e) => handleDragEnter(e, rowIndex, colIndex, cell)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, rowIndex, colIndex, cell)}
            >
              {cell}
            </WordsearchCell>
          ))
        // ))}
        // </div>
      )}
    </div>
  );
}
