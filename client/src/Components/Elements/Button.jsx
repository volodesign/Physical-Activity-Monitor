import React from "react";
import "../../css/button.css";

export default function Button({
  children,
  className,
  type,
  onClick,
  isLoading,
}) {
  return (
    <button
      type={type}
      className={!isLoading ? className : "loading"}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span>Loading...</span> : children}
    </button>
  );
}
