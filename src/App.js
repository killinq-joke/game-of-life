import React, { useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  console.log(grid);
  return (
    <div style={{display: "grid", gridTemplateColumns:`repeat(${numCols}, 20px)`}}>
      {grid.map((rows, i) =>
        rows.map((cols, j) => (
          <div
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
  );
};

export default App;
