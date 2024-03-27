import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const { user, fetchData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchData();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {" "}
      <div className="content">
        {loading ? (
          <p className="text-size-3 text-weight-regular text-style-grey">
            Loading...
          </p>
        ) : (
          <div className="title-text">
            <p className="text-size-3 text-weight-regular text-style-grey">
              Weight
            </p>
            <h1 className="text-size-6 text-weight-semibold text-style-neutral">
              {user?.weight}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
