import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputText from "../Elements/InputText";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import "../../css/text.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFieldFocus = () => {
    setError("");
  };

  const navigateForgotPassword = () => {
    navigate("/forgot-password");
  };

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:3232/auth/login", loginData);
      await getLoggedIn();
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Wrong credentials.");
      } else {
        setError("You must enter your credentials first.");
      }
    }
  }

  return (
    <>
      <div className="form-container">
        <div className="title-text">
          <h1 className="text-size-6 text-weight-semibold text-style-neutral">
            Login to your account
          </h1>
          <p className="text-size-3 text-weight-regular text-style-grey">
            Enter your credentials to login to your account.
          </p>
        </div>

        <form onSubmit={login}>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            placeholder="Enter your email"
            errorMessage="Invalid email"
            onFocus={handleFieldFocus}
          />

          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="Enter your password"
            errorMessage="Invalid password"
            onFocus={handleFieldFocus}
            isPassword={true}
          />

          <div className="link-wrap">
            <Button
              type="Button"
              className="size-3 variant-link-neutral"
              onClick={navigateForgotPassword}
            >
              Forgot password?
            </Button>
          </div>

          <Button type="Submit" className="variant-solid-neutral size-3">
            Login
          </Button>
        </form>

        {error && <Alert className="alert error">{error}</Alert>}
      </div>
    </>
  );
}
