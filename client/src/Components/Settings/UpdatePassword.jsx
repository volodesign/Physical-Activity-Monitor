import React, { useState } from "react";
import Alert from "../Elements/Alert";
import InputText from "../Elements/InputText";
import Button from "../Elements/Button";
import axios from "axios";

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function updatePassword(e) {
    e.preventDefault();

    try {
      if (newPassword === "") {
        setSuccess("");
        setError("New password can't be empty");
      } else {
        await axios.post("http://localhost:3232/api/updatePassword", {
          newPassword,
        });
        setError("");
        setSuccess("Password updated!");
        setNewPassword("");
      }
    } catch (err) {
      console.error(err);
      setSuccess("");
      setError("Something went wrong");
    }
  }

  return (
    <div className="settings-form-container">
      <div className="title-text">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          Update password
        </h1>
        <p className="text-size-3 text-weight-regular text-style-grey">
          Update password associated with this account.
        </p>
      </div>
      {error && <Alert className="alert error">{error}</Alert>}
      {success && <Alert className="alert success">{success}</Alert>}
      <form onSubmit={updatePassword}>
        <InputText
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          label="Password"
          type="password"
          placeholder="Create your new password"
          errorMessage="Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8 characters."
          required={false}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          isPassword={true}
          onFocus={() => {
            setSuccess("");
            setError("");
          }}
        />
        <Button type="submit" className="variant-solid-neutral size-3">
          Update password
        </Button>
      </form>
    </div>
  );
}
