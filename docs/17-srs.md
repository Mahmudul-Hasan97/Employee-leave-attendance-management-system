# Software Requirements Specification (SRS)

## Project Name
Employee Leave & Attendance Management System

---

# Version Information

| Item | Details |
| :--- | :--- |
| **Version** | 1.0 |
| **Document Type** | Software Requirements Specification (SRS) |
| **Prepared By** | Mahmudul Hasan |
| **Date** | June 2026 |

---

# 1. Introduction

## 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) document is to define the functional, non-functional, database, and system interface specifications for the **Employee Leave & Attendance Management System**. This document serves as the primary technical reference for developers, system architects, and project reviewers.

---

## 1.2 System Scope
The system is a decoupled web application designed to automate organizational attendance recording and leave request workflows. Built with a **React.js** Single Page Application (SPA) frontend and a high-performance **Python (FastAPI)** backend REST API, it replaces legacy paper logs with an asynchronous digital platform backed by an optimized **SQLite** database.

### Core Modules
- **User Authentication & Authorization (RBAC)**
- **Employee Self-Service Portal & Clock-In Module**
- **HR & Admin Leave Approval Workflow**
- **Employee Directory Management (CRUD)**
- **Reporting, Analytics & Visual Dashboards**
- **User Profile Management**

---

## 1.3 Intended Audience
- **System Administrator:** Oversees account management, system configuration, and database integrity.
- **HR Manager / Admin:** Reviews leave requests, monitors daily workforce attendance, and generates summary reports.
- **General Employee:** Records daily check-ins, submits leave applications, and tracks approval status.

---

## 1.4 Terminology & Definitions

| Term | Definition |
| :--- | :--- |
| **SPA** | Single Page Application (React.js UI that updates dynamically without full page reloads). |
| **FastAPI** | Modern, high-performance web framework for building Python RESTful APIs. |
| **SQLite** | Self-contained, serverless, file-based relational database engine. |
| **RBAC** | Role-Based Access Control (restricting API routes and UI views based on user roles). |
| **ORM** | Object-Relational Mapping (SQLAlchemy mapping Python classes to SQLite tables). |

---

# 2. Overall Description

## 2.1 Product Perspective
The application operates as an independent, client-server web architecture:
- **Client Tier:** React.js frontend providing responsive user interfaces.
- **Application Tier:** Python FastAPI backend executing business logic, request validation, and password cryptography.
- **Data Tier:** SQLite relational database engine ensuring persistent data storage.

---

## 2.2 System Functions Overview
- **Authentication:** Secure user login with hashed password verification and session token delivery.
- **Attendance Tracking:** Digital daily check-in and check-out with instant timestamp logs.
- **Leave Operations:** Online leave application submission, balance tracking, and single-click HR approval/rejection.
- **Employee Management:** Complete CRUD operations for administrative management of employee profiles.
- **Analytics & Reporting:** Aggregated attendance and leave statistics compiled dynamically.

---

## 2.3 User Role Characteristics

### System Administrator
- Possesses full system access permissions.
- Manages user accounts, configures CORS/security policies, and seeds SQLite database tables.

### HR Manager / Admin
- Reviews and approves/rejects pending leave requests.
- Monitors live attendance logs across all departments and generates analytics summaries.

### General Employee
- Accesses a personalized employee dashboard.
- Executes daily attendance clock-ins and tracks remaining leave allowances.

---

# 3. Functional Requirements

### 3.1 Authentication & Security
- **FR-AUTH-1:** The system shall authenticate users via email and hashed password using bcrypt validation.
- **FR-AUTH-2:** The system shall enforce Role-Based Access Control (RBAC) on both frontend React Router routes and backend FastAPI API endpoints.
- **FR-AUTH-3:** The system shall clear session authentication states upon user logout.

### 3.2 Employee Module
- **FR-EMP-1:** Employees shall mark daily check-in and check-out timestamps with a single button click on the React interface.
- **FR-EMP-2:** Employees shall submit digital leave requests specifying leave type (*Casual, Medical, Annual*), start date, end date, and reason.
- **FR-EMP-3:** Employees shall view real-time approval statuses (*Pending, Approved, Rejected*) and track remaining leave balances.

