import React from "react";
import { BrickBg } from "./BrickBg";
import styled from "styled-components";

const Door = styled.div`
  position: absolute;
  left: 25%;
  bottom: 0;
  width: 50%;
  height: 60%;
  background: linear-gradient(to left, #412e1e 10%, #5e452f 10%) 20px 0 / 20px
      repeat,
    #5e452f;
  border: 6px solid #6b6b6b;
  border-bottom: none;
  border-radius: 40% 40% 0 0;
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
          width: "20%",
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
          width: "20%",
          height: 30,
          position: "absolute",
          top: 0,
          left: "40%"
        }}
      />
      <BrickBg
        color1="silver"
        color2="gray"
        color3="gray"
        style={{
          width: "20%",
          height: 30,
          position: "absolute",
          top: 0,
          left: "80%"
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
