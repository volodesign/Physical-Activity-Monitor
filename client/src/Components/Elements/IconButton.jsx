import React from "react";
import "../../css/iconButton.css";

export default function IconButton(props) {
  return (
    <button
      type={props.type}
      className={!props.isLoading ? props.className : "loading"}
      onClick={props.onClick}
      disabled={props.isLoading}
    >
      {props.isLoading ? <span>Loading...</span> : props.children}
    </button>
  );
}
