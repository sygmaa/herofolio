import styled from "styled-components";

export interface MountainProps {
  angle: number;
  percent: number;
  moutainWidth: number;
  mountainHeight: number;
  background: string;
  opacity?: number;
}

export const Mountains = styled.div<MountainProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transition: all 6s ease;
  opacity: ${({ opacity }) => (typeof opacity !== "undefined" ? opacity : 1)};

  background: ${({
    angle,
    percent,
    moutainWidth,
    mountainHeight,
    background: color,
  }) => {
    const w = moutainWidth ? `${moutainWidth}%` : 0;
    const h = mountainHeight ? `${mountainHeight}%` : 0;
    const pMore = percent + 0.2;

    return `
      linear-gradient(-${angle}deg, ${color}00 ${percent}%, ${color} ${pMore}%) ${w} 0 / ${h} 100% repeat-x,
      linear-gradient(${angle}deg, ${color}00 ${percent}%, ${color} ${pMore}%) ${w} 0 / ${h} 100% repeat-x,
      linear-gradient(-${angle}deg, ${color}00 ${percent}%, ${color} ${pMore}%) ${w} 0 / ${h} 100% repeat-x,
      linear-gradient(${angle}deg, ${color}00 ${percent}%, ${color} ${pMore}%) ${w} 0 / ${h} 100% repeat-x
    `;
  }};
`;
