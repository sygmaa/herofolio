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

export const MainTitle = styled.div`
  font-size: 86px;
  font-weight: 800;
  letter-spacing: -5px;
  color: #fd4f5e;
  text-shadow: ${get3dTextShadow("#ce3744", 15)};
  line-height: 62px;
  text-align: center;

  ${MEDIA.MAX_S} {
    font-size: 56px;
    line-height: 40px;
  }

  span {
    font-size: 96px;
    display: block;

    ${MEDIA.MAX_S} {
      font-size: 60px;
      line-height: 40px;
    }
  }
`;

export const Presents = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(63% - 8px);
  right: 30px;
  font-size: 20px;
  color: #fff;
  text-shadow: ${get3dTextShadow("#AAA", 3)};

  ${MEDIA.MAX_S} {
    height: 144px;
    right: 50px;
    font-size: 16px;
  }
`;

export const Subtitle = styled.div`
  position: relative;
  z-index: 2;
  font-size: 106px;
  font-weight: 800;
  letter-spacing: -5px;
  color: #ffd600;
  text-shadow: ${get3dTextShadow("#ceae0c", 15)};
  line-height: 62px;
  text-align: center;

  ${MEDIA.MAX_S} {
    font-size: 76px;
    line-height: 40px;
  }
`;

export const Title = styled.h1`
  width: 550px;
  height: 210px;
  position: absolute;
  font-family: ${FONTS.DEFAULT};
  text-transform: uppercase;
  bottom: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 8px;

  ${MEDIA.MAX_S} {
    width: 380px;
    height: 144px;
    padding: 0 10px;
  }
`;
