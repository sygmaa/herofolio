import styled, { keyframes } from "styled-components";

const phoneAnimation = keyframes`
0% {
  opacity: 0;
  transform: rotate(0deg);
}
20% {
  opacity: 1;
  transform: rotate(0deg);
}
60% {
  transform: rotate(-90deg);
  opacity: 1;
}
70% {
  transform: rotate(-90deg);
  opacity: 1;
}
100% {
  transform: rotate(-90deg);
  opacity: 0;
}
`;

export const PhoneRotate = styled.div`
  width: 40px;
  height: 70px;
  border: 2px solid #333;
  border-top-width: 6px;
  border-bottom-width: 10px;
  border-radius: 5px;
  animation: infinite ${phoneAnimation} 1.8s ease;
`;
