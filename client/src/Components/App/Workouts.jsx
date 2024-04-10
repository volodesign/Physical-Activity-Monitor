import React, { useContext, useEffect, useState } from "react";
import WorkoutItem from "../Elements/WorkoutItem";
import Button from "../Elements/Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Alert from "../Elements/Alert";
import ModalPopup from "../Elements/ModalPopup";
import NewWorkout from "../ModalContent/NewWorkout";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = (newValue) => {
    setUpdated(newValue);
  };

  const handleSuccess = (newValue) => {
    setError("");
    setSuccessMessage("Workout created");
    setSuccess(true);
  };

  const deleteWorkout = async (workoutID) => {
    setError("");
    setSuccess(false);
    try {
      await axios.post(
        `http://localhost:3232/api/workouts/delete/${workoutID}`,
        {}
      );
      setError("");
      setSuccess(true);
      setSuccessMessage("Workout deleted!");
      setUpdated(true);
    } catch (error) {
      setSuccess(false);
      setError("Something went wrong");
      console.error("Error deleting workout:", error);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/api/workouts/getdata/${user?._id}`
        );
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    if (user && (updated || loading)) {
      fetchWorkouts();
      setLoading(false);
      setUpdated(false);
    }
    if (updated) {
      setIsOpen(false);
      setUpdated(false);
      setError("");
    }
  }, [loading, user, updated]);

  return (
    <>
      <div className="files-title-container">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          Workouts
        </h1>
        <Button
          className="variant-solid-neutral size-3"
          type="button"
          onClick={openModal}
        >
          New workout
        </Button>
        <ModalPopup isOpen={isOpen} onClose={closeModal} title="New workout">
          <NewWorkout
            updated={updated}
            setUpdated={handleUpdate}
            setSuccess={handleSuccess}
          />
        </ModalPopup>
      </div>
      {error && <Alert className="alert error">{error}</Alert>}
      {success && <Alert className="alert success">{successMessage}</Alert>}
      <div className="workouts-list-container">
        {workouts.length === 0 || !workouts ? (
          <p className="text-size-4 text-weight-regular text-style-grey">
            You don't have any workouts yet.
          </p>
        ) : (
          workouts
            .slice()
            .reverse()
            .map((workouts, index) => (
              <WorkoutItem
                key={index}
                workout={workouts}
                onDelete={() => deleteWorkout(workouts._id)}
              />
            ))
        )}
      </div>
    </>
  );
}
