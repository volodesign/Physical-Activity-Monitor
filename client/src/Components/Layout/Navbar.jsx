import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../Elements/Button";
import DropdownProfile from "../Elements/DropdownProfile";

export default function Navbar() {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  const navigate = useNavigate();

  const signupNavigate = () => {
    const path = "/signup";
    navigate(path);
  };

  const signinNavigate = () => {
    const path = "/signin";
    navigate(path);
  };

  const rootNavigate = () => {
    const path = "/";
    navigate(path);
  };

  return (
    <div className="header">
      <div className="logo-button" onClick={rootNavigate}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="clip0_2418_3489">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
          <g clipPath="url(#clip0_2418_3489)">
            <path d="M18 0V12C18 15.3 15.3 18 12 18C8.7 18 6 15.3 6 12H12V6H6V12H0C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12V0H18Z" />
            <path d="M6 6V0H0V6H6Z" />
          </g>
        </svg>
      </div>
      {loggedIn === false && (
        <>
          <div className="link-wrap">
            {location.pathname === "/signin" ? (
              <>
                <Button
                  onClick={signupNavigate}
                  className="size-3 variant-link-neutral"
                >
                  Create an account
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={signinNavigate}
                  className="size-3 variant-link-neutral"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </>
      )}

      {loggedIn === true && (
        <>
          <DropdownProfile />
        </>
      )}
    </div>
  );
}
