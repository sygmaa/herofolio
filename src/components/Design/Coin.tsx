import React from "react";
import styled, { keyframes } from "styled-components";

const size = "40px";
const fontSize = "28px";
const width = "4px";
const color = "#ffd600";
const speed = "3s";
const innerCoin = "#ceae0c";

const rotate = keyframes`
  0% {
    transform: rotateY(0deg) translateY(0px);
  }
  50% {
    transform: rotateY(180deg) translateY(10px);
  }
  100% {
    transform: rotateY(360deg) translateY(0px);
  }
`;

const CoinUi = styled.div`
  font-size: ${fontSize};
  font-weight: bold;
  width: ${width};
  height: ${size};
  background: ${innerCoin};
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${rotate} ${speed} infinite linear;
  transform-style: preserve-3d;

  .side,
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: ${size};
    height: ${size};
    overflow: hidden;
    background: ${innerCoin};
    border-radius: 50%;
    right: calc(-${size} / 2 + ${width});
    text-align: center;
    line-height: calc(${size} - 2px);
    color: ${color};
    transform: rotateY(-90deg);
    backface-visibility: hidden;
  }

  .heads,
  .tails {
    box-shadow: inset 0 0 0 6px ${color};
  }

  .tails,
  &:after {
    left: calc(-${size} / 2 + ${width});
    transform: rotateY(90deg);
  }

  &:before,
  &:after {
    background: ${innerCoin};
    backface-visibility: hidden;
    transform: rotateY(90deg);
  }

  &:after {
    transform: rotateY(-90deg);
  }
`;

const Coin = () => {
  return (
    <CoinUi>
      <div className="side heads">$</div>
      <div className="side tails">$</div>
    </CoinUi>
  );
};

export default Coin;
