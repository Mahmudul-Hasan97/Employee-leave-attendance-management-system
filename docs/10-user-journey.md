# User Journey

## Overview
The User Journey defines the step-by-step end-to-end flow for each user role in the **Employee Leave & Attendance Management System**. It illustrates how users interact with the **React.js** frontend SPA and how data flows asynchronously to the **FastAPI (Python)** backend and **SQLite** database.

---

## 1. Employee Journey Map

```text
[ Visit Web Portal ]
        ↓
[ Enter Email & Password ] ──(REST API POST /login)──> [ FastAPI Validates Credentials ]
        ↓                                                        ↓
[ View Employee Dashboard ] <──(Returns Auth Token/Data)────────┘
        ↓
   ┌────┴───────────────────────────────┐
   ↓                                    ↓
[ Mark Daily Check-In/Out ]    [ Apply for Leave ]
   │                                    │
(POST /attendance)               (POST /leaves)
   │                                    │
   ↓                                    ↓
[ Instant Status Update ]       [ Request Saved as Pending ]
   │                                    │
   └────────────────┬───────────────────┘
                    ↓
[ View Attendance History & Status ]
        ↓
[ Logout & Destroy Session ]
Detailed Steps:
Login: Employee opens the React SPA login page, inputs credentials, and sends an authentication request to FastAPI.

Dashboard Access: Upon successful verification, the state is updated and the employee is routed to their personal dashboard.

Daily Attendance: Clicks the "Check In" or "Check Out" button, sending an asynchronous request that records time in SQLite and updates status badges in real-time.

Leave Submission: Fills out a digital leave application form (Type, Start/End Date, Reason) and submits it directly to the database with a default state of Pending.

Status Tracking: Views updated leave balances and tracks status changes (Pending, Approved, Rejected) updated by HR.

Logout: Clears the authentication state and returns to the login screen safely.

2. HR Manager Journey Map
Plaintext
[ Login to HR Portal ]
        ↓
[ View HR Admin Dashboard ] ──(GET /leaves & GET /attendance)──> [ Fetch Data from SQLite ]
        ↓
   ┌────┴───────────────────────────────┐
   ↓                                    ↓
[ Review Pending Leaves ]        [ Monitor Daily Attendance Logs ]
   ↓                                    ↓
[ Click Approve or Reject ]      [ Track Present vs. Absent Staff ]
   ↓                                    │
(PUT /leaves/{id})                      │
   ↓                                    │
[ Auto-Deduct Leave Balance ]           │
   │                                    │
   └────────────────┬───────────────────┘
                    ↓
[ Generate & View Attendance Summaries ]
        ↓
[ Logout ]
Detailed Steps:
Login & Overview: HR Manager logs in with elevated privileges, fetching system-wide statistics from FastAPI endpoints.

Reviewing Applications: Navigates to the Leave Management panel to inspect pending employee applications.

Approval Decision: Clicks "Approve" or "Reject". The backend updates the record in SQLite and automatically adjusts the employee's remaining leave balance upon approval.

Attendance Monitoring: Monitors daily clock-in records across departments to oversee workforce availability.

Reporting: Views real-time summary statistics displayed via interactive React dashboard components.

Logout: Securely terminates the session.

3. System Administrator Journey Map
Plaintext
[ Login as Administrator ]
        ↓
[ Access System Admin Panel ]
        ↓
   ┌────┴──────────────────────────────────────┐
   ↓                                           ↓
[ Manage Employee Accounts ]        [ Configure System Settings ]
   │                                           │
(Create / Update / Deactivate User)  (CORS, Role Permissions, Seed Data)
   │                                           │
   ↓                                           ↓
[ Update Relational User Schema ]     [ Maintain SQLite Database Integrity ]
   │                                           │
   └─────────────────────┬─────────────────────┘
                         ↓
            [ Logout & Secure Session ]
Detailed Steps:
Authentication: Admin authenticates with top-tier role permissions.

Employee Management (CRUD): Adds new employees, updates existing profile details, or revokes access by deactivating accounts.

Role & Permission Setup: Ensures proper Role-Based Access Control (RBAC) rules across FastAPI backend routes.

Database & System Maintenance: Executes seed scripts (seed.py) when needed and monitors local SQLite database files to guarantee reliability.

Logout: Clears local credentials and logs out safely.