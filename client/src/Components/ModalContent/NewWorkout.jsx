import React, { useState } from "react";
import InputText from "../Elements/InputText";
import Button from "../Elements/Button";
import axios from "axios";

export default function NewWorkout(props) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  async function submitWorkout(e) {
    e.preventDefault();
    props.setUpdated(false);
    try {
      const workoutData = {
        type,
        duration,
        calories,
      };

      await axios.post(
        "http://localhost:3232/api/workouts/create",
        workoutData
      );
      props.setUpdated(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={submitWorkout}>
      <InputText
        value={type}
        onChange={(e) => setType(e.target.value)}
        label="Workout type"
        type="text"
        required={true}
        placeholder="What was your workout?"
      />
      <InputText
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        label="Duration in minutes"
        type="number"
      />
      <InputText
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        label="Calories burnt"
        type="number"
      />

      <Button type="submit" className="variant-solid-neutral size-3">
        Create workout
      </Button>
    </form>
  );
}
