"use client";
import ReactModal from "react-modal";

type ModalProps = ReactModal["props"];
ReactModal.setAppElement("body");
export const Modal = (props: ModalProps) => {
  return props.isOpen ? (
    <ReactModal
      style={{
        content: {
          height: "fit-content",
          padding: "0",
          margin: "auto auto",
          width: "100%",
        },
      }}
      {...props}
    >
      {props.children}
    </ReactModal>
  ) : null;
};
