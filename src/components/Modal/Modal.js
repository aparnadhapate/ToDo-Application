import React, { useEffect } from "react";
import "./Modal.css";

export default function modal(props) {
  const keyUp = (event) => {
    if (event.key === "Escape") {
      props.closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keyup", keyUp);
    };
  }, []);
  return (
    <>
      <div className="ModalBackdrop" onClick={props.closeModal}></div>
      <div className="Modal">
        <div className="Modal-body">{props.children}</div>
      </div>
    </>
  );
}
