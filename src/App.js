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
  return (
    <div>
      {grid.map((el) => {
        return (
          <div>
            {el.map((el) => {
              return (
                <div
                  style={{
                    backgroundColor: "red",
                    border: "1px solid black",
                    width: "25px",
                    height: "25px",
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
