import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {getLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  async function login (e){
    e.preventDefault ();

    try {
      const loginData = {
        email, password
      }

      await axios.post("http://localhost:3232/auth/login", loginData);
      await getLoggedIn();
      navigate("/dashboard")

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='Form'>
      <h1>Login to your account</h1>
      <form onSubmit={login}>
        <label>Email<input type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email}/></label>
        <label>Password<input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password}/></label>
        <button type='Submit'>Login</button>
      </form>
    </div>
  )
}
