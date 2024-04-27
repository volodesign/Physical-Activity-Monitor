import React, { useContext, useEffect, useState } from "react";
import WorkoutItem from "../Elements/WorkoutItem";
import Button from "../Elements/Button";
import IconButton from "../Elements/IconButton";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Alert from "../Elements/Alert";
import ModalPopup from "../Elements/ModalPopup";
import NewWorkout from "../ModalContent/NewWorkout";

export default function Workouts() {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [updated, setUpdated] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = (newValue) => {
    setUpdated(newValue);
  };

  const handleSuccess = (newValue) => {
    setError("");
    setSuccess(newValue);
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    try {
      console.log("date", date);
      const response = await axios.get(
        `http://localhost:3232/api/workouts/getdata/${user?._id}/${date}`
      );
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching items by date:", error);
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
        <div className="date-container">
          <input
            className="datepicker"
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <IconButton
            className="ib-variant-soft-neutral ib-size-2"
            onClick={(event) =>
              event.target.previousElementSibling &&
              event.target.previousElementSibling.showPicker()
            }
          >
            <i className="fa-solid fa-calendar"></i>
          </IconButton>
          <h1 className="text-size-6 text-weight-semibold text-style-neutral">
            {selectedDate
              ? new Date(selectedDate).toDateString() ===
                new Date().toDateString()
                ? "Workouts for Today"
                : `Workouts for ${new Date(selectedDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric" }
                  )}`
              : "All workouts"}
          </h1>
        </div>

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
      {loading ? (
        <p className="text-size-4 text-weight-regular text-style-grey">
          Loading...
        </p>
      ) : (
        <>
          {error && <Alert className="alert error">{error}</Alert>}
          {success && <Alert className="alert success">{success}</Alert>}
          <div className="workouts-list-container">
            {!workouts || workouts.length === 0 ? (
              <p className="text-size-4 text-weight-regular text-style-grey">
                You don't have any workouts.
              </p>
            ) : (
              workouts
                .slice()
                .reverse()
                .map((workout, index) => (
                  <WorkoutItem
                    key={index}
                    workout={workout}
                    onEdit={handleUpdate}
                    setUpdated={handleUpdate}
                    setSuccess={handleSuccess}
                  />
                ))
            )}
          </div>
        </>
      )}
    </>
  );
}
