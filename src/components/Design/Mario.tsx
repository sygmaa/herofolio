import styled, { css } from "styled-components";

const camel = "#e5c56c";
const jean = "#3131d3";
const beige = "#ffe1af";

const hat = `
  radial-gradient(7px 7px at calc(50% + 33px) 22px, gray 49%, transparent 50%) no-repeat,
  linear-gradient(29deg, gray 60%, transparent 62%) calc(50% + 20px) 5px / 27px 20px no-repeat,
  radial-gradient(50px 50px at calc(50% - 5px) 25px, grey 49%, transparent 50%) 0px 0px / 100% 25px no-repeat
`;

const head = `
  radial-gradient(8px 8px at 50% 38px, ${beige} 48%, transparent 50%) -8px,
  radial-gradient(8px 8px at 50% 38px, ${beige} 48%, transparent 50%) 8px,
  radial-gradient(10px 10px at 50% 35px, black 48%, transparent 50%) -8px,
  radial-gradient(10px 10px at 50% 35px, black 48%, transparent 50%) 8px,
  linear-gradient(to bottom, ${beige} 100%, ${beige} 100%) 50% 10px / 30px 34px no-repeat,
  radial-gradient(30px 30px at 50% 42px, white 48%, transparent 50%),
  radial-gradient(50px 50px at 50% 38px, ${beige} 49%, transparent 50%),
  linear-gradient(black 49%, black 50%) 50% 22px / 52px 18px no-repeat
`;

const body = `
  radial-gradient(50px 60px at 50% 30px, ${camel} 49%, transparent 50%) 0 60px / 100% no-repeat
  // linear-gradient(${camel} 100%, ${camel} 100%) 50% 85px / 60px 25px no-repeat,
  // linear-gradient(${camel} 100%, ${camel} 100%) 50% 110px / 40px 20px no-repeat
`;

const feet = `
  radial-gradient(40px 40px at 50% calc(50% + 15px), red 49%, transparent 50%) 0 0 / 40px 30px no-repeat
`;

export interface MarioProps {
  left: string;
  bottom: string;
}

export const Mario = styled.div<MarioProps>`
  width: 85px;
  height: 150px;
  background-repeat: no-repeat;
  background: ${feet}, ${hat}, ${head}, ${body};
  position: absolute;
  transition: all 0.2s linear;
  z-index: 10;

  ${({ left, bottom }) => css`
    left: ${left};
    bottom: ${bottom};
  `}
`;
