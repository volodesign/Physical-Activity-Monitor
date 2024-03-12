import React, { useState } from 'react'
import InputText from '../Elements/InputText';
import Button from '../Elements/Button'
import Alert from '../Elements/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFieldFocus = () => {
    setError("");
  };

  async function forgotPassword(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3232/auth/forgot-password", { email });
      navigate("/forgot-password-success");

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("User doesn't exist");
      } else {
        setError("You must enter your credentials first.");
      }
    }
  }

  return (
    <>
      <div className="form-container">

        <div className="title-text">
          <h1 className='solid-text'>Recover password</h1>
          <p className='subtle-text'>Enter your email and we will send you a link to recover your password.</p>
        </div>

        <form onSubmit={forgotPassword}>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            placeholder='Enter your email'
            errorMessage="Invalid email"
            onFocus={handleFieldFocus}
          />

          <Button type="Submit" className="solid-neutral medium">Reset password</Button>

        </form>

        {error && <Alert className="alert error">{error}</Alert>}

      </div>


    </>
  )
}
