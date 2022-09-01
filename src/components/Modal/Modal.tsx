import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

type ModalPropsType = {
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const Modala = styled.div`
  position: fixed;
  top: calc(50% - 300px);
  left: calc(50% - 300px);
  z-index: 1000;
  width: 600px;
  height: 600px;

  @media (max-width: 1400px) {
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 400px;
  }
`;

export default function Modal({ open, children, onClose }: ModalPropsType) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <Overlay onClick={onClose} />
      <Modala onClick={onClose}>{children}</Modala>
    </>,
    document.getElementById("portal") as HTMLElement
  );
}
