import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import { produce } from "immer";

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

  const [running, setRunning] = useState(false);

  const runRef = useRef(running);
  runRef.current = running;
  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];
  const runSimulation = useCallback(() => {
    if (!runRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let count = 0;
            operations.forEach(([x, y]) => {
              const newI = x + i;
              const newJ = y + j;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                count += g[newI][newJ];
              }
            });
            if (count < 2 || count > 3) {
              gridCopy[i][j] = 0;
            } else if (grid[i][j] === 0 && count === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, 1000);
  }, []);

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
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
      </div>
    </div>
  );
};

export default App;
