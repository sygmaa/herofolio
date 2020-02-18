import React, { useEffect, useState } from "react";
import useInterval from "@use-it/interval";

import useKeyPress from "../../hooks/useKeyPress";
import { Ground } from "../Design/Ground";
import { Mario } from "../Design/Mario";
import { Sun } from "../Design/Sun";
import styled, { createGlobalStyle } from "styled-components";

const STEP = 5;
const JUMP = 20;

const textBg = `
  linear-gradient(1deg, white 30%, transparent 31%, transparent 49%, white 50%, white 75%, transparent 76%) 4px 0 / 90% repeat-y
`;

const Text = styled.div`
  margin-top: 50px;
  margin-left: 10%;
  font-size: 18px;
  line-height: 35px;
  letter-spacing: 2px;
  padding-top: 10px;
  color: #333;
  font-weight: bold;
  background: ${textBg};
  width: 360px;
  z-index: 2;
  position: relative;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: #a7eeff;
    font-family: 'PT Mono', monospace;
  }
`;

const App = () => {
  const [marioLeft, setMarioLeft] = useState(10);
  const [marioBottom, setMarioBottom] = useState(0);

  const left = useKeyPress("ArrowLeft");
  const right = useKeyPress("ArrowRight");
  const space = useKeyPress(" ");

  const rightHandler = () => {
    if (right) {
      if (marioLeft <= 100 - STEP) {
        setMarioLeft(marioLeft + STEP);
      }
    }
  };

  const leftHandler = () => {
    if (left) {
      if (marioLeft > 5) {
        setMarioLeft(marioLeft - STEP);
      }
    }
  };

  useInterval(() => {
    rightHandler();
    leftHandler();
  }, 200);

  useEffect(() => {
    if (space) {
      setMarioBottom(JUMP);
      setTimeout(() => setMarioBottom(0), 280);
    } else {
      setMarioBottom(0);
    }
  }, [space]);

  return (
    <>
      <GlobalStyle />

      <Text>Hello, I'm Kévin Dumont, passionate web developer</Text>
      <Mario
        left={`calc(${marioLeft}% - 85px)`}
        bottom={`calc(20vh + ${marioBottom}%)`}
      />
      <Sun />
      <Ground />
    </>
  );
};

export default App;
