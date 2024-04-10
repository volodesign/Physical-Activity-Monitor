import React, { useEffect, useState, useContext } from "react";
import Alert from "../Elements/Alert";
import InputText from "../Elements/InputText";
import Button from "../Elements/Button";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function UpdateEmail() {
  const { fetchData } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updated, setUpdated] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  useEffect(() => {
    if (updated) {
      fetchData();
      setUpdated(false);
    }
  }, [updated, fetchData]);

  async function updateEmail(e) {
    e.preventDefault();

    try {
      if (email === "") {
        setSuccess("");
        setError("Enter your new email first");
      } else {
        await axios.post("http://localhost:3232/api/updateEmail", { email });
        setError("");
        setSuccess("Email updated!");
        setEmail("");
        setUpdated(true);
      }
    } catch (err) {
      setExistingUser(true);
      console.error(err);
      if (err.response && err.response.status === 400) {
        setSuccess("");
        setError("User with this email already exists");
      } else {
        setSuccess("");
        setError("Something went wrong");
      }
    }
  }

  return (
    <div className="settings-form-container">
      <div className="title-text">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          Update email
        </h1>
        <p className="text-size-3 text-weight-regular text-style-grey">
          Update email associated with this account.
        </p>
      </div>
      {error && <Alert className="alert error">{error}</Alert>}
      {success && <Alert className="alert success">{success}</Alert>}
      <form onSubmit={updateEmail}>
        <InputText
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setExistingUser(false);
          }}
          label="Email"
          type="email"
          placeholder="Add your email"
          errorMessage="Invalid email"
          required={false}
          onFocus={() => {
            setSuccess("");
            setError("");
          }}
          emailExists={existingUser}
        />
        <Button type="submit" className="variant-solid-neutral size-3">
          Update email
        </Button>
      </form>
    </div>
  );
}
