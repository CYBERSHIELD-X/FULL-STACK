import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/dashboard", {
        headers: { Authorization: token },
      })
      .then((res) => setMessage(res.data.message))
      .catch(() => {
        alert("Unauthorized");
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
