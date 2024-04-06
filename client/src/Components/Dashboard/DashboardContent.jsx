import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import InfoCard from "../Elements/InfoCard";

export default function DashboardContent() {
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
      <h1 className="text-size-6 text-weight-semibold text-style-neutral">
        Dashboard
      </h1>
      <div className="info-card-container">
        <InfoCard value={user?.weight} title="Weight" />
        <InfoCard value={user?.height} title="Height" />
        <InfoCard value={user?.age} title="Age" />
      </div>
    </>
  );
}
