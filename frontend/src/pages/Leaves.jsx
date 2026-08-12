import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [employeeName, setEmployeeName] = useState(user.name || user.email?.split("@")[0] || "");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves");
      if (Array.isArray(res.data)) {
        setLeaves(res.data);
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason || !employeeName) return;

    const payload = {
      user_id: user.id || 1,
      user_name: employeeName,
      start_date: startDate,
      end_date: endDate,
      reason: reason,
    };

    try {
      const res = await API.post("/leaves", payload);
      if (res.data) {
        setLeaves([...leaves, res.data]);
        setStartDate("");
        setEndDate("");
        setReason("");
        alert("Leave Application Submitted Successfully!");
      }
    } catch (err) {
      console.error("Failed to apply leave:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      setLeaves(leaves.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteLeave = async (id) => {
    try {
      await API.delete(`/leaves/${id}`);
      setLeaves(leaves.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Failed to delete leave:", err);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Leave Management</h1>

      {/* Leave Application Form */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", color: "#38bdf8" }}>Apply for Leave</h3>
        <form onSubmit={handleApplyLeave} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr auto", gap: "10px", alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Reason</label>
            <input
              type="text"
              placeholder="Reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <button type="submit" style={{ padding: "9px 20px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
            Submit Application
          </button>
        </form>
      </div>

      {/* Leave Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#0284c7", color: "#ffffff", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>EMPLOYEE NAME</th>
            <th style={{ padding: "12px" }}>START DATE</th>
            <th style={{ padding: "12px" }}>END DATE</th>
            <th style={{ padding: "12px" }}>REASON</th>
            <th style={{ padding: "12px" }}>STATUS</th>
            <th style={{ padding: "12px" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr><td colSpan="6" style={{ padding: "15px", textAlign: "center", color: "#94a3b8" }}>No leave requests found.</td></tr>
          ) : (
            leaves.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #334155" }}>
                <td style={{ padding: "12px", fontWeight: "bold", color: "#38bdf8" }}>{item.user_name || "Employee"}</td>
                <td style={{ padding: "12px" }}>{item.start_date}</td>
                <td style={{ padding: "12px" }}>{item.end_date}</td>
                <td style={{ padding: "12px" }}>{item.reason}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold",
                    backgroundColor: item.status === "Approved" ? "#16a34a22" : item.status === "Rejected" ? "#ef444422" : "#eab30822",
                    color: item.status === "Approved" ? "#22c55e" : item.status === "Rejected" ? "#ef4444" : "#eab308"
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                  {user.role === "admin" && item.status === "Pending" && (
                    <>
                      <button onClick={() => handleStatusChange(item.id, "Approved")} style={{ padding: "4px 8px", backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Approve</button>
                      <button onClick={() => handleStatusChange(item.id, "Rejected")} style={{ padding: "4px 8px", backgroundColor: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Reject</button>
                    </>
                  )}
                  <button onClick={() => handleDeleteLeave(item.id)} style={{ padding: "4px 8px", backgroundColor: "#64748b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}