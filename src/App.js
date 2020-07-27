import React, { useState } from "react";
import "./App.css";
import { produce } from "immer";

const numRows = 50;
const numCols = 50;

const App = () => {
  const [running, setRunning] = useState(false)
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  const start = () => {
    for (let i = 0; i < numRows; i++) {
      let count = 0;
      grid[i - 1][j] ? count++ : undefined;
      grid[i + 1][j] ? count++ : undefined;
      grid[i][j + 1] ? count++ : undefined;
      grid[i][j - 1] ? count++ : undefined;
      grid[i][j] && (count === 2 || count === 3)
        ? (grid[i][j] = 1)
        : (grid[i][j] = 0);
    }
  };
  console.log(grid);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((cols, j) => (
            <div
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
                });

                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
      <div>
        <button onClick={() => {
          setRunning(!running)
        }}>{running ? "stop" : "start"}</button>
      </div>
    </div>
  );
};

export default App;
