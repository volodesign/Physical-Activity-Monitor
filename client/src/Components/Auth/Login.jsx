import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InputText from '../Elements/InputText';
import Button from '../Elements/Button'
import Alert from '../Elements/Alert';


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleFieldFocus = () => {
    setError("");
  };


  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email, password
      }

      await axios.post("http://localhost:3232/auth/login", loginData);
      await getLoggedIn();
      navigate("/dashboard")

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
          <h1 className='solid-text'>Login to your account</h1>
          <p className='subtle-text'>Enter your credentials to login to your account.</p>
        </div>

        <form onSubmit={login}>
          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            placeholder='Enter your email'
            errorMessage="Invalid email"
            onFocus={handleFieldFocus}
          />

          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder='Enter your password'
            errorMessage="Invalid password"
            onFocus={handleFieldFocus}
            isPassword={true}
          />

          <div className='link-wrap'>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="Submit" className="solid-neutral medium">Login</Button>

        </form>

        {error && <Alert className="alert error">{error}</Alert>}

      </div>


    </>


  )
}
