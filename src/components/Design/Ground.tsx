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
  { left: 95, top: 70 },
];

const dots = dotsValues
  .map((v) => {
    return `radial-gradient(4px 4px at ${v.left}% ${v.top}%, rgba(0,0,0,0.2) 46%, transparent 50%) repeat-x`;
  })
  .join(",");

const grass = (color: string) => `
  linear-gradient(30deg, ${color}00 49%, ${color} 50%) 0 0 / 20px 30px repeat-x,
  linear-gradient(-30deg, ${color}00 49%, ${color} 50%) 0 0 / 20px 30px repeat-x
`;

export interface GroundProps {
  grassColor: string;
  groundColor: string;
}

export const Ground = styled.div<GroundProps>`
  background: ${({ grassColor, groundColor }) =>
    `${grass(grassColor)}, ${dots}, ${groundColor}`};
  width: 100%;
  height: 100%;
  transition: all 2s ease;
`;
