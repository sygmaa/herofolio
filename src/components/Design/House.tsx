import React from "react";
import styled from "styled-components";
import { BrickBg } from "./BrickBg";

const darkRed = "#7d1010";

export const Bricks = styled(BrickBg)`
  position: absolute;
`;

const RoofRight = styled.div`
  height: 20px;
  width: 220px;
  background: ${darkRed};
  z-index: 1;
  transform: rotate(34deg);
  position: absolute;
  transform-origin: left;
  right: -65px;
  top: -5px;
`;

const RoofLeft = styled.div`
  height: 20px;
  width: 220px;
  background: ${darkRed};
  z-index: 1;
  transform: rotate(-34deg);
  position: absolute;
  transform-origin: right;
  left: -65px;
  top: -5px;
`;

const House = () => {
  return (
    <>
      <RoofRight />
      <RoofLeft />
      <Bricks
        style={{
          top: 10,
          right: 132,
          left: 132,
          bottom: "calc(100% - 25px)",
        }}
      />
      <Bricks
        style={{
          top: 25,
          right: 110,
          left: 110,
          bottom: "calc(100% - 40px)",
        }}
      />
      <Bricks
        style={{
          top: 40,
          right: 95,
          left: 95,
          bottom: "calc(100% - 55px)",
        }}
      />
      <Bricks
        style={{
          top: 55,
          right: 78,
          left: 78,
          bottom: "calc(100% - 70px)",
        }}
      />
      <Bricks
        style={{
          top: 70,
          right: 40,
          left: 40,
          bottom: "calc(100% - 100px)",
        }}
      />
      <Bricks
        style={{
          top: 85,
          right: 18,
          left: 18,
          bottom: "calc(100% - 130px)",
        }}
      />
      <Bricks
        style={{
          top: 100,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      />
    </>
  );
};

export default House;
