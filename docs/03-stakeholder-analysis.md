# Stakeholder Analysis

## Introduction

Stakeholders are individuals, groups, or roles who interact with, manage, or benefit from the **Employee Leave & Attendance Management System**. Understanding stakeholder requirements ensures that the React frontend UI and FastAPI backend API endpoints effectively serve every operational role in the organization.

---

## Primary Stakeholders

| Stakeholder | Responsibilities | Expectations |
| :--- | :--- | :--- |
| **System Administrator** | Manage user accounts, role-based access control (RBAC), and oversee system configuration. | High security, system stability, and seamless data management with SQLite. |
| **HR Manager / Admin** | Review and approve/reject leave requests, manage employee profiles, and monitor attendance metrics. | Intuitive admin dashboard, real-time status updates, and automated reporting. |
| **Employee** | Record daily attendance (clock-in/clock-out), submit leave applications, and view personal logs. | Fast, responsive Single Page Application (SPA) interface, easy navigation, and clear status feedback. |

---

## Secondary Stakeholders

| Stakeholder | Responsibilities | Expectations |
| :--- | :--- | :--- |
| **Organization Management** | Monitor overall workforce availability, attendance trends, and organizational efficiency. | Accurate real-time summary analytics and reduced operational overhead. |
| **IT & System Support** | Ensure backend API server availability (FastAPI/Uvicorn) and maintain local database backups. | Easy deployment, minimal server overhead, and simple REST API integration. |

---

## Stakeholder Needs & Feature Mapping

### System Administrator
- **User & Role Management:** Securely create and manage admin and employee credentials.
- **Data Security:** Role-Based Access Control (RBAC) enforced on FastAPI API routes.
- **Database Operations:** Clean data seeding and management supported by SQLite.

### HR Manager / Admin
- **Leave Approval Workflow:** Interactive dashboard interface to review, approve, or reject pending leave applications.
- **Attendance Monitoring:** Overview of daily clock-in/out records for all employees.
- **Reporting:** Exportable and visual attendance and leave summaries.

### Employee
- **Attendance Marking:** One-click digital clock-in/clock-out via React UI.
- **Leave Application:** Simple online form to submit leave requests specifying dates and leave types.
- **Personal Dashboard:** Real-time visibility into leave approval status and remaining leave balances.

---

## Stakeholder Communication Matrix

| Stakeholder | System Touchpoint / Interface | Communication Method |
| :--- | :--- | :--- |
| **Administrator** | Admin Management Panel | React SPA Dashboard & System Logs |
| **HR Manager** | HR Dashboard & Reports View | Real-Time UI Notifications & Status Badges |
| **Employee** | Employee Portal | Interactive React Views & Instant State Updates |