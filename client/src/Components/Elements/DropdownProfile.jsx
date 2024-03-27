import React, { useContext, useEffect, useRef, useState } from "react";
import LogOut from "../Auth/LogOut";
import { UserContext } from "../../context/UserContext";
import "../../css/profileDropdown.css";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";

export default function DropdownProfile() {
  const { user, fetchData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const settingsNavigate = () => {
    navigate("/settings");
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
    const fetchUserData = async () => {
      try {
        await fetchData();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <>
      {loading ? (
        // Render loading state
        <div>Loading...</div>
      ) : (
        user && (
          // Render profile dropdown when user data is available
          <div className="profile" ref={dropdownRef}>
            <div className="avatar-button">
              <img
                src={user.avatar}
                alt="user avatar"
                onClick={toggleDropdown}
                className="avatar-image"
              />
            </div>
            {isOpen && (
              <div className="profile-dropdown">
                <div className="profile-name">
                  <h3 className="text-size-3 text-weight-semibold text-style-neutral">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-size-3 text-weight-regular text-style-grey">
                    {user.email}
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
                    <LogOut />
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
}
