import styled from "styled-components";

const textBg = `
linear-gradient(1deg, white 30%, transparent 31%, transparent 49%, white 50%, white 75%, transparent 76%) 4px 0 / 90% repeat-y
`;

export const HighlightedText = styled.div`
  position: fixed;
  z-index: 2;
  top: 30px;
  left: 30px;
  font-size: 18px;
  line-height: 35px;
  letter-spacing: 2px;
  color: #333;
  font-weight: bold;
  background: ${textBg};
  width: 360px;
`;
