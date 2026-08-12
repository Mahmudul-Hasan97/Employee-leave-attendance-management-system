# System Design

## Project Name
Employee Leave & Attendance Management System

---

# Introduction

The System Design document defines the software architecture, core components, REST API design, system modules, and data interaction flows for the **Employee Leave & Attendance Management System**. It presents a comprehensive overview of how the **React.js** frontend application seamlessly interfaces with the **Python FastAPI** backend services and **SQLite** database engine.

---

# Design Objectives

- **Decoupled Architecture:** Maintain strict separation of concerns between client presentation (React SPA) and server business logic (FastAPI REST API).
- **High Maintainability:** Utilize modular code structures with Pydantic schemas, SQLAlchemy ORM models, and modular React components.
- **Secure Communication:** Enforce Role-Based Access Control (RBAC), password hashing (Bcrypt), and Cross-Origin Resource Sharing (CORS) security.
- **Optimized Data Access:** Leverage lightweight, ACID-compliant SQLite transactions for instant clock-in records and leave applications.
- **Future Scalability:** Structure APIs to support future mobile app integrations or cloud deployments without architectural refactoring.

---

# System Architecture (3-Tier Decoupled Web Architecture)

The system is structured as a decoupled, three-tier client-server architecture:

```text
+-------------------------------------------------------------+
|                      Presentation Layer                     |
|                 React.js Single Page App (SPA)              |
|        (Dashboard Widgets, UI Components, React Router)     |
+------------------------------+------------------------------+
                               |
                               | Asynchronous REST API Requests
                               | (JSON over HTTP/HTTPS)
                               v
+-------------------------------------------------------------+
|                      Application Layer                      |
|                  Python FastAPI REST Services               |
|   (Authentication, RBAC Middleware, Business Logic, CORS)   |
+------------------------------+------------------------------+
                               |
                               | SQLAlchemy ORM Queries
                               | (Python Database Abstraction)
                               v
+-------------------------------------------------------------+
|                       Database Layer                        |
|                  SQLite Relational Database                 |
|              (`users`, `attendance`, `leaves` tables)       |
+-------------------------------------------------------------+
Layer Breakdown & Technical Specifications
1. Presentation Layer (Client-Side)
Framework: React.js (Single Page Application architecture).

Routing: React Router DOM for seamless navigation without page reloads.

State Management: React Context API / Custom Hooks for authentication states and theme options.

HTTP Client: Fetch API / Axios for dispatching asynchronous requests to FastAPI endpoints.

Styling & UI Components: Responsive HTML5, CSS3, and Bootstrap for clean administrative dashboards.

2. Application Layer (Server-Side)
Framework: Python FastAPI running on a Uvicorn ASGI Web Server.

Data Validation: Pydantic models for strict request body and query parameter validation.

Authentication & Security: Bcrypt hashing via passlib for password verification, session token distribution, and FastAPI dependency injection for route protection.

Middleware: CORS middleware configured to manage cross-origin frontend communication.

3. Database Layer (Persistence Tier)
Database Engine: SQLite relational database stored as a localized database file.

ORM Framework: SQLAlchemy for mapping Python object models to SQL tables.

Integrity Enforcement: Foreign key constraints enabled on connection initialization.

Core System Modules
Module 1: Authentication & Authorization
Endpoints: POST /api/login, POST /api/logout

Functions: User credential verification, password hashing validation, session token generation, and role checks (admin, hr, employee).

Module 2: Employee Profile Management (Admin/HR)
Endpoints: GET /api/users, POST /api/users, PUT /api/users/{id}, DELETE /api/users/{id}

Functions: Account provisioning, role assignments, department linking, and profile status updates.

Module 3: Daily Attendance Processing
Endpoints: POST /api/attendance, GET /api/attendance/user/{id}, GET /api/attendance/summary

Functions: Single-click clock-in/out timestamp recording, daily status badge resolution, and historical log fetching.

Module 4: Leave Application & Approval Workflow
Endpoints: POST /api/leaves, GET /api/leaves/pending, PUT /api/leaves/{id}

Functions: Online leave form submission, real-time balance calculations, and HR approval/rejection updates.

Module 5: Analytics & Report Generation
Endpoints: GET /api/reports/attendance, GET /api/reports/leaves

Functions: Data aggregation across users, calculating attendance metrics, and rendering visual report charts on the React dashboard.
Operational Workflows
Employee Workflow
Plaintext
React Login UI ──> POST /api/login ──> Authenticated Dashboard
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             Click Daily Clock-In                        Submit Leave Request
                       │                                           │
             POST /api/attendance                         POST /api/leaves
                       │                                           │
             SQLite `attendance` Insert                  SQLite `leaves` Insert
                       │                                           │
             Instant UI Status Update                    Pending Status Displayed
HR Manager Workflow
Plaintext
React Login UI ──> Authenticated HR Dashboard ──> Fetch GET /api/leaves/pending
                                                          │
                                             Inspect Leave Request Details
                                                          │
                                           ┌──────────────┴──────────────┐
                                           ▼                             ▼
                                     Click Approve                 Click Reject
                                           │                             │
                                  PUT /api/leaves/{id}          PUT /api/leaves/{id}
                                           │                             │
                                  Deduct Leave Balance          Mark Status Rejected
                                           │                             │
                                     SQLite Commit                 SQLite Commit
Security & Error Handling Design
Security Features:

Password hashes stored securely via Bcrypt algorithm.

API endpoint protection enforcing authentication checks before processing queries.

Protection against SQL Injection through SQLAlchemy parameterized ORM queries.

Error Handling Architecture:

Backend: FastAPI HTTPException handlers returning standardized JSON error payloads (e.g., 401 Unauthorized, 404 Not Found, 400 Bad Request).

Frontend: React toast feedback components capturing API error responses and displaying user-friendly alerts.

Conclusion
The system design establishes a clear, modern architecture combining a reactive React.js frontend with a high-performance FastAPI backend and an SQLite database. This decoupled separation ensures the Employee Leave & Attendance Management System remains modular, easy to maintain, secure, and ready for future upgrades.