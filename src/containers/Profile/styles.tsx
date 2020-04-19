import styled, { keyframes } from "styled-components";
import { MEDIA, FONTS } from "../../constants";
import { get3dTextShadow } from "../../services/helpers";

export const ModalRight = styled.div`
  padding: 30px;
  overflow: auto;

  h2 {
    margin-top: 0;
    font-size: 2rem;
  }

  p {
    line-height: 2.6rem;
    font-family: "Montserrat", sans-serif;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  max-height: 377px;

  img {
    ${MEDIA.MAX_S} {
      display: none;
    }
  }
`;

const commandsHelperAnimate = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

export const CommandsHelper = styled.div`
  font-family: ${FONTS.MONO};
  color: #fff;
  text-shadow: ${get3dTextShadow("#58402a", 2)};
  animation: infinite 0.7s ease ${commandsHelperAnimate};
  transform-origin: center;
  text-align: center;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;
