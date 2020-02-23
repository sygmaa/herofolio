import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Overlay, Container, Content } from "./styles";

export interface ModalProps {
  children: ReactNode;
  onClose: () => any;
  [k: string]: any;
}

const modalRoot = document.getElementById("modal-root") as Element;

const Modal = ({ children, onClose, ...props }: ModalProps) => {
  const el = document.createElement("div");
  const popinRef = useRef(null);

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(
    <Overlay onClick={onClose}>
      <Container ref={popinRef} {...props}>
        <Content>{children}</Content>
      </Container>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
