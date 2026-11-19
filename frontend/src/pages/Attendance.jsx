import { useState, useEffect } from "react";
import API, { getApiErrorMessage, getStoredUser } from "../services/api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = getStoredUser();

  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().slice(0, 10);
  });
  const [clockInTime, setClockInTime] = useState("");

  useEffect(() => {
    let active = true;
    API.get("/attendance")
      .then(({ data }) => {
        if (active && Array.isArray(data)) setAttendance(data);
      })
      .catch((requestError) => {
        if (active) {
          setError(getApiErrorMessage(requestError, "Could not load attendance records."));
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleApplyAttendance = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setIsSubmitting(true);

    const payload = {
      user_id: user.id || 1,
      date: date,
      clock_in: clockInTime,
    };

    try {
      const res = await API.post("/attendance", payload);
      if (res.data) {
        setAttendance((records) => [res.data, ...records]);
        setClockInTime("");
        setNotice("Attendance request submitted for approval.");
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not submit attendance."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setError("");
    try {
      const { data } = await API.put(`/attendance/${id}`, { status });
      setAttendance((records) => records.map((att) => (att.id === id ? data : att)));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not update attendance status."));
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await API.delete(`/attendance/${id}`);
      setAttendance((records) => records.filter((att) => att.id !== id));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not delete the attendance record."));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Attendance Management</h1>

      {/* Attendance Form */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", color: "#38bdf8" }}>Apply Attendance Request</h3>
        {error && <p role="alert" style={{ color: "#f87171" }}>{error}</p>}
        {notice && <p role="status" style={{ color: "#4ade80" }}>{notice}</p>}
        <form className="responsive-form attendance-form" onSubmit={handleApplyAttendance}>
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
          <button type="submit" disabled={isSubmitting} style={{ padding: "9px 20px", backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: isSubmitting ? "wait" : "pointer" }}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {/* Attendance Table */}
      <div className="table-scroll">
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
    </div>
  );
}