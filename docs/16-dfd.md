# Data Flow Diagram (DFD)

## Project Name
Employee Leave & Attendance Management System

---

# Introduction

A Data Flow Diagram (DFD) illustrates how information moves through the **Employee Leave & Attendance Management System**. It highlights data transformations across external entities (Users), system processes (React SPA components & FastAPI API endpoints), and persistent data stores (SQLite database tables).

---

# External Entities

- **Employee:** Interacts with the React UI to log attendance, apply for leaves, and view personal history.
- **HR Manager:** Reviews leave applications, monitors organizational attendance, and generates reports.
- **Administrator:** Manages user accounts, configures roles, and oversees database operations.

---

# Data Stores (SQLite Relational Database)

- **D1: `users` Table:** Stores user IDs, names, emails, hashed passwords, roles (*Admin/Employee*), and profile states.
- **D2: `attendance` Table:** Stores attendance log IDs, foreign key `user_id`, timestamps, and status (*Present/Late/Absent*).
- **D3: `leaves` Table:** Stores leave request IDs, foreign key `user_id`, leave type, start/end dates, reason, status (*Pending/Approved/Rejected*), and submission timestamps.

---

# Level 0: Context Diagram

```text
               ┌──────────────────────────────┐
               │           Employee           │
               └──────────────┬───────────────┘
                              │
       Clock-in Data,         │ Attendance Badges,
       Leave Submissions      │ Leave Status Updates
                              ▼
        ┌───────────────────────────────────────────┐
        │                                           │
        │  Employee Leave & Attendance System       │
        │  (React.js Frontend + FastAPI Backend)    │
        │                                           │
        └─────────────────────▲─────────────────────┘
                              │
          Admin CRUD,         │ Leave Approvals,
          User Accounts       │ Summary Analytics
                              │
               ┌──────────────┴───────────────┐
               │    HR Manager / Admin        │
               └──────────────────────────────┘