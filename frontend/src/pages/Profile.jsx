import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // API call to update profile
      await API.put(`/employees/${user.id || 1}`, user);
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <h1>My Profile</h1>
      {message && <p style={{ color: "#38bdf8", marginBottom: "15px" }}>{message}</p>}
      
      <form onSubmit={handleUpdate} style={{ maxWidth: "400px", backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            type="text"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", backgroundColor: "#0f172a", color: "#fff", border: "1px solid #334155" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            value={user.email || ""}
            disabled
            style={{ width: "100%", padding: "10px", borderRadius: "4px", backgroundColor: "#334155", color: "#94a3b8", border: "1px solid #334155" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}