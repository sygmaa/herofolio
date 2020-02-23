import React from "react";
import { BrickBg } from "./BrickBg";
import styled from "styled-components";

const Door = styled.div`
  position: absolute;
  left: 33.33%;
  bottom: 0;
  width: 80%;
  height: 50%;
  background: linear-gradient(to left, #412e1e 10%, #5e452f 10%) 20px 0 / 20px
      repeat,
    #5e452f;
  border: 6px solid #6b6b6b;
  border-bottom: none;
  border-radius: 50% 50% 0 0;
  box-sizing: border-box;
`;

const Castle = () => {
  return (
    <>
      <Door />
      <BrickBg
        color1="silver"
        color2="gray"
        color3="gray"
        style={{
          width: "33%",
          height: 30,
          position: "absolute",
          top: 0,
          left: 0
        }}
      />
      <BrickBg
        color1="silver"
        color2="gray"
        color3="gray"
        style={{
          width: "33%",
          height: 30,
          position: "absolute",
          top: 0,
          right: 0
        }}
      />
      <BrickBg
        color1="silver"
        color2="gray"
        color3="gray"
        style={{ width: "100%", marginTop: 30 }}
      />
    </>
  );
};

export default Castle;
