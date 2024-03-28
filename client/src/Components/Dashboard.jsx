import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import InfoCard from "./Elements/InfoCard";

export default function Dashboard() {
  const { user, fetchData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        fetchData();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {" "}
      <div className="dashboard-container">
        {loading ? (
          <p className="text-size-3 text-weight-regular text-style-grey">
            Loading...
          </p>
        ) : (
          <div className="info-card-container">
            <InfoCard value={user?.weight} title="Weight" />
            <InfoCard value={user?.height} title="Height" />
            <InfoCard value={user?.age} title="Age" />
          </div>
        )}
      </div>
    </>
  );
}
