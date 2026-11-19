import { useState, useEffect } from "react";
import API, { getApiErrorMessage, getStoredUser } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_employees: 0,
    total_attendance: 0,
    total_leaves: 0,
    pending_leaves: 0,
    pending_attendances: 0,
  });
  const [error, setError] = useState("");

  const user = getStoredUser();

  useEffect(() => {
    let active = true;
    API.get("/dashboard/stats")
      .then(({ data }) => {
        if (active) setStats(data);
      })
      .catch((requestError) => {
        if (active) {
          setError(getApiErrorMessage(requestError, "Could not load dashboard statistics."));
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Welcome, {user.name || "User"} 👋</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Role: <strong style={{ color: "#38bdf8", textTransform: "capitalize" }}>{user.role || "Employee"}</strong>
      </p>

      {error && <p role="alert" style={{ color: "#f87171" }}>{error}</p>}

      {/* Stats Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        
        <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #0284c7" }}>
          <h4 style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>TOTAL EMPLOYEES</h4>
          <h2 style={{ fontSize: "28px", color: "#fff" }}>{stats.total_employees}</h2>
        </div>

        <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #16a34a" }}>
          <h4 style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>ATTENDANCE LOGS</h4>
          <h2 style={{ fontSize: "28px", color: "#fff" }}>{stats.total_attendance}</h2>
        </div>

        <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #eab308" }}>
          <h4 style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>LEAVE REQUESTS</h4>
          <h2 style={{ fontSize: "28px", color: "#fff" }}>{stats.total_leaves}</h2>
        </div>

        <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", borderLeft: "4px solid #dc2626" }}>
          <h4 style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>PENDING LEAVES</h4>
          <h2 style={{ fontSize: "28px", color: "#fff" }}>{stats.pending_leaves}</h2>
        </div>

      </div>
    </div>
  );
}