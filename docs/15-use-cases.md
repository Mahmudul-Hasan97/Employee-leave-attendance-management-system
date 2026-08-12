# Use Cases

## Project Name
Employee Leave & Attendance Management System

---

# Introduction

This document details the Use Cases for the **Employee Leave & Attendance Management System**. Use cases describe how primary and secondary actors interact with the **React.js** frontend application, which triggers asynchronous REST API endpoints handled by the **FastAPI (Python)** backend and stored in the **SQLite** relational database.

---

# Primary Actors

| Actor | Description | System Scope |
| :--- | :--- | :--- |
| **System Administrator** | Manages system user accounts, configures role access, and oversees database health. | Full System & Administrative Privileges |
| **HR Manager / Admin** | Monitors attendance, reviews leave applications, and generates organizational summaries. | HR Management Panel & Reports |
| **Employee** | Records daily attendance clock-ins, submits leave requests, and tracks history. | Employee Self-Service Dashboard |

---

# UC-01: User Login & Session Initialization

### Primary Actor
Employee / HR Manager / Administrator

### Preconditions
- User profile is registered in the SQLite database.
- User possesses valid email and password credentials.

### Main Flow (React → FastAPI → SQLite)
1. User navigates to the React SPA login page.
2. User enters registered Email and Password into the form and clicks **Login**.
3. React sends an asynchronous `POST` request to `/api/login`.
4. FastAPI validates the password hash against the stored SQLite `users` record.
5. FastAPI returns a successful response containing an authentication token and role data.
6. React stores the session state and redirects the user to their role-specific dashboard.

### Alternative / Error Flow
- **Invalid Credentials:** FastAPI returns HTTP 401 Unauthorized; React displays an error toast message without redirecting.

### Postconditions
- User is authenticated and granted access to authorized routes.

---

# UC-02: Digital Clock-In & Attendance Recording

### Primary Actor
Employee

### Preconditions
- Employee is authenticated and viewing the Employee Dashboard.

### Main Flow
1. Employee views the daily attendance widget on the React interface.
2. Employee clicks the **Check In** or **Check Out** button.
3. React sends a `POST` request to `/api/attendance` with user ID and current timestamp.
4. FastAPI creates a new attendance log entry in the SQLite `attendance` table.
5. FastAPI returns a success payload.
6. React UI updates the button state instantly to reflect the recorded status.

### Postconditions
- Daily attendance entry is successfully persisted in SQLite.

---

# UC-03: Submit Online Leave Application

### Primary Actor
Employee

### Preconditions
- Employee is authenticated and has an available leave balance.

### Main Flow
1. Employee opens the Leave Request module on the React dashboard.
2. Employee selects Leave Type (*Casual, Medical, Annual*), Start Date, End Date, and enters a Reason.
3. Employee clicks **Submit Request**.
4. React sends a `POST` request to `/api/leaves`.
5. FastAPI inserts a new record into the SQLite `leaves` table with a default status of `pending`.
6. React UI displays a success confirmation and adds the entry to the employee's pending leave table.

### Postconditions
- Leave request is saved in SQLite and pending HR review.

---

# UC-04: Review & Approve/Reject Leave Request

### Primary Actor
HR Manager / Admin

### Preconditions
- HR Manager is authenticated and viewing the HR Leave Approval panel.

### Main Flow
1. HR Manager views the list of pending employee leave requests fetched via `GET /api/leaves`.
2. HR Manager inspects request details and clicks **Approve** (or **Reject**).
3. React sends a `PUT` request to `/api/leaves/{id}` with the updated status.
4. FastAPI updates the leave status in SQLite.
5. If approved, FastAPI automatically recalculates and deducts the taken days from the employee's remaining leave balance.
6. React UI updates the status badge to `Approved` or `Rejected` in real-time.

### Postconditions
- Leave status and updated leave balances are permanently recorded.

---

# UC-05: Manage Employee Profiles (CRUD)

### Primary Actor
System Administrator / HR Manager

### Preconditions
- Admin is authenticated with administrative privileges.

### Main Flow
1. Admin navigates to the Employee Management panel.
2. Admin performs desired operation:
   - **Create:** Enters new employee details and role; React posts to `/api/users`.
   - **Update:** Modifies profile details; React sends a `PUT` request.
   - **Deactivate:** Deactivates user access; React sends a status change request.
3. FastAPI executes the SQL query using SQLAlchemy ORM to update the SQLite database.
4. React re-renders the updated employee list table.

### Postconditions
- Employee records are kept accurate in the database.

---

# UC-06: Generate Attendance & Leave Summary Reports

### Primary Actor
HR Manager / Administrator

### Preconditions
- Actor is authenticated and on the Analytics & Reports panel.

### Main Flow
1. User selects date filters or department parameters and clicks **Generate Report**.
2. React sends a request to backend reporting endpoints.
3. FastAPI executes aggregate queries on SQLite `attendance` and `leaves` tables.
4. FastAPI returns summary JSON data.
5. React dynamically renders visual graphs, percentage indicators, and exportable data tables.

---

# Use Case Summary Matrix

| Use Case ID | Use Case Name | Primary Actor | Trigger Endpoint | Primary Database Table |
| :--- | :--- | :--- | :--- | :--- |
| **UC-01** | User Login | All Users | `POST /api/login` | `users` |
| **UC-02** | Mark Attendance | Employee | `POST /api/attendance` | `attendance` |
| **UC-03** | Apply Leave | Employee | `POST /api/leaves` | `leaves` |
| **UC-04** | Approve / Reject Leave | HR Manager | `PUT /api/leaves/{id}` | `leaves`, `users` |
| **UC-05** | Manage Employees | Admin / HR | `/api/users/*` | `users` |
| **UC-06** | Generate Reports | Admin / HR | `/api/reports/*` | `attendance`, `leaves` |