import styled from "styled-components";

export interface GroundProps {
  grassColor: string;
  groundColor: string;
  opacity?: number;
}

const grass = (color: string) => `
  linear-gradient(30deg, ${color}00 49%, ${color} 50%) 0 0 / 20px 30px repeat-x,
  linear-gradient(-30deg, ${color}00 49%, ${color} 50%) 0 0 / 20px 30px repeat-x
`;

const groundDarkness = `
  linear-gradient(to top, #000000 49.8%, #00000000 50%),
  linear-gradient(30deg, #000000 49.8%, #00000000 50%) 0 0 / 100px 100px repeat-x,
  linear-gradient(-30deg, #000000 49.8%, #00000000 50%) 0 0 / 100px 100px repeat-x
`;

export const Ground = styled.div<GroundProps>`
  background: ${({ grassColor, groundColor }) =>
    `${grass(grassColor)}, ${groundColor}`};
  width: 100%;
  height: 100%;
  transition: all 6s ease;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: ${({ opacity }) => (typeof opacity !== "undefined" ? opacity : 1)};

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    right: 0;
    left: 0;
    background: ${groundDarkness};
    opacity: 0.2;
    pointer-events: none;
  }

  &:before {
    bottom: -20%;
  }

  &:after {
    bottom: -60%;
  }
`;
