# Technical Design Document (TDD)

## Project Name
Employee Leave & Attendance Management System

---

# Version Information

| Item | Details |
| :--- | :--- |
| **Document Name** | Technical Design Document (TDD) |
| **Version** | 1.0 |
| **Prepared By** | Mahmudul Hasan |
| **Date** | June 2026 |

---

# 1. Introduction

## Purpose
The Technical Design Document (TDD) provides a comprehensive technical blueprint for the **Employee Leave & Attendance Management System**. It specifies the low-level component designs, database schema implementations, Python FastAPI REST endpoints, Pydantic data schemas, SQLAlchemy ORM mappings, and React.js state management structures required for system implementation.

---

# 2. System Overview

The system is a modern, decoupled web application built on a client-server architecture.

### User Functions
- **Employees:** Mark daily attendance timestamps, apply for leave, view personal leave balances, and track application approval status.
- **HR Managers:** Review and approve/reject leave requests, monitor workforce attendance in real time, and generate aggregated summary reports.
- **Administrators:** Provision user accounts, assign Role-Based Access Control (RBAC) roles, manage department entities, and oversee system configurations.

---

# 3. Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React.js (v18+)** | Component-based UI library with React Router DOM |
| **Frontend Runtime / Tooling** | **Node.js & Vite / npm** | Development server and module bundler |
| **Backend Framework** | **Python (FastAPI)** | Async Python framework with high-performance execution |
| **ASGI Web Server** | **Uvicorn** | Lightning-fast async server implementation for Python |
| **Database Engine** | **SQLite3** | Embedded, serverless, ACID-compliant relational database |
| **ORM Library** | **SQLAlchemy** | Object-Relational Mapper for Python |
| **Data Validation** | **Pydantic (v2)** | Strict request and response payload schema validation |
| **Security & Auth** | **Bcrypt & Passlib** | Secure password hashing and verification |
| **Version Control** | **Git & GitHub** | Source code management and repository hosting |

---

# 4. System Architecture

The application implements a decoupled **3-Tier Architecture**:

