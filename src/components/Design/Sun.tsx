import styled from "styled-components";

const SIZE = "300px";
const SIZE_SM = "250px";

export interface SunProps {
  color?: string;
}

export const Sun = styled.div<SunProps>`
  min-width: ${SIZE};
  min-height: ${SIZE};
  max-width: ${SIZE};
  max-height: ${SIZE};
  background: radial-gradient(
    100% 100% at 50% 50%,
    ${({ color }) => color || "#ffd600"} 28%,
    rgba(255, 214, 0, 0.4) 28.5%,
    rgba(255, 214, 0, 0.4) 50%,
    rgba(255, 214, 0, 0) 50.5%
  );
  transition: all 2s ease;

  @media screen and (max-height: 600px) {
    min-width: ${SIZE_SM};
    min-height: ${SIZE_SM};
    max-width: ${SIZE_SM};
    max-height: ${SIZE_SM};
  }
`;
