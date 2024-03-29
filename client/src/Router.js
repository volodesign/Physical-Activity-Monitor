import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import AuthContext from "./context/AuthContext";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import ForgotPasswordSuccess from "./Components/Auth/ForgotPasswordSuccess";
import ResetPasswordSuccess from "./Components/Auth/ResetPasswordSuccess";

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
            <Route path="/dashboard" element={<Navigate to="/signin" />} />
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
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
