import { useState, useEffect } from "react";
import API, { getApiErrorMessage, getStoredUser } from "../services/api";

export default function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const user = getStoredUser();

  useEffect(() => {
    let active = true;
    Promise.all([API.get("/attendance"), API.get("/leaves")])
      .then(([attendanceResponse, leaveResponse]) => {
        if (!active) return;
        if (Array.isArray(attendanceResponse.data)) setAttendance(attendanceResponse.data);
        if (Array.isArray(leaveResponse.data)) setLeaves(leaveResponse.data);
      })
      .catch((requestError) => {
        if (active) {
          setError(getApiErrorMessage(requestError, "Could not load report data."));
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleDownloadCSV = async () => {
    setIsDownloading(true);
    setError("");
    try {
      const response = await API.get("/reports/download", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `System_Report_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not download the report."));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <div>
          <h1 style={{ marginBottom: "5px" }}>Reports & Analytics</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            Viewing as: <strong style={{ color: "#38bdf8", textTransform: "capitalize" }}>{user.role || "User"}</strong> ({user.name || user.email})
          </p>
        </div>

        {/* Download Button - Works for both Admin and Employee */}
        <button
          onClick={handleDownloadCSV}
          disabled={isDownloading}
          style={{
            padding: "12px 24px",
            backgroundColor: isDownloading ? "#64748b" : "#16a34a",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: isDownloading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)"
          }}
        >
          {isDownloading ? "Downloading..." : "📥 Download CSV Report"}
        </button>
      </div>

      {error && <p role="alert" style={{ color: "#f87171" }}>{error}</p>}

      {/* Attendance Summary Preview */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3 style={{ color: "#38bdf8", marginBottom: "15px" }}>Attendance Records</h3>
        <div className="table-scroll">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0f172a", color: "#94a3b8", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Employee</th>
              <th style={{ padding: "10px" }}>Date</th>
              <th style={{ padding: "10px" }}>Clock In</th>
              <th style={{ padding: "10px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: "10px", color: "#64748b" }}>No attendance data found.</td></tr>
            ) : (
              attendance.slice(0, 5).map((att) => (
                <tr key={att.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "10px" }}>{att.user_name || "Employee"}</td>
                  <td style={{ padding: "10px" }}>{att.date}</td>
                  <td style={{ padding: "10px" }}>{att.clock_in}</td>
                  <td style={{ padding: "10px", color: att.status === "Approved" || att.status === "Present" ? "#22c55e" : "#eab308" }}>{att.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Leave Summary Preview */}
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ color: "#eab308", marginBottom: "15px" }}>Leave Records</h3>
        <div className="table-scroll">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#0f172a", color: "#94a3b8", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Employee</th>
              <th style={{ padding: "10px" }}>Start Date</th>
              <th style={{ padding: "10px" }}>End Date</th>
              <th style={{ padding: "10px" }}>Reason</th>
              <th style={{ padding: "10px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: "10px", color: "#64748b" }}>No leave data found.</td></tr>
            ) : (
              leaves.slice(0, 5).map((l) => (
                <tr key={l.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "10px" }}>{l.user_name || "Employee"}</td>
                  <td style={{ padding: "10px" }}>{l.start_date}</td>
                  <td style={{ padding: "10px" }}>{l.end_date}</td>
                  <td style={{ padding: "10px" }}>{l.reason}</td>
                  <td style={{ padding: "10px", color: l.status === "Approved" ? "#22c55e" : l.status === "Rejected" ? "#ef4444" : "#eab308" }}>{l.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}