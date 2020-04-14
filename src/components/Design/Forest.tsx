import styled from "styled-components";

const color = "#3f7d3b";
const bg = `
  radial-gradient(50px 50px at 30px calc(100% - 20px), ${color} 49%, ${color}00 50%) repeat-x 100px 100px / 100px 100px,
  radial-gradient(50px 50px at 60px calc(100% - 25px), ${color} 49%, ${color}00 50%) repeat-x 100px 100px / 100px 100px,
  radial-gradient(50px 50px at 100px calc(100% - 30px), ${color} 49%, ${color}00 50%) repeat-x 100px 100px / 100px 100px,
  radial-gradient(50px 50px at 0px calc(100% - 30px), ${color} 49%, ${color}00 50%) repeat-x 100px 100px / 100px 100px,
  linear-gradient(to bottom, transparent 90%, ${color} 90%)
`;

export const Forest = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  background: ${bg};
`;
