import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export default function Rules() {
  const hover = keyframes`
    from {
      background: black;
      color: white
    }

    to {
      background: red;
      color: white
    }
  `;
  const Button = styled.a`
    &:hover {
      animation: ${hover} 2s linear infinite;
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
