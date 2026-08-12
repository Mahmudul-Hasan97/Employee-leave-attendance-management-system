import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees", adminOnly: true },
    { name: "Attendance", path: "/attendance" },
    { name: "Leave Requests", path: "/leave" },
    { name: "Profile", path: "/profile" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0f172a", color: "#ffffff" }}>
      {/* Sidebar */}
      <aside style={{ width: "240px", backgroundColor: "#1e293b", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", borderRight: "1px solid #334155" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#38bdf8", marginBottom: "20px" }}>EMS System</h2>
        
        {navItems.map((item) => {
          if (item.adminOnly && user.role !== "admin") return null;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive ? "#38bdf8" : "#cbd5e1",
                backgroundColor: isActive ? "#334155" : "transparent",
                padding: "10px 15px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {item.name}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "10px",
            backgroundColor: "#ef4444",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ height: "60px", backgroundColor: "#1e293b", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 30px" }}>
          <span style={{ color: "#94a3b8" }}>
            Welcome, <b style={{ color: "#fff" }}>{user.name || user.email || "User"}</b> ({user.role || "employee"})
          </span>
          <button
            onClick={handleLogout}
            style={{ padding: "6px 14px", backgroundColor: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Logout
          </button>
        </header>
        <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}