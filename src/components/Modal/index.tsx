import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Overlay, Container, Content } from "./styles";

export interface ModalProps {
  children: ReactNode;
  show: boolean;
  onClose: () => any;
  [k: string]: any;
}

const modalRoot = document.getElementById("modal-root") as Element;

const Modal = ({
  children,
  show,
  onClose,
  hideClose,
  ...props
}: ModalProps) => {
  const el = document.createElement("div");
  const popinRef = useRef(null);

  const onOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const div = event.target as HTMLDivElement;

    if (onClose && popinRef.current && div.contains(popinRef.current)) {
      onClose();
    }
  };

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [show]);

  return createPortal(
    show ? (
      <Overlay onClick={onOverlayClick}>
        <Container ref={popinRef} {...props}>
          {!hideClose && <div onClick={() => onClose && onClose()}>X</div>}
          <Content>{children}</Content>
        </Container>
      </Overlay>
    ) : (
      <></>
    ),
    el
  );
};

export default Modal;
