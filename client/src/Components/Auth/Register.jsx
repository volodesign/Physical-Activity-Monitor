import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputText from "../Elements/InputText";
import Dropdown from "../Elements/Dropdown";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";

import countriesData from "../../Data/countries.json";
import gendersData from "../../Data/genders.json";

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

  const [error, setError] = useState("");
  const [existedUser, setExistingUser] = useState(false);

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        first_name,
        last_name,
        middle_name,
        gender,
        age,
        phone,
        country,
        weight,
        height,
      };

      await axios.post("http://localhost:3232/auth", registerData);
      await getLoggedIn();
      navigate("/app");
    } catch (err) {
      window.scrollTo(0, 0);
      setExistingUser(true);
      console.error(err);
      if (err.response && err.response.status === 400) {
        setError("User with this email already exists");
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <>
      <div className="form-container">
        <div className="title-text">
          <h1 className="text-size-6 text-weight-semibold text-style-neutral">
            Create an account
          </h1>
          <p className="text-size-3 text-weight-regular text-style-grey">
            Fill the form below to create your account.
          </p>
        </div>
        {error && <Alert className="alert error">{error}</Alert>}
        <form onSubmit={register}>
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
            required={true}
            emailExists={existedUser}
          />

          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="Add your password"
            errorMessage="Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8 characters."
            required={true}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            isPassword={true}
          />

          <div className="section-text">
            <h2 className="text-size-4 text-weight-semibold text-style-neutral">
              Add some personal information
            </h2>
          </div>

          <InputText
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            label="First name"
            type="text"
            placeholder="Add your first name"
            errorMessage="You must add your name"
            required={true}
          />

          <InputText
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            label="Last name"
            type="text"
            placeholder="Add your last name"
            errorMessage="You must add your last name"
            required={true}
          />

          <InputText
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
            label="Middle name"
            type="text"
            placeholder="Add your middle name"
            errorMessage="You must add your middle"
            required={true}
          />

          <Dropdown
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
            options={gendersData}
            placeholder="Select your gender"
            errorMessage="Select your gender"
            required={true}
          />

          <InputText
            value={age}
            onChange={(e) => setAge(e.target.value)}
            label="Age"
            type="number"
            placeholder="Add your age"
            required={true}
            errorMessage="You must be older than 16 to reate an account"
            min={16}
          />

          <Dropdown
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country"
            options={countriesData}
            placeholder="Select your country"
            errorMessage="Select your country"
            required={true}
          />

          <InputText
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Phone"
            type="text"
            placeholder="0660123456"
            required={true}
            errorMessage="Phone number must be in format 0660123456"
            pattern="^\d{10}$"
          />

          <div className="section-text">
            <h2 className="text-size-4 text-weight-semibold text-style-neutral">
              Add your parametrs
            </h2>
          </div>

          <InputText
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            label="Weight"
            type="number"
            placeholder="Add your weight in kg"
            required={true}
            errorMessage="This doesn't look like correct weight"
            min={40}
            max={250}
          />

          <InputText
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            label="Height"
            type="number"
            placeholder="Add your height in cm"
            required={true}
            errorMessage="This doesn't look like correct height"
            min={120}
            max={250}
          />

          <Button type="Submit" className="variant-solid-neutral size-3">
            Create an account
          </Button>
        </form>
      </div>
    </>
  );
}
