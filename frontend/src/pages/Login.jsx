import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      if (response && response.data) {
        const token = response.data.access_token || "token-123";
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Failed:", err);
      setError("Invalid credentials! Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#1e293b", padding: "40px", borderRadius: "8px", width: "100%", maxWidth: "380px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#38bdf8" }}>EMS Login</h2>
        
        {error && <div style={{ backgroundColor: "#ef444422", border: "1px solid #ef4444", color: "#ef4444", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center", fontSize: "14px" }}>{error}</div>}
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@gmail.com or employee@gmail.com"
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#fff", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}