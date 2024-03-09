import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";


axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <div className="container">
      <Router />
      </div>
    </AuthContextProvider>
  );
}

export default App;
