import React from "react";
import Button from "./Button";
import "../../css/workoutItem.css";

export default function WorkoutItem({ workout, onDelete, onEdit }) {
  const dateObj = new Date(workout.Date);
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

  return (
    <>
      <div className="workout-item-container">
        <div className="workout-info">
          <p className="text-size-4 text-weight-semibold text-style-neutral">
            {workout.type}
          </p>
          <div className="workout-details">
            <div className="details-item">
              {" "}
              <i class="fa-solid fa-fire fa-md"></i>
              <p className="text-size-3 text-weight-medium text-style-grey">
                {workout.calories} kcal
              </p>
            </div>
            <div className="details-item">
              {" "}
              <i class="fa-solid fa-clock fa-md"></i>
              <p className="text-size-3 text-weight-medium text-style-grey">
                {convertTime(workout.duration)}
              </p>
            </div>
            <div className="details-item">
              {" "}
              <i class="fa-solid fa-calendar fa-md"></i>
              <p className="text-size-3 text-weight-medium text-style-grey">
                {workoutDate}
              </p>
            </div>
          </div>
        </div>
        <div className="actions">
          <Button
            className="variant-ghost-danger size-3"
            type="button"
            onClick={() => onDelete(workout._id)}
          >
            Delete
          </Button>
          <Button
            className="variant-soft-neutral size-3"
            type="button"
            onClick={() => onEdit(workout._id)}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
