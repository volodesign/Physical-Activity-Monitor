import React, { useState } from "react";
import InputText from "../Elements/InputText";
import Button from "../Elements/Button";
import axios from "axios";
import Dropdown from "../Elements/Dropdown";
import workoutsData from "../../Data/workouts.json";

export default function EditWorkout(props) {
  const [type, setType] = useState(props.workout.type);
  const [duration, setDuration] = useState(props.workout.duration);
  const [calories, setCalories] = useState(props.workout.calories);

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
        `http://localhost:3232/api/workouts/update/${props.workout._id}`,
        workoutData
      );
    } catch (err) {
      console.log(err);
    }
    props.setIsOpen(false);
    props.setUpdated(true);
    props.setSuccess("Workout updated!");
  }

  return (
    <form onSubmit={submitWorkout}>
      <Dropdown
        value={type}
        onChange={(e) => setType(e.target.value)}
        label="Workout type"
        options={workoutsData}
        placeholder="What was your workout?"
        errorMessage="Add type of workout"
        required={true}
      />
      <InputText
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        label="Duration in minutes"
        type="number"
        required={true}
        errorMessage="Add a duration"
      />
      <InputText
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        label="Calories burnt"
        required={true}
        type="number"
        errorMessage="Add calories"
      />

      <Button type="submit" className="variant-solid-neutral size-3">
        Update
      </Button>
    </form>
  );
}
