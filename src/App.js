import React, { useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 1));
    }
    return rows;
  });
  // console.log(grid)
  return (
    <div>
      {grid.map((el) => {
        return (
          <div style={{ display: "flex" }}>
            {el.map((el) => {
              let color
              if(el === 0) { 
                color = "white"
              } else {
                color = "black"
              }
              return (
                <div
                  style={{
                    backgroundColor: color,
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
