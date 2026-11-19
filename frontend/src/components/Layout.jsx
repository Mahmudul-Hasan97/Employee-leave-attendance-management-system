import { Link, useNavigate, useLocation } from "react-router-dom";
import { getStoredUser } from "../services/api";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
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
    <div className="app-shell">
      <aside className="app-sidebar">
        <h2 className="app-brand">EMS System</h2>
        <nav className="app-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.adminOnly && user.role?.toLowerCase() !== "admin") return null;
            const isActive = location.pathname === item.path
              || (item.path === "/leave" && location.pathname === "/leaves");
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
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
        </nav>
      </aside>

      <div className="app-main">
        <header className="app-header">
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
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}