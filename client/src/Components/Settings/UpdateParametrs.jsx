import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Button from "../Elements/Button";
import InputText from "../Elements/InputText";
import Alert from "../Elements/Alert";
import { UserContext } from "../../context/UserContext";

export default function UpdateParameters() {
  const { user, fetchData } = useContext(UserContext);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [initialHeight, setInitialHeight] = useState("");
  const [initialWeight, setInitialWeight] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          await fetchData();
        } else {
          setInitialHeight(user.height || "");
          setInitialWeight(user.weight || "");
          setHeight(user.height || "");
          setWeight(user.weight || "");
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
      if (height !== "" && height !== initialHeight) {
        newUserData.height = height;
      }
      if (weight !== "" && weight !== initialWeight) {
        newUserData.weight = weight;
      }

      if (Object.keys(newUserData).length === 0) {
        setError("No changes were made");
        return;
      }

      await axios.post("http://localhost:3232/api/updateUser", newUserData);
      setError("");
      setSuccess(true);
      setInitialHeight(newUserData.height || initialHeight);
      setInitialWeight(newUserData.weight || initialWeight);
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
          Update parameters
        </h1>
        <p className="text-size-3 text-weight-regular text-style-grey">
          Update your weight and height.
        </p>
      </div>
      {error && <Alert className="alert error">{error}</Alert>}
      {success && <Alert className="alert success">Parameters updated!</Alert>}
      <form onSubmit={updateUser}>
        <InputText
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          label="Weight"
          type="number"
          placeholder="Add your weight in kg"
          required={false}
          errorMessage="This doesn't look like correct weight"
          min={40}
          max={250}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />
        <InputText
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          label="Height"
          type="number"
          placeholder="Add your height in cm"
          required={false}
          errorMessage="This doesn't look like correct height"
          min={120}
          max={250}
          onFocus={() => {
            setSuccess(false);
            setError(false);
          }}
        />
        <Button type="submit" className="variant-solid-neutral size-3">
          Update parameters
        </Button>
      </form>
    </div>
  );
}
