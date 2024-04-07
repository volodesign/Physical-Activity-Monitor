import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import InfoCard from "./Elements/InfoCard";
import Workouts from "./App/Workouts";

export default function App() {
  const { user, fetchData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [fetchData, loading, user]);

  return (
    <>
      {loading ? (
        <p className="text-size-4 text-weight-regular text-style-grey">
          Loading...
        </p>
      ) : (
        <div className="app-container">
          <div className="info-card-container">
            <InfoCard value={user?.weight} title="Weight" />
            <InfoCard value={user?.height} title="Height" />
            <InfoCard value={user?.age} title="Age" />
          </div>
          <Workouts />
        </div>
      )}
    </>
  );
}
