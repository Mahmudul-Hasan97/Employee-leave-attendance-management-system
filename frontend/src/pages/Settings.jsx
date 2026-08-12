import React from "react";

export default function Settings() {
  return (
    <div style={{ padding: "30px", backgroundColor: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <h1>Settings</h1>
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginTop: "20px", maxWidth: "500px" }}>
        <h3>App Preferences</h3>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>Manage application preferences, backend configurations, and theme settings.</p>
      </div>
    </div>
  );
}