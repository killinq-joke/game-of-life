import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export default function Rules() {
  const rainbow = keyframes`
    0% {
        border: solid 2px red
    }
    14.28% {
        border: solid 2px violet
    }
    28.57% {
        border: solid 2px indigo
    }
    42.85% {
        border: solid 2px blue
    }
    57.14% {
        border: solid 2px green
    } 
    71.42% {
        border: solid 2px yellow
    }
    85.71% {
        border: solid 2px orange
    }
    100% {
        border: solid 2px red
    }

    `;
  const hover = keyframes`
   0% {
        border: solid 2px red;
        background: solid 2px red
    }
    14.28% {
        border: solid 2px violet;
        background: violet
    }
    28.57% {
        border: solid 2px indigo;
        background: indigo
    }
    42.85% {
        border: solid 2px blue;
        background: blue
    }
    57.14% {
        border: solid 2px green;
        background: green
    } 
    71.42% {
        border: solid 2px yellow;
        background: yellow
    }
    85.71% {
        border: solid 2px orange;
        background: orange
    }
    100% {
        border: solid 2px red;
        background: red
    }
  `;
  const Button = styled.a`
    animation: ${rainbow} 5s linear infinite;
    &:hover {
      animation: ${hover} 5s linear infinite;
      color: white;
    }
  `;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Link to="/">
        <Button className="btn btn-dark">PLAY</Button>
      </Link>
      <h3>Here are the rules of THE GAME OF LIFE</h3>
      <ol>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbours lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </li>
      </ol>
    </div>
  );
}