```text
┌─────────────────────────────────────────────────────────┐
│                    Presentation Tier                    │
│            React.js Single Page Application             │
│        (Custom Hooks, React Context, Axios/Fetch)       │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ Asynchronous HTTP REST API Requests
                             │ (JSON Payloads)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    Application Tier                     │
│               Python FastAPI Web Service                │
│     (Routing, Pydantic Schemas, Security, Business Logic)│
└────────────────────────────┬────────────────────────────┘
                             │
                             │ SQLAlchemy ORM Operations
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                      Data Tier                          │
│               SQLite Relational Engine                  │
│       (`users`, `departments`, `attendance`, `leaves`)  │
└─────────────────────────────────────────────────────────┘
5. Component & Module Design5.1 Authentication & Security ModuleBackend Components: auth_router.py, security.py (Bcrypt password hashing, token validation).Frontend Components: Login.jsx, AuthContext.jsx (Global state management for authenticated user sessions).Responsibilities: Validating credentials against SQLite records, hashing new passwords, and enforcing Role-Based Access Control (RBAC).5.2 Employee Self-Service ModuleBackend Components: attendance_router.py, leave_router.py.Frontend Components: EmployeeDashboard.jsx, ClockInWidget.jsx, LeaveForm.jsx.Responsibilities: Managing daily check-in/out button triggers, computing daily status, and submitting leave requests.5.3 HR & Administrative Management ModuleBackend Components: admin_router.py, hr_router.py.Frontend Components: HRDashboard.jsx, LeaveApprovalTable.jsx, UserManagement.jsx.Responsibilities: Handling single-click leave request approvals/rejections, updating remaining leave balances automatically, and managing user CRUD operations.5.4 Analytics & Reporting ModuleBackend Components: reports_router.py.Frontend Components: ReportsDashboard.jsx, AttendanceChart.jsx.Responsibilities: Aggregating monthly attendance percentages, summarizing department leave metrics, and returning structured JSON data for rendering charts.6. Database Schema & SQLAlchemy ORM DesignThe SQLite database schema is mapped using Python SQLAlchemy models:Python# SQLAlchemy Schema Overview (Conceptual)

class Department(Base):
    __tablename__ = 'departments'
    department_id = Column(Integer, primary_key=True, index=True)
    department_name = Column(String, unique=True, nullable=False)

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, default='employee')
    department_id = Column(Integer, ForeignKey('departments.department_id'))
    leave_balance = Column(Integer, default=20)

class Attendance(Base):
    __tablename__ = 'attendance'
    attendance_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    date = Column(String, nullable=False)
    check_in = Column(String, nullable=False)
    check_out = Column(String, nullable=True)
    status = Column(String, default='Present')

class Leave(Base):
    __tablename__ = 'leaves'
    leave_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    leave_type = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    reason = Column(Text, nullable=False)
    status = Column(String, default='pending')
7. RESTful API ArchitectureAll communication between React.js and FastAPI uses standard HTTP methods and JSON formatted payloads:Authentication EndpointsPOST /api/login — Authenticates user credentials and returns user identity metadata.POST /api/logout — Terminates client-side session state.User Management EndpointsGET /api/users — Fetches list of all registered employees (Admin/HR only).POST /api/users — Registers a new user account with hashed password (Admin only).PUT /api/users/{id} — Updates employee information or role (Admin only).DELETE /api/users/{id} — Deactivates or removes a user profile (Admin only).Attendance EndpointsPOST /api/attendance/clock-in — Creates a new clock-in entry with current date and time.POST /api/attendance/clock-out — Updates existing daily log with check-out time.GET /api/attendance/user/{id} — Retrieves historical attendance logs for a specific employee.Leave Management EndpointsPOST /api/leaves — Submits a new leave request.GET /api/leaves/pending — Fetches all pending leave applications for HR review.PUT /api/leaves/{id}/status — Updates request state (approved / rejected) and updates user leave balance.Reports EndpointsGET /api/reports/summary — Compiles general system statistics for HR dashboard widgets.8. Security DesignPassword Cryptography: Password plaintexts are never stored; they are hashed using standard Bcrypt algorithms before SQLite persistence.Role-Based Access Control (RBAC): FastAPI dependencies verify user authorization levels (admin, hr, employee) prior to executing endpoint logic.Cross-Origin Protection: FastAPI CORS middleware restricts API consumption exclusively to trusted frontend client origins (http://localhost:3000 / http://localhost:5173).SQL Injection Prevention: SQLAlchemy ORM executes parameterized queries natively, neutralizing SQL injection vectors.9. Error Handling ArchitectureStandardized HTTP status codes and structured JSON response bodies are used across all API responses:HTTP StatusTrigger ConditionJSON Response Payload Structure400 Bad RequestDuplicate clock-in on same date / insufficient leave balance{"detail": "Clock-in already recorded for today."}401 UnauthorizedInvalid email or incorrect password{"detail": "Invalid credentials provided."}403 ForbiddenInsufficient user role permissions{"detail": "Access restricted to HR/Admin."}404 Not FoundResource ID missing in SQLite{"detail": "Employee record not found."}10. Performance Optimization StrategyDatabase Indexing: Indexed primary keys and unique fields (email, user_id) in SQLite speed up lookup operations.Asynchronous Execution: FastAPI's async def routing prevents thread blocking during database IO operations.Minimal React Renders: Optimized state updates in React ensure smooth UI interactions during user navigation.11. Deployment StrategyDevelopment EnvironmentFrontend: React.js hosted on Vite Development Server (http://localhost:5173).Backend: Python FastAPI executing on Uvicorn ASGI Server (http://127.0.0.1:8000).Database: Localized file-based SQLite database (app.db).Production EnvironmentFrontend Build: Compiled static HTML/JS assets served via Nginx or Vercel.Backend Service: FastAPI deployed with Uvicorn worker processes on a Linux VPS / Gunicorn master process.Database: SQLite file persistence with automated filesystem backup routines.ConclusionThis Technical Design Document establishes a comprehensive implementation specification for the Employee Leave & Attendance Management System. By integrating a React.js SPA with a FastAPI backend and SQLite database, the architecture guarantees clean code separation, robust security, fast API response times, and high maintainability.