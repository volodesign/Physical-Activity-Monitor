import React, { useState } from 'react'
import axios from 'axios';
import InputText from '../Elements/InputText';
import Button from '../Elements/Button'
import { useNavigate } from 'react-router-dom';
import Alert from '../Elements/Alert';

export default function ResetPassword() {

  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const token = window.location.pathname.split("/").pop();

      await axios.post(`http://localhost:3232/auth/reset-password/${token}`, { newPassword });
      navigate("/reset-password-success");


    } catch (err) {
      setError("Something went wrong");

    }
  }

  return (
    <>
      <div className="form-container">

        <div className="title-text">
          <h1 className='solid-text'>Create new password</h1>
          <p className='subtle-text'>Create a new password for your account.</p>
        </div>

        <form onSubmit={resetPassword}>
          <InputText
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder='Create your new password'
            errorMessage="Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8 characters."
            required={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            isPassword={true}
          />

          <Button type="Submit" className="solid-neutral medium">Update password</Button>

        </form>
        {error && <Alert className="alert error">{error}</Alert>}


      </div>
    </>
  )
}
