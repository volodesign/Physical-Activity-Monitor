import React, { useEffect, useState } from "react";
import Table from "../Elements/Table";
import axios from "axios";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3232/api/leaderboard/getdata`
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    if (loading) {
      fetchLeaderboard();
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="leaderboard-container">
      {loading ? (
        <p>Loading</p>
      ) : leaderboard && leaderboard.length > 0 ? (
        <Table tableData={leaderboard} pageTitle="Leaderboard" />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
