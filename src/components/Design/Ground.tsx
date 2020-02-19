import styled from "styled-components";

const dotsValues = [
  { left: 5, top: 30 },
  { left: 10, top: 90 },
  { left: 15, top: 50 },
  { left: 20, top: 30 },
  { left: 30, top: 40 },
  { left: 35, top: 60 },
  { left: 40, top: 40 },
  { left: 45, top: 70 },
  { left: 50, top: 50 },
  { left: 55, top: 90 },
  { left: 60, top: 60 },
  { left: 65, top: 30 },
  { left: 70, top: 40 },
  { left: 75, top: 80 },
  { left: 80, top: 70 },
  { left: 85, top: 30 },
  { left: 90, top: 40 },
  { left: 95, top: 70 }
];

const dots = dotsValues
  .map(v => {
    return `radial-gradient(4px 4px at ${v.left}% ${v.top}%, #8c6b26 46%, transparent 50%) repeat-x`;
  })
  .join(",");

const grass = `
  linear-gradient(20deg, transparent 82%, #21b121 83%) 0 0 / 20px repeat-x,
  linear-gradient(-20deg, transparent 82%, #21b121 83%) 0 0 / 20px repeat-x
`;

const bg = `
  linear-gradient(to bottom, #74470e 0%, #281b00 100%);
`;

// #74470e

export const Ground = styled.div`
  background: ${grass}, ${dots}, ${bg};
  width: 100%;
  height: 100%;
`;
