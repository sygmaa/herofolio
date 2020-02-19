import styled from "styled-components";

const wall = (color1?: string, color2?: string, color3?: string) => {
  const c1 = color1 || "white";
  const c2 = color2 || "#b32121";
  const c3 = color3 || "#c81c1c";

  return `
    linear-gradient(to top, ${c1} 0%, ${c1} 1px, transparent 1px, transparent 14px, ${c1} 14px, ${c1} 16px, transparent 16px, transparent 29px, ${c1} 29px, ${c1} 30px) 0 0 / 30px 30px,
    linear-gradient(45deg, ${c2} 0%, ${c2} 25%, transparent 25%, transparent 75%, ${c3} 75%, ${c3} 100%) 13px 0 / 30px 30px,
    linear-gradient(45deg, ${c3} 0%, ${c3} 25%, transparent 25%, transparent 75%, ${c2} 75%, ${c2} 100%) 28px 15px / 30px 30px,
    linear-gradient(45deg, ${c2} 0%, ${c2} 25%, transparent 25%, transparent 75%, ${c3} 75%, ${c3} 100%) 0 0 / 30px 30px,
    linear-gradient(45deg, ${c3} 0%, ${c3} 25%, transparent 25%, transparent 75%, ${c2} 75%, ${c2} 100%) 15px 15px / 30px 30px,
    linear-gradient(to bottom, white, white)
  `;
};

export interface BrickBgProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

export const BrickBg = styled.div<BrickBgProps>`
  background: ${({ color1, color2, color3 }) => wall(color1, color2, color3)};
  background-repeat: repeat;
`;
