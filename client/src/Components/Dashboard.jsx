import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import InfoCard from "./Elements/InfoCard";

export default function Dashboard() {
  const { user, fetchData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchData();
      setLoading(false);
    }
  }, [fetchData, loading]);

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
