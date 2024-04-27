import React, { useContext, useEffect, useRef, useState } from "react";
import LogOut from "../Auth/LogOut";
import { UserContext } from "../../context/UserContext";
import "../../css/profileDropdown.css";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";

export default function DropdownProfile() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const settingsNavigate = () => {
    navigate("/app/settings");
    setIsOpen(false);
  };

  const aboutNavigate = () => {
    navigate("/app/about");
    setIsOpen(false);
  };

  const toggleColorScheme = () => {
    const newColorScheme =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", newColorScheme);
    localStorage.setItem("colorScheme", newColorScheme);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="profile" ref={dropdownRef}>
        <div className="avatar-button">
          <img
            src={user?.avatar}
            alt="user avatar"
            onClick={toggleDropdown}
            className="avatar-image"
          />
        </div>
        {isOpen && (
          <div className="profile-dropdown">
            <div className="profile-name">
              <h3 className="text-size-3 text-weight-semibold text-style-neutral">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-size-3 text-weight-regular text-style-grey">
                {user?.email}
              </p>
            </div>
            <ul className="profile-dropdown-list">
              <li>
                <Button
                  onClick={settingsNavigate}
                  className="variant-dropdown size-2"
                >
                  Settings
                </Button>
              </li>
              <li>
                <Button
                  onClick={toggleColorScheme}
                  className="variant-dropdown size-2"
                >
                  Change theme
                </Button>
              </li>
              <li>
                <Button
                  onClick={aboutNavigate}
                  className="variant-dropdown size-2"
                >
                  About this app
                </Button>
              </li>
              <li>
                <LogOut />
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
