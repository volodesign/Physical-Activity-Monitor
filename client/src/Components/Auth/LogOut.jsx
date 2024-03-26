import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Elements/Button";

export default function LogOut() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    await axios.get("http://localhost:3232/auth/logout");
    await getLoggedIn();
    navigate("/");
  }

  return (
    <Button onClick={logOut} className="variant-dropdown size-2">
      Logout
    </Button>
  );
}
