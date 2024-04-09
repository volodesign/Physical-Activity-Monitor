import React, { useEffect } from "react";
import "../../css/modalPopup.css";
import Button from "../Elements/Button";
import IconButton from "../Elements/IconButton";

export default function ModalPopup(props) {
  useEffect(() => {
    const handleScroll = () => {
      if (props.isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [props.isOpen]);

  if (!props.isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-title">
          <h2 className="text-weight-semibold text-size-4 text-style-neutral">
            {props.title}
          </h2>
          <IconButton
            className="ib-variant-ghost-neutral ib-size-2"
            onClick={props.onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </IconButton>
        </div>
        <div className="modal-content">{props.children}</div>
        {props.actionOnClick && (
          <div className="modal-actions">
            <Button
              className="variant-solid-neutral size-3 width-full"
              onClick={props.actionOnClick}
            >
              {props.actionName}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