### 3.3 HR & Administrative Module
- **FR-HR-1:** HR Managers shall view pending leave applications and approve or reject them with a single click.
- **FR-HR-2:** Upon leave approval, the FastAPI backend shall automatically deduct the taken days from the employee's remaining leave balance in SQLite.
- **FR-HR-3:** Administrators shall create, update, search, or deactivate employee profiles.
- **FR-HR-4:** HR Managers shall generate and view summary reports on attendance and leave distribution.

---

# 4. Non-Functional Requirements

## 4.1 Performance & Responsiveness
- REST API response times for standard requests shall be under 200–500ms.
- Clock-in status badge updates on the React frontend shall occur instantaneously without full page reloads.

## 4.2 Security
- Passwords shall be encrypted using secure hashing techniques prior to database insertion.
- Backend APIs shall enforce strict Cross-Origin Resource Sharing (CORS) rules allowing only trusted client origins.

## 4.3 Reliability & Database Integrity
- SQLite database transactions shall guarantee ACID compliance during attendance recording and leave updates.

## 4.4 Usability & Accessibility
- The interface shall be intuitive, clean, and responsive across desktop and tablet screen sizes using HTML5, CSS3, and Bootstrap.

---

# 5. External Interface Requirements

## 5.1 User Interfaces
The system provides five main interface views:
1. **Login View:** Secure portal for user authentication.
2. **Employee Dashboard:** Clock-in widget, leave submission form, and log history.
3. **HR Approval Panel:** Interactive table for reviewing pending leave requests.
4. **Employee Management Panel:** CRUD interface for updating employee profiles.
5. **Analytics & Reports Panel:** Visual summaries and filterable data tables.

---

## 5.2 Software Interfaces
- **Frontend Framework:** React.js (Node.js runtime environment).
- **Backend Service:** Python 3.8+ with FastAPI framework and Uvicorn ASGI Server.
- **Database Engine:** SQLite3 relational engine accessed via SQLAlchemy ORM.
- **Browser Compatibility:** Google Chrome, Mozilla Firefox, Microsoft Edge, Safari.

---

# 6. Database Schema Requirements

The relational SQLite database structure comprises three primary tables:

1. **`users` Table:**
   - `id` (INTEGER, Primary Key, Auto-increment)
   - `name` (TEXT, Not Null)
   - `email` (TEXT, Unique, Not Null)
   - `password` (TEXT, Hashed, Not Null)
   - `role` (TEXT, Default 'employee')

2. **`attendance` Table:**
   - `id` (INTEGER, Primary Key, Auto-increment)
   - `user_id` (INTEGER, Foreign Key referencing `users.id`)
   - `date` (TEXT, Timestamp)
   - `status` (TEXT, Present/Late/Absent)

3. **`leaves` Table:**
   - `id` (INTEGER, Primary Key, Auto-increment)
   - `user_id` (INTEGER, Foreign Key referencing `users.id`)
   - `leave_type` (TEXT, Not Null)
   - `start_date` (TEXT, Not Null)
   - `end_date` (TEXT, Not Null)
   - `status` (TEXT, Default 'pending')

---

# 7. Business Rules

- Every user must be registered with a unique corporate email address.
- Attendance clock-in can be recorded only once per employee per date.
- Leave requests require explicit HR approval before deducting from an employee's annual balance.
- Employees cannot approve or reject their own leave requests.
- Only users assigned the `admin` role can create or deactivate user accounts.

---

# 8. Testing & Validation Requirements

The system shall be thoroughly validated using:
- **Backend Testing:** `pytest` suites to verify FastAPI endpoints, response status codes, and database CRUD methods.
- **Frontend Validation:** Component and integration testing for React forms and routing logic.
- **Database Integrity Testing:** Transaction testing in SQLite to ensure foreign key constraint enforcement.

---

# 9. Future Enhancements

Potential future upgrades include:
- Biometric & Face Recognition hardware integrations.
- Mobile Application development using React Native.
- Automated Email notifications via FastAPI background tasks.
- Integration with external Payroll management software.

---

# Conclusion

This Software Requirements Specification (SRS) establishes a complete technical blueprint for the **Employee Leave & Attendance Management System**. By pairing a responsive **React.js** frontend with a high-performance **FastAPI** backend and **SQLite** persistence, the system delivers a secure, accurate, and scalable solution for organizational workforce management.