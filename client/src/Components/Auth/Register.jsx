import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const {getLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  async function register (e){
    e.preventDefault ();

    try {
      const registerData = {
        email, password, first_name, last_name, middle_name, gender, age, phone, country, weight, height
      }

      await axios.post("http://localhost:3232/auth", registerData);
      await getLoggedIn();
      navigate("/dashboard");

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='Form'>
      <h1>Create a new account</h1>
      <form onSubmit={register}>
        <label>Email<input type='email' placeholder='Add your email' onChange={(e) => setEmail(e.target.value)} value={email}/></label>
        <label>Password<input type='password' placeholder='Add your password' onChange={(e) => setPassword(e.target.value)} value={password}/></label>
        <label>First name<input type='text' placeholder='Add your first name' onChange={(e) => setFirstName(e.target.value)} value={first_name}/></label>
        <label>Last name<input type='text' placeholder='Add your last name' onChange={(e) => setLastName(e.target.value)} value={last_name}/></label>
        <label>Middle name<input type='text' placeholder='Add your middle name' onChange={(e) => setMiddleName(e.target.value)} value={middle_name}/></label>
        <label>Select your gender<input type='text' placeholder='Select your gender' onChange={(e) => setGender(e.target.value)} value={gender}/></label>
        <label>What's your age?<input type='number' placeholder='Select your age' onChange={(e) => setAge(e.target.value)} value={age}/></label>
        <label>Add your phone number<input type='text' placeholder='Add your phone number' onChange={(e) => setPhone(e.target.value)} value={phone}/></label>
        <label>Select your country<input type='text' placeholder='Select country' onChange={(e) => setCountry(e.target.value)} value={country}/></label>
        <label>What's your weight in kg?<input type='number' placeholder='Add your weight' onChange={(e) => setWeight(e.target.value)} value={weight}/></label>
        <label>What's your hight in cm<input type='number' placeholder='Add your height' onChange={(e) => setHeight(e.target.value)} value={height}/></label>
        <button type='Submit'>Create account</button>
      </form>
    </div>
  )
}
