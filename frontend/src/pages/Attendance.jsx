import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [clockInTime, setClockInTime] = useState("");
  const [employeeName, setEmployeeName] = useState(user.name || user.email?.split("@")[0] || "");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance");
      if (Array.isArray(res.data)) {
        setAttendance(res.data);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const handleApplyAttendance = async (e) => {
    e.preventDefault();
    if (!clockInTime || !employeeName) return;

    const payload = {
      user_id: user.id || 1,
      user_name: employeeName,
      date: date,
      clock_in: clockInTime,
    };

    try {
      const res = await API.post("/attendance", payload);
      if (res.data) {
        setAttendance([res.data, ...attendance]);
        setClockInTime("");
        alert("Attendance Request Submitted! Waiting for Admin Approval.");
      }
    } catch (err) {
      console.error("Failed to apply attendance:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/attendance/${id}`, { status });
      setAttendance(attendance.map((att) => (att.id === id ? { ...att, status } : att)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/attendance/${id}`);
      setAttendance(attendance.filter((att) => att.id !== id));
    } catch (err) {
      console.error("Failed to delete attendance:", err);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Attendance Management</h1>

      {/* Attendance Form */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", color: "#38bdf8" }}>Apply Attendance Request</h3>
        <form onSubmit={handleApplyAttendance} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "10px", alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              placeholder="Enter Employee Name"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Clock In Time</label>
            <input
              type="time"
              value={clockInTime}
              onChange={(e) => setClockInTime(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff" }}
            />
          </div>
          <button type="submit" style={{ padding: "9px 20px", backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
            Submit Request
          </button>
        </form>
      </div>

      {/* Attendance Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#0284c7", color: "#ffffff", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>EMPLOYEE NAME</th>
            <th style={{ padding: "12px" }}>DATE</th>
            <th style={{ padding: "12px" }}>CLOCK IN TIME</th>
            <th style={{ padding: "12px" }}>STATUS</th>
            <th style={{ padding: "12px" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr><td colSpan="5" style={{ padding: "15px", textAlign: "center", color: "#94a3b8" }}>No attendance logs found. Fill the form above to apply.</td></tr>
          ) : (
            attendance.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid #334155" }}>
                <td style={{ padding: "12px", fontWeight: "bold", color: "#38bdf8" }}>{log.user_name || "Employee"}</td>
                <td style={{ padding: "12px" }}>{log.date}</td>
                <td style={{ padding: "12px" }}>{log.clock_in}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold",
                    backgroundColor: log.status === "Approved" || log.status === "Present" ? "#16a34a22" : log.status === "Rejected" ? "#ef444422" : "#eab30822",
                    color: log.status === "Approved" || log.status === "Present" ? "#22c55e" : log.status === "Rejected" ? "#ef4444" : "#eab308"
                  }}>
                    {log.status}
                  </span>
                </td>
                <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                  {user.role === "admin" && log.status === "Pending" && (
                    <>
                      <button onClick={() => handleStatusChange(log.id, "Approved")} style={{ padding: "4px 8px", backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Approve</button>
                      <button onClick={() => handleStatusChange(log.id, "Rejected")} style={{ padding: "4px 8px", backgroundColor: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Reject</button>
                    </>
                  )}
                  <button onClick={() => handleDelete(log.id)} style={{ padding: "4px 8px", backgroundColor: "#64748b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}