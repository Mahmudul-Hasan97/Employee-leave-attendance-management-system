# Product Requirement Document (PRD)

## Project Name
Employee Leave & Attendance Management System

## Version
1.0

## Prepared By
Mahmudul Hasan

## Date
June 2026

---

## Purpose
The purpose of this document is to define the technical, functional, and operational requirements of the **Employee Leave & Attendance Management System**. It acts as a baseline specification for building the **React.js** frontend application and the **FastAPI (Python)** backend API service with **SQLite** data persistence.

---

## Product Vision
To develop a high-performance, secure, and user-friendly web-based system that automates employee attendance tracking and leave management, replacing paper-based friction with an asynchronous, API-driven digital platform.

---

## Product Objectives

- **Automated Digital Check-In:** Provide immediate daily clock-in/clock-out tracking via REST APIs.
- **Streamlined Leave Applications:** Enable employees to submit leave requests with instant UI feedback.
- **Paperless Workflow:** Eliminate physical application forms and manual logbooks.
- **Accelerated Approval Workflow:** Provide administrators with an interactive dashboard for one-click leave approvals or rejections.
- **Data-Driven Reporting:** Generate real-time summaries and attendance statistics on demand.

---

## Target Users & Roles

1. **System Administrator:** Oversees user account creation, system configuration, and role-based permissions.
2. **HR Manager / Admin:** Reviews pending leave applications, manages employee profiles, and monitors daily attendance records.
3. **Employee:** Logs daily attendance, submits leave applications, and tracks personal leave balances and approval statuses.

---

## Technology Stack Specifications

- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, Axios
- **Backend:** Python 3.8+, FastAPI, Uvicorn ASGI Server
- **Database:** SQLite (file-based relational storage using SQLAlchemy ORM)
- **Architecture:** Decoupled Client-Server (RESTful API architecture with JSON payload exchange)

---

## Detailed Module Features

### 1. Employee Module
- **Role-Based Authentication:** Secure login using JWT tokens and encrypted passwords.
- **Digital Attendance Tracking:** Real-time check-in and check-out button interaction with instant status updates.
- **Leave Application Management:** Digital form submission specifying leave type, start/end dates, and reason.
- **Personal History View:** Real-time visibility into historical attendance logs and leave request statuses (*Pending, Approved, Rejected*).
- **Profile Management:** View and manage personal profile details.

### 2. HR / Admin Module
- **Interactive Leave Approval Interface:** Single-click approval or rejection of employee leave applications with automated status updates.
- **Employee Management (CRUD):** Add, view, edit, or deactivate employee profiles.
- **Attendance Monitoring:** Complete daily attendance logs across all departments.
- **Report Generation:** Summarized attendance and leave statistics visualized directly on the React dashboard.

### 3. Administrator & Security Features
- **User Role Management:** Enforce strict Role-Based Access Control (RBAC) on both frontend routes and FastAPI backend endpoints.
- **Data Integrity Constraints:** Foreign key relationships in SQLite ensuring valid employee IDs across attendance and leave records.

---

## Assumptions

- End-users have access to a modern web browser (e.g., Chrome, Firefox, Edge).
- Users possess unique email credentials for secure system authentication.
- Local setup runs the FastAPI server at `http://localhost:8000` and the React frontend at `http://localhost:3000`.

---

## System Constraints

- **Authentication:** Only authenticated users with valid active sessions can access internal system features.
- **Authorization:** Only users assigned the Admin/HR role can approve leave requests or modify employee data.
- **Database Scope:** Configured using lightweight SQLite for quick local setup without requiring a separate server daemon.

---

## Key Performance & Success Criteria

- **High Availability & Speed:** API response times under 200ms powered by FastAPI's asynchronous architecture.
- **Attendance Calculation Accuracy:** 100% calculation accuracy for leave balance deductions managed by automated ORM logic.
- **Improved Approval Speed:** Reduce average leave approval processing time from days to minutes.
- **User Satisfaction:** Higher employee satisfaction driven by a clean, responsive React Single Page Application (SPA).