import styled, { keyframes, css } from "styled-components";

interface ModalBg {
  disappear: boolean;
  animationDisabled?: boolean;
}

const modalAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const modalAnimationDisappear = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.6);
  }
`;

export const ModalBg = styled.div<ModalBg>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #044e6d;
  background: #daf4ff;

  ${({ animationDisabled }) =>
    !animationDisabled &&
    css`
      animation: ${modalAnimation} 0.5s ease;
    `}

  ${({ disappear }) =>
    disappear === true &&
    css`
      animation: ${modalAnimationDisappear} 0.5s ease;
    `}
`;

export const Container = styled.div`
  width: 500px;
  max-width: 100%;
  padding: 15px;
  box-sizing: border-box;
`;
