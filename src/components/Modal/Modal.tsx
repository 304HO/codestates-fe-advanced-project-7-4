import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

type ModalPropsType = {
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
};

function Modal({ open, children, onClose }: ModalPropsType) {
  if (!open) return <></>;

  return ReactDom.createPortal(
    <>
      <Overlay onClick={onClose} />
      <StyledModal>{children}</StyledModal>
    </>,
    document.getElementById("portal") as HTMLElement,
  );
}

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* z-index: 1000; */
`;

const StyledModal = styled.div`
  position: fixed;
  top: calc(50% - 300px);
  left: calc(50% - 300px);
  z-index: 1000;
  width: 600px;
  height: 600px;
  background: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 1024px) {
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 400px;
    gap: 12px;
  }
`;
