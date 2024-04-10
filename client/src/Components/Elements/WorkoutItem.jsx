import React, { useState } from "react";
import Button from "./Button";
import "../../css/workoutItem.css";
import ModalPopup from "./ModalPopup";
import EditWorkout from "../ModalContent/EditWorkout";
import axios from "axios";

export default function WorkoutItem({ workout, setUpdated, setSuccess }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = (newValue) => {
    setUpdated(newValue);
  };

  const handleSuccess = (newValue) => {
    setSuccess(newValue);
  };

  const handleIsOpen = (newValue) => {
    setIsOpen(newValue);
  };

  const openModal = () => {
    setSuccess("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteWorkout = async () => {
    setSuccess("");
    try {
      await axios.post(
        `http://localhost:3232/api/workouts/delete/${workout._id}`,
        {}
      );
      setSuccess("Workout deleted!");
      setUpdated(true);
    } catch (error) {
      setSuccess("");
      console.error("Error deleting workout:", error);
    }
  };

  const dateObj = new Date(workout.date);

  const workoutDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const convertTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    let result = "";

    if (hours > 0) {
      result += `${hours}h `;
    }

    if (remainingMinutes > 0) {
      result += `${remainingMinutes}min`;
    }

    return result.trim();
  };

  let content;

  switch (workout.type) {
    case "Workout":
      content = <i className="fa-solid fa-dumbbell fa-lg"></i>;
      break;
    case "Running":
      content = <i class="fa-solid fa-person-running fa-lg"></i>;
      break;
    case "Swimming":
      content = <i className="fa-solid fa-person-swimming fa-lg"></i>;
      break;
    case "Biking":
      content = <i className="fa-solid fa-person-biking fa-lg"></i>;
      break;
    case "Stretching":
      content = <i className="fa-solid fa-heart fa-lg"></i>;
      break;
    default:
      content = <i className="fa-solid fa-person-walking fa-lg"></i>;
  }

  return (
    <>
      <div className="workout-item-container">
        <ModalPopup isOpen={isOpen} onClose={closeModal} title="Edit workout">
          <EditWorkout
            workout={workout}
            setUpdated={handleUpdate}
            setSuccess={handleSuccess}
            setIsOpen={handleIsOpen}
          ></EditWorkout>
        </ModalPopup>
        <div className="workout-icon">{content}</div>
        <div className="workout-info">
          <p className="text-size-4 text-weight-semibold text-style-neutral">
            {workout.type}
          </p>
          <div className="workout-details">
            <div className="details-item">
              {" "}
              <i className="fa-solid fa-fire fa-md"></i>
              <p className="text-size-3 text-weight-medium text-style-grey">
                {workout.calories} kcal
              </p>
            </div>
            <div className="details-item">
              {" "}
              <i className="fa-solid fa-clock fa-md"></i>
              <p className="text-size-3 text-weight-medium text-style-grey">
                {convertTime(workout.duration)}
              </p>
            </div>
            <div className="details-item">
              {" "}
              <i className="fa-solid fa-calendar fa-md"></i>
              <p className="text-size-3 text-weight-medium text-style-grey">
                {workoutDate}
              </p>
            </div>
          </div>
        </div>
        <div className="actions">
          <Button
            className="variant-soft-danger size-3"
            type="button"
            onClick={deleteWorkout}
          >
            Delete
          </Button>
          <Button
            className="variant-soft-neutral size-3"
            type="button"
            onClick={() => openModal(workout._id)}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
