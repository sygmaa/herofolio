import styled from "styled-components";

import { Close } from "../Design/Icons/Close";

export const ModalBg = styled.div`
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
`;

export const Container = styled.div`
  width: 500px;
  max-width: 100%;
  animation: fadeDown 0.3s;
  padding: 15px;
  box-sizing: border-box;

  @keyframes fadeDown {
    from {
      margin-top: -10%;
    }
    to {
      margin-top: 0;
    }
  }
`;

export const CloseUi = styled(Close)`
  position: fixed;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;
