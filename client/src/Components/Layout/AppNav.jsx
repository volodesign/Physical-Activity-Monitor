import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";

export default function AppNav() {
  const navigate = useNavigate();

  const filesNavigate = () => {
    const path = "/app/files";
    navigate(path);
  };

  const appNavigate = () => {
    const path = "/app";
    navigate(path);
  };
  return (
    <>
      <div className="app-nav-container">
        <Button
          onClick={appNavigate}
          className="size-link-3 variant-link-neutral"
        >
          Dashboard
        </Button>

        <Button
          onClick={filesNavigate}
          className="size-link-3 variant-link-neutral"
        >
          Files
        </Button>
      </div>
    </>
  );
}
