import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Button from "../Elements/Button";
import InputText from "../Elements/InputText";
import Dropdown from "../Elements/Dropdown";
import Alert from "../Elements/Alert";
import { UserContext } from "../../context/UserContext";

import countriesData from "../../Data/countries.json";
import gendersData from "../../Data/genders.json";

export default function UpdatePersonal() {
  const { user, fetchData } = useContext(UserContext);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [initialFirst_name, setInitialFirstName] = useState("");
  const [initialLast_name, setInitialLastName] = useState("");
  const [initialMiddle_name, setInitialMiddleName] = useState("");
  const [initialGender, setInitialGender] = useState("");
  const [initialAge, setInitialAge] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [initialCountry, setInitialCountry] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          await fetchData();
        } else {
          setInitialFirstName(user.first_name);
          setInitialLastName(user.last_name);
          setInitialMiddleName(user.middle_name);
          setInitialGender(user.gender);
          setInitialAge(user.age);
          setInitialPhone(user.phone);
          setInitialCountry(user.country);

          setFirstName(user.first_name || "");
          setLastName(user.last_name || "");
          setMiddleName(user.middle_name || "");
          setGender(user.gender || "");
          setAge(user.age || "");
          setPhone(user.phone || "");
          setCountry(user.country || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateUser(e) {
    e.preventDefault();

    try {
      const newUserData = {};
      if (first_name !== "" && first_name !== initialFirst_name) {
        newUserData.first_name = first_name;
      }
      if (last_name !== "" && last_name !== initialLast_name) {
        newUserData.last_name = last_name;
      }
      if (middle_name !== "" && middle_name !== initialMiddle_name) {
        newUserData.middle_name = middle_name;
      }
      if (gender !== "" && gender !== initialGender) {
        newUserData.gender = gender;
      }
      if (age !== "" && age !== initialAge) {
        newUserData.age = age;
      }
      if (phone !== "" && phone !== initialPhone) {
        newUserData.phone = phone;
      }
      if (country !== "" && country !== initialCountry) {
        newUserData.country = country;
      }

      if (Object.keys(newUserData).length === 0) {
        setError("No changes were made");
        return;
      }

      await axios.post("http://localhost:3232/api/updateUser", newUserData);
      setError("");
      setSuccess(true);
      setInitialFirstName(newUserData.first_name || initialFirst_name);
      setInitialLastName(newUserData.last_name || initialLast_name);
      setInitialMiddleName(newUserData.middle_name || initialMiddle_name);
      setInitialGender(newUserData.gender || initialGender);
      setInitialAge(newUserData.age || initialAge);
      setInitialPhone(newUserData.phone || initialPhone);
      setInitialCountry(newUserData.country || initialCountry);
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setError("Something went wrong");
    }
  }

  return (
    <div className="settings-form-container">
      <div className="title-text">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          Update personal information
        </h1>
        <p className="text-size-3 text-weight-regular text-style-grey">
          Update your personal information.
        </p>
      </div>
      {error && <Alert className="alert error">{error}</Alert>}
      {success && (
        <Alert className="alert success">Personal information updated!</Alert>
      )}
      <form onSubmit={updateUser}>
        <InputText
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          label="First name"
          type="text"
          placeholder="Add your first name"
          errorMessage="You must add your name"
          required={false}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />

        <InputText
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          label="Last name"
          type="text"
          placeholder="Add your last name"
          errorMessage="You must add your last name"
          required={false}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />

        <InputText
          value={middle_name}
          onChange={(e) => setMiddleName(e.target.value)}
          label="Middle name"
          type="text"
          placeholder="Add your middle name"
          errorMessage="You must add your middle"
          required={false}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />

        <Dropdown
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          label="Gender"
          options={gendersData}
          placeholder="Select your gender"
          errorMessage="Select your gender"
          required={false}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />

        <InputText
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label="Age"
          type="number"
          placeholder="Add your age"
          required={false}
          errorMessage="You must be older than 16 to reate an account"
          min={16}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />

        <Dropdown
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          label="Country"
          options={countriesData}
          placeholder="Select your country"
          errorMessage="Select your country"
          required={false}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />

        <InputText
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          type="text"
          placeholder="0660123456"
          required={false}
          errorMessage="Phone number must be in format 0660123456"
          pattern="^\d{10}$"
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />
        <Button type="submit" className="variant-solid-neutral size-3">
          Update personal information
        </Button>
      </form>
    </div>
  );
}
