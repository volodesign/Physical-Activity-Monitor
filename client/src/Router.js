import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import App from "./Components/App";
import Settings from "./Components/Settings";
import Files from "./Components/App/Files";
import AuthContext from "./context/AuthContext";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import ForgotPasswordSuccess from "./Components/Auth/ForgotPasswordSuccess";
import ResetPasswordSuccess from "./Components/Auth/ResetPasswordSuccess";
import Leaderboard from "./Components/App/Leaderboard";
import About from "./Components/About";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {loggedIn === false && (
          <>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/app" element={<Navigate to="/signin" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/forgot-password-success"
              element={<ForgotPasswordSuccess />}
            />
            <Route
              path="/reset-password-success"
              element={<ResetPasswordSuccess />}
            />
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/" element={<Navigate to="/app" />} />
            <Route path="/app" element={<App />} />
            <Route path="/app/files" element={<Files />} />
            <Route path="/app/settings" element={<Settings />} />
            <Route path="/app/leaderboard" element={<Leaderboard />} />
            <Route path="/app/about" element={<About />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
