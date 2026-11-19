import { useState, useEffect } from "react";
import API, { getApiErrorMessage, getStoredUser } from "../services/api";

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = getStoredUser();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    let active = true;
    API.get("/leaves")
      .then(({ data }) => {
        if (active && Array.isArray(data)) setLeaves(data);
      })
      .catch((requestError) => {
        if (active) {
          setError(getApiErrorMessage(requestError, "Could not load leave requests."));
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setIsSubmitting(true);

    const payload = {
      user_id: user.id || 1,
      start_date: startDate,
      end_date: endDate,
      reason: reason,
    };

    try {
      const res = await API.post("/leaves", payload);
      if (res.data) {
        setLeaves((records) => [...records, res.data]);
        setStartDate("");
        setEndDate("");
        setReason("");
        setNotice("Leave application submitted.");
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not submit the leave application."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setError("");
    try {
      const { data } = await API.put(`/leaves/${id}`, { status });
      setLeaves((records) => records.map((leave) => (leave.id === id ? data : leave)));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not update the leave status."));
    }
  };

  const handleDeleteLeave = async (id) => {
    setError("");
    try {
      await API.delete(`/leaves/${id}`);
      setLeaves((records) => records.filter((leave) => leave.id !== id));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not delete the leave request."));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Leave Management</h1>

      {/* Leave Application Form */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "15px", color: "#38bdf8" }}>Apply for Leave</h3>
        {error && <p role="alert" style={{ color: "#f87171" }}>{error}</p>}
        {notice && <p role="status" style={{ color: "#4ade80" }}>{notice}</p>}
        <form className="responsive-form leave-form" onSubmit={handleApplyLeave}>
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "5px" }}>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate || undefined}
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
              min={startDate || undefined}
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
          <button type="submit" disabled={isSubmitting} style={{ padding: "9px 20px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: isSubmitting ? "wait" : "pointer" }}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

      {/* Leave Table */}
      <div className="table-scroll">
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
    </div>
  );
}