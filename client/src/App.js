import React, { useState, useEffect } from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";

axios.defaults.withCredentials = true;

function App() {
  const [colorScheme, setColorScheme] = useState(getInitialColorScheme());

  // Function to get initial color scheme
  function getInitialColorScheme() {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkScheme ? "dark" : "light";
  }

  // Function to update color scheme when user preference changes
  function handleColorSchemeChange(event) {
    setColorScheme(event.matches ? "dark" : "light");
  }

  useEffect(() => {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", handleColorSchemeChange);

    return () => {
      colorSchemeQuery.removeEventListener("change", handleColorSchemeChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorScheme);
  }, [colorScheme]);

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <div className="container">
          <Router />
        </div>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
