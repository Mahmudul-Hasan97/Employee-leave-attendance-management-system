import { useState, useEffect } from "react";
import API, { getApiErrorMessage } from "../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "employee" });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await API.get("/employees");
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        }
      } catch (err) {
        setError(getApiErrorMessage(err, "Could not load employees."));
      }
    };

    loadEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setIsSubmitting(true);

    try {
      const res = await API.post("/employees", formData);
      if (res.data) {
        setEmployees((currentEmployees) => [...currentEmployees, res.data]);
        setFormData({ name: "", email: "", password: "", role: "employee" });
        setNotice("Employee added successfully.");
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not add the employee."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setNotice("");
    try {
      await API.delete(`/employees/${id}`);
      setEmployees((currentEmployees) => currentEmployees.filter((emp) => emp.id !== id));
      setNotice("Employee deleted.");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not delete the employee."));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Employee Management</h1>

      {error && <p role="alert" style={{ color: "#f87171" }}>{error}</p>}
      {notice && <p role="status" style={{ color: "#4ade80" }}>{notice}</p>}

      <form className="responsive-form employee-form" onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="Employee Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#fff", flex: 1 }}
        />
        <input
          type="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#fff", flex: 1 }}
        />
        <input
          type="password"
          placeholder="Temporary password (8+ characters)"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          minLength={8}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#fff", flex: 1 }}
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #334155", backgroundColor: "#1e293b", color: "#fff" }}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={isSubmitting} style={{ padding: "10px 20px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: isSubmitting ? "wait" : "pointer" }}>
          {isSubmitting ? "Adding..." : "Add Employee"}
        </button>
      </form>

      <div className="table-scroll">
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#0284c7", color: "#ffffff", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>NAME</th>
            <th style={{ padding: "12px" }}>EMAIL</th>
            <th style={{ padding: "12px" }}>ROLE</th>
            <th style={{ padding: "12px" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="5" style={{ padding: "15px", textAlign: "center", color: "#94a3b8" }}>No employees found.</td></tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: "1px solid #334155" }}>
                <td style={{ padding: "12px" }}>{emp.id}</td>
                <td style={{ padding: "12px", fontWeight: "bold", color: "#38bdf8" }}>{emp.name || "N/A"}</td>
                <td style={{ padding: "12px" }}>{emp.email}</td>
                <td style={{ padding: "12px" }}>{emp.role}</td>
                <td style={{ padding: "12px" }}>
                  <button onClick={() => handleDelete(emp.id)} style={{ padding: "6px 12px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Delete
                  </button>
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