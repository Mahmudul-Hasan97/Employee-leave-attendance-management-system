# Functional Requirements

## Project Name
Employee Leave & Attendance Management System

---

# Introduction

This document specifies the core functional requirements for the **Employee Leave & Attendance Management System**. These requirements define the interactive capabilities provided by the **React.js** frontend application, processed asynchronously by the **FastAPI (Python)** backend, and persisted within the **SQLite** relational database.

---

# 1. User Authentication & Authorization

## FR-01: Secure User Login
- **Description:** The system shall allow employees and administrators to log in securely using their email and hashed password credentials.
- **Implementation:** React login form sending asynchronous requests to FastAPI `/api/login` endpoint, returning JWT/session authentication tokens.
- **Priority:** High

## FR-02: Session Logout
- **Description:** The system shall allow authenticated users to terminate their session securely, clearing authentication states from the React state and local storage.
- **Priority:** High

---

# 2. Employee Management (CRUD)

## FR-03: Add New Employee
- **Description:** Administrator and HR Managers shall create new employee accounts specifying personal details, contact info, and system role (*Employee* or *Admin*).
- **Implementation:** React modal form sending a `POST` request to create records in SQLite `users` table.
- **Priority:** High

## FR-04: Update Employee Profile
- **Description:** Administrator/HR shall update existing employee profile information (e.g., department, phone, role status).
- **Implementation:** `PUT` API endpoint handling backend updates in SQLite.
- **Priority:** Medium

## FR-05: Deactivate Employee Record
- **Description:** Administrator shall soft-delete or deactivate employee accounts to revoke system access while maintaining historical attendance records.
- **Priority:** Medium

## FR-06: Search & Filter Employees
- **Description:** Users shall search and filter employee lists by Name, Employee ID, or Department directly on the React table UI.
- **Priority:** Medium

---

# 3. Attendance Management

## FR-07: Digital Clock-In & Clock-Out
- **Description:** Employees shall record daily check-in and check-out timestamps with a single button click on the dashboard interface.
- **Implementation:** Asynchronous `POST` requests to `/api/attendance` recording exact dates and timestamps in SQLite.
- **Priority:** High

## FR-08: View Attendance Log History
- **Description:** Employees shall view their historical attendance records, filtering by date ranges or months via interactive React components.
- **Priority:** High

## FR-09: Real-Time Attendance Overview
- **Description:** HR Managers and Administrators shall view real-time present, absent, and late-marked logs across all employees for any given date.
- **Priority:** High

---

# 4. Leave Management Workflow

## FR-10: Online Leave Application
- **Description:** Employees shall submit digital leave requests specifying leave type (*Casual, Medical, Annual*), start/end dates, and justification.
- **Implementation:** React form submitting `POST` payloads to `/api/leaves`, storing entries with default status `pending`.
- **Priority:** High

## FR-11: Track Leave Request Status
- **Description:** Employees shall monitor the progress of their pending leave applications and view updated leave balances.
- **Priority:** High

## FR-12: Approve Leave Request
- **Description:** HR Managers shall approve pending leave requests with a single click on the HR dashboard.
- **Implementation:** FastAPI endpoint updates leave status to `approved` in SQLite and automatically recalculates remaining leave balance.
- **Priority:** High

## FR-13: Reject Leave Request
- **Description:** HR Managers shall reject leave requests with a single click, updating record status to `rejected` without deducting leave balances.
- **Priority:** High

---

# 5. Interactive Dashboard & Analytics

## FR-14: Role-Based Dashboard View
- **Description:** The system shall display tailored dashboard views:
  - **Employee:** Personal check-in buttons, attendance stats, and recent leave statuses.
  - **HR / Admin:** System-wide attendance counts, pending leave review lists, and organizational metrics.
- **Priority:** High

---

# 6. Reporting & Profile Operations

## FR-15: Monthly Attendance Report Generation
- **Description:** HR Manager and Admin shall view generated monthly attendance summaries and exportable log data.
- **Priority:** Medium

## FR-16: Employee Leave Summary Report
- **Description:** System shall compile total leaves taken, remaining allowances, and approval histories per employee.
- **Priority:** Medium

## FR-17: Profile Management & Credentials
- **Description:** Users shall view personal profile details and update their passwords securely using encrypted hash updates.
- **Priority:** Medium

---

# 7. System Security & Access Control

## FR-18: Role-Based Access Control (RBAC)
- **Description:** System shall restrict access to specific API routes and UI components based on assigned user roles (*Admin* vs. *Employee*).
- **Implementation:** Protected routes in React Router and FastAPI dependency injection for role validation.
- **Priority:** High

---

# Summary

The system contains 18 comprehensive functional requirements covering secure authentication, employee CRUD, digital attendance tracking, interactive leave approval workflows, dynamic dashboards, and Role-Based Access Control (RBAC).