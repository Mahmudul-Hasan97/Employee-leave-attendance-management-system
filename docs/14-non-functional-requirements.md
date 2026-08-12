# Non-Functional Requirements

## Project Name
Employee Leave & Attendance Management System

---

# Introduction

This document specifies the non-functional quality attributes of the **Employee Leave & Attendance Management System**. These non-functional requirements define performance metrics, security guarantees, usability standards, and system maintainability supported by the **React.js** frontend SPA, **FastAPI (Python)** backend, and **SQLite** database framework.

---

# 1. Performance & Responsiveness

- **API Response Time:** The FastAPI backend API endpoints shall respond to HTTP requests within 200–500 milliseconds under normal operating workloads.
- **Attendance Clock-In Execution:** Recording a daily clock-in or check-out shall take less than 1 second, updating the React UI instantaneously using virtual DOM updates.
- **Report Generation:** Dashboard analytics queries executed against the SQLite database shall compile and render on the client interface in under 2 seconds.

---

# 2. Security & Data Protection

- **Password Hashing:** All user passwords stored in the SQLite database shall be securely hashed using industry-standard cryptography (e.g., `bcrypt`).
- **Role-Based Authorization (RBAC):** Access to administrative endpoints (`/api/admin/*`) and restricted React views shall be strictly gated based on authenticated user roles (*Admin* vs. *Employee*).
- **CORS Protection:** The FastAPI backend shall enforce strict Cross-Origin Resource Sharing (CORS) policies to allow API interaction only from trusted client domain origins.
- **Data Validation:** Both frontend forms (React) and backend models (FastAPI/Pydantic) shall sanitize input fields to prevent SQL injection and cross-site scripting (XSS).

---

# 3. Usability & Interface Design

- **Modern Single Page Application (SPA):** The frontend interface shall be built using React.js to ensure fast, seamless navigation without full page reloads.
- **Responsive Layout:** UI components shall adapt gracefully to various screen resolutions across desktops, laptops, and tablets using HTML5, CSS3, and Bootstrap.
- **Interactive Feedback:** Forms and action buttons shall provide clear validation messages, status badges (*Pending, Approved, Rejected*), and loading indicators.

---

# 4. Maintainability & Modular Architecture

- **Clean Decoupled Architecture:** The system architecture strictly decouples the client frontend (`frontend/`) from the RESTful backend service (`backend/`).
- **Code Organization:** Python backend code shall utilize modular FastAPI routers, and React code shall maintain reusable components.
- **Documentation:** System architecture, database schemas, and setup instructions shall be documented within the `docs/` folder and root `README.md`.

---

# 5. Reliability & Availability

- **System Uptime:** The local server setup running Uvicorn shall provide 99.9% uptime during operational testing hours.
- **Database Transactional Integrity:** The lightweight SQLite engine shall guarantee ACID-compliant transactions to prevent data corruption during attendance logs or leave status updates.

---

# 6. Compatibility & Portability

- **Cross-Browser Compatibility:** The React SPA shall function identically across modern web browsers, including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.
- **Platform Independence:** The Python FastAPI backend and Node.js React environment can run natively on Windows, macOS, and Linux operating systems.

---

# 7. Scalability & Lightweight Storage

- **Optimized Data Indexing:** Primary and foreign keys in the SQLite database (`user_id` foreign keys in `attendance` and `leaves` tables) shall ensure efficient relational query execution as record volume grows.
- **Efficient Asset Loading:** Bundled React production builds shall minimize asset sizes for rapid static file delivery.

---

# Summary

The non-functional requirements guarantee that the Employee Leave & Attendance Management System delivers high performance, secure role-based permissions, clean maintainable code, and a highly responsive user experience powered by React.js and FastAPI.