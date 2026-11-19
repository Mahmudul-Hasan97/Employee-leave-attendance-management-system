import { useState } from "react";
import API, { getApiErrorMessage, getStoredUser } from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(getStoredUser);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!user.id) {
      setMessage("Your session is missing user information. Please sign in again.");
      return;
    }

    try {
      const { data } = await API.put(`/employees/${user.id}`, { name: user.name });
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(getApiErrorMessage(error, "Could not update your profile."));
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