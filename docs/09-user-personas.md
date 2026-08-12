# User Personas

## Overview
User Personas represent the key target user profiles for the **Employee Leave & Attendance Management System**. Designing for these specific personas ensures that the **React.js** frontend provides intuitive user interfaces and the **FastAPI (Python)** backend enforces proper permissions and efficient RESTful workflows.

---

## Persona 1: General Employee

### Demographic Information
- **Name:** Rahim Ahmed
- **Age:** 28
- **Occupation:** Software Engineer
- **Tech Literacy:** High

### User Goals
- Record daily check-in and check-out effortlessly via a clean React web interface.
- Submit leave requests digitally without filling out physical forms or writing manual emails.
- View real-time updates on leave request approval statuses and remaining leave balances.

### Current Frustrations & Challenges
- Annoyed by manual attendance logbooks and paper-based application submissions.
- Lack of visibility into pending leave status due to delayed HR feedback.
- Difficulty tracking personal attendance history and remaining annual leave allowance.

### System Solution Mapping
- **React SPA Interface:** One-click attendance check-in button with immediate UI status badges.
- **Self-Service Leave Portal:** Simple form submission sending asynchronous POST requests to the FastAPI backend.
- **Personal Dashboard:** Dynamic dashboard view showing real-time attendance logs and calculated leave balances retrieved from SQLite.

---

## Persona 2: HR Manager

### Demographic Information
- **Name:** Nusrat Jahan
- **Age:** 35
- **Occupation:** HR Manager
- **Tech Literacy:** Moderate to High

### User Goals
- Review and manage daily attendance records across all company departments in one place.
- Process pending employee leave requests with single-click approve/reject actions.
- Generate and view real-time attendance and leave summary reports for managerial decision-making.

### Current Frustrations & Challenges
- Spending hours cross-referencing paper leave applications against manual Excel logbooks.
- Human calculation errors when deducting taken leaves from an employee's total allowance.
- Administrative delays and lack of a centralized dashboard to track present vs. absent staff.

### System Solution Mapping
- **Centralized HR Dashboard:** Comprehensive view of all employee attendance logs and pending leave applications.
- **One-Click Approval Workflow:** Interactive action buttons that update database record status (*Approved/Rejected*) via FastAPI endpoints.
- **Automated Calculations:** Backend logic automatically calculates remaining leave allowances upon approval, preventing manual spreadsheet errors.

---

## Persona 3: System Administrator

### Demographic Information
- **Name:** Sabbir Hasan
- **Age:** 40
- **Occupation:** System Administrator / IT Operations
- **Tech Literacy:** Expert

### User Goals
- Manage user accounts, role assignments (*Admin/Employee*), and profile states securely.
- Ensure backend API route protection and enforce strict Role-Based Access Control (RBAC).
- Maintain local database health and oversee simple project deployment.

### System Responsibilities
- **User Account Management:** Add, edit, or deactivate employee and HR user credentials.
- **Security & Permissions:** Configure CORS policies and secure endpoints on the FastAPI server.
- **Database Maintenance:** Manage SQLite relational schema, execute data seed scripts (`seed.py`), and handle local data backups.

### System Solution Mapping
- **Role-Based Access Control (RBAC):** Strict JWT/session token validation on FastAPI backend routes preventing unauthorized data access.
- **User Management Panel:** Admin UI for managing user profiles and system permissions.
- **Lightweight Architecture:** Simple SQLite setup allowing frictionless local database backups and maintenance.