import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { Container, CloseUi, ModalBg } from "./styles";

export interface ChildrenParams {
  CloseButton: typeof CloseUi;
  Container: typeof Container;
}

export interface ModalProps {
  children: (params: ChildrenParams) => ReactNode;
  [k: string]: any;
}

const modalRoot = document.getElementById("modal-root") as Element;

const Modal = ({ children, ...props }: ModalProps) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(
    <ModalBg {...props}>
      {children({ CloseButton: CloseUi, Container })}
    </ModalBg>,
    modalRoot
  );
};

export default Modal;
