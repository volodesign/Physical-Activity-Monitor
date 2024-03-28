import axios from "axios";
import React, { createContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = useCallback(async () => {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:3232/auth/loggedIn"
      );
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error fetching loggedIn status:", error);
    }
  }, []);

  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
