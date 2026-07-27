import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    employee_name: "",
    leave_type: "",
    status: "Pending",
  });

  const API_URL = "http://127.0.0.1:8000/leave";

  // ১. সকল Leave Requests ফেচ করা (GET)
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Form input handle করা
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ২. নতুন Leave Request জমা দেওয়া (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employee_name || !formData.leave_type) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      await axios.post(API_URL, formData);
      setFormData({ employee_name: "", leave_type: "", status: "Pending" });
      fetchLeaveRequests(); // আপডেট হওয়া ডাটা ডাটাবেস থেকে আবার নিয়ে আসা
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  // ৩. Leave Request মুছে ফেলা (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // স্টেট থেকে সাথে সাথে আইটেম সরিয়ে ফেলা
        setLeaveRequests(leaveRequests.filter((request) => request.id !== id));
      } catch (error) {
        console.error("Error deleting leave request:", error);
      }
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Employee Leave Request Management</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          name="employee_name"
          placeholder="Employee Name"
          value={formData.employee_name}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          name="leave_type"
          placeholder="Leave Type (e.g., Casual Leave, Sick Leave)"
          value={formData.leave_type}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />
        <select name="status" value={formData.status} onChange={handleChange} style={{ padding: "8px" }}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Submit Leave Request
        </button>
      </form>

      {/* Table Section */}
      <h3>Leave Requests</h3>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.employee_name}</td>
                <td>{request.leave_type}</td>
                <td>{request.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(request.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;