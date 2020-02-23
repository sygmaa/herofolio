import styled from "styled-components";

import { Close } from "../Design/Icons/Close";

export const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Container = styled.div`
  animation: fadeDown 0.3s;
  background: #fff;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 1.4rem);
  max-width: 700px;
  overflow: hidden;
  position: relative;
  width: calc(100% - 1.4rem);

  @keyframes fadeDown {
    from {
      margin-top: -10%;
    }
    to {
      margin-top: 0;
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  overflow-y: auto;
`;

export const CloseUi = styled(Close)`
  position: fixed;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;
