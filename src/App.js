import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import { produce } from "immer";
import { CirclePicker } from "react-color";

const App = () => {
  const [numRows, setNumRows] = useState(25);
  const [numCols, setNumCols] = useState(50);
  const [newRows, setNewRows] = useState(25);
  const [newCols, setNewCols] = useState(50);
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState("black");

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      //for each rows make an array full of zeros length of columns
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
    console.log(speed);
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
    setTimeout(runSimulation, 100 / speed);
  }, [numRows, speed]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <div>
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runRef.current = true;
                runSimulation();
              } else {
                runRef.current = false;
              }
            }}
          >
            {running ? "stop" : "start"}
          </button>
          <button
            onClick={() => {
              setGrid(() => {
                const rows = [];
                for(let i = 0; i < numRows; i++) {
                  rows.push(Array.from(Array(numCols), () => 0));
                }
                return rows;
              });
              setRunning(false);
            }}
          >
            clear
          </button>
          <button
            onClick={() => {
              setGrid(() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () =>
                      Math.floor(Math.random() * Math.floor(2))
                    )
                  );
                }
                return rows;
              });
              setRunning(false);
            }}
          >
            randomize
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNumRows(newRows);
            setNumCols(newCols);
            setGrid(() => {
              const rows = [];
              for (let i = 0; i < newRows; i++) {
                rows.push(Array.from(Array(newCols), () => 0));
              }
              console.log(rows);
              return rows;
            });
            setRunning(!running);
          }}
        >
          <label>
            <p>Rows</p>

            <input
              type="number"
              onChange={(e) => {
                console.log(e.target.value);
                setNewRows(Number(e.target.value));
              }}
              value={newRows}
            />
          </label>
          <label>
            <p>Columns</p>

            <input
              type="number"
              onChange={(e) => {
                console.log(e.target.value);
                setNewCols(Number(e.target.value));
              }}
              value={newCols}
            />
          </label>

          <button>submit</button>
        </form>
        {/* <label>
          speed
          <input
            onChange={(e) => setSpeed(Number(e.target.value))}
            value={speed}
            type="number"
          />
        </label> */}
        <CirclePicker color={color} onChange={handleChangeComplete} />
      </div>
      <div style={{display: "flex", justifyContent: "center", margin: "20px 0"}}>
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
                backgroundColor: grid[i][j] ? color : undefined,
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
      </div>
      
    </div>
  );
};

export default App;
