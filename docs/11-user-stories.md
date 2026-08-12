# User Stories

## Overview
User Stories define system features from the end-user's perspective within an Agile framework. Each story represents a specific requirement implemented via **React.js** frontend views, **FastAPI (Python)** REST API endpoints, and **SQLite** database models.

---

## 1. Employee User Stories

- **Secure Login:**
  *As an Employee, I want to log in using my registered email and password, so that I can access my private dashboard securely using authenticated session tokens.*

- **Digital Attendance Clock-In/Out:**
  *As an Employee, I want to mark my daily check-in and check-out with a single click on the React interface, so that my work hours are instantly logged into the system via FastAPI endpoints.*

- **Online Leave Request Submission:**
  *As an Employee, I want to fill out and submit a digital leave application form specifying leave dates and reasons, so that I no longer need to submit paper forms or informal emails.*

- **Real-Time Leave Status & History Tracking:**
  *As an Employee, I want to view my past attendance records and real-time leave status (Pending, Approved, Rejected), so that I know my current leave balance and approval progress immediately.*

---

## 2. HR Manager / Admin User Stories

- **Leave Approval Workflow:**
  *As an HR Manager, I want to review pending employee leave applications on an interactive dashboard and perform one-click approvals or rejections, so that the approval process is fast and transparent.*

- **Employee Profile Management (CRUD):**
  *As an HR Manager, I want to add new employees, edit personal details, and update profile statuses, so that organizational records remain accurate and up to date.*

- **Daily Attendance Monitoring:**
  *As an HR Manager, I want to view daily attendance logs across all departments, so that I can monitor present, absent, and late-marked staff in real time.*

- **Attendance & Leave Reporting:**
  *As an HR Manager, I want to generate visual summary reports on attendance metrics and leave trends, so that I can make data-driven decisions for workforce planning.*

---

## 3. System Administrator User Stories

- **Role-Based User Management:**
  *As an Administrator, I want to create user accounts and assign specific roles (Admin or Employee), so that access to sensitive API endpoints and UI features is strictly controlled.*

- **System & Route Security:**
  *As an Administrator, I want the system to enforce Role-Based Access Control (RBAC) and proper CORS policies on the FastAPI backend, so that unauthorized data requests are blocked.*

- **Database Maintenance & Seeding:**
  *As an Administrator, I want to execute seed scripts (`seed.py`) and manage SQLite database files, so that initial test data can be loaded and system data backups are easy to maintain.*