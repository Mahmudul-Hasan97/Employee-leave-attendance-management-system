# Information Gathering

## Purpose

Information gathering was conducted to analyze the limitations of existing manual attendance and leave management workflows, understand user expectations, and define functional and technical requirements for developing a modern **React.js** and **FastAPI (Python)** based web solution.

---

## Methods Used

### Internet & Tech Stack Research
Studied modern Human Resource Management Systems (HRMS) and evaluated web architectures—selecting a Single Page Application (SPA) architecture using **React.js** paired with a lightweight **FastAPI** backend over monolithic legacy setups.

### Workflow Observation
Observed manual attendance recording using paper registers and Excel spreadsheets in organizational environments to identify key operational friction points and human error risks.

### Literature & Documentation Review
Reviewed software documentation for RESTful API design standards, SQLite database relational models, Role-Based Access Control (RBAC) patterns, and HR management best practices.

### Existing Systems Benchmarking
Analyzed core feature sets provided by popular HR software platforms (e.g., OrangeHRM, Zoho People) to map out essential features required for a streamlined, responsive internal portal.

---

## Functional Information Collected

- **User Authentication & Authorization:** Secure, role-based login mechanisms distinguishing Administrators/HR from general Employees.
- **Digital Attendance Recording:** Real-time clock-in and clock-out mechanisms handled asynchronously via REST API calls.
- **Leave Application Workflow:** Digital form submission for leave requests specifying leave types, duration, and rationale.
- **Interactive Leave Approval:** Admin dashboard functionality to view pending requests and perform single-click approvals or rejections.
- **Reporting & Data Export:** Generation of daily, weekly, or monthly attendance and leave summaries.
- **Interactive Dashboard:** Real-time visual metrics displayed on the React frontend showing attendance status and remaining leave balances.

---

## Non-Functional Information Collected

- **Security:** Password encryption/hashing, strict CORS policies between React frontend and FastAPI backend, and role-based route protection.
- **Performance:** Asynchronous API response handling powered by FastAPI/Uvicorn and fast rendering via React's Virtual DOM.
- **Usability:** Responsive, intuitive UI built using modern HTML5, CSS3, and Bootstrap for seamless navigation.
- **Reliability & Storage:** Lightweight, file-based **SQLite** data persistence guaranteeing transactional integrity for local environments.
- **Maintainability:** Modular project architecture separating frontend React components from backend FastAPI routers.

---

## Key Findings

The information-gathering phase highlighted that modern organizations require:

1. **Automation:** Eliminating paper-based logs in favor of instant digital clock-ins.
2. **Real-Time Visibility:** Providing employees with immediate tracking of their leave request status.
3. **Streamlined Administration:** Enabling HR managers to review and approve leave applications through a centralized dashboard.
4. **Data Accuracy & Security:** Storing attendance and user records securely in a structured relational database (SQLite).
5. **Fast & Responsive Experience:** Utilizing lightweight web frameworks (React + FastAPI) to ensure rapid loading times and zero server lag.