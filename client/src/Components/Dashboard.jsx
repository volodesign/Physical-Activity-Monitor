import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import InfoCard from "./Elements/InfoCard";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="dashboard-container">
        <div className="info-card-container">
          <InfoCard value={user?.weight} title="Weight" />
          <InfoCard value={user?.height} title="Height" />
          <InfoCard value={user?.age} title="Age" />
        </div>
      </div>
    </>
  );
}
