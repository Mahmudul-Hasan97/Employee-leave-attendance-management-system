# Problem Statement

## Background

Many organisations still manage employee attendance and leave manually using paper forms, physical registers, or unintegrated spreadsheets. These legacy methods are inefficient, time-consuming, prone to human errors, and lack real-time visibility for both employees and HR managers.

---

## Existing Problems in Legacy Systems

### Manual Attendance Tracking
Employees mark attendance manually on physical sign-in sheets or disconnected logs, increasing the chances of proxy attendance and inaccurate time-tracking entries.

### Paper-Based Leave Applications
Employees submit leave requests via paper forms or informal emails, making it difficult for HR personnel to maintain a organized history and track active requests.

### Delayed Approvals & Bottlenecks
Without a centralized dashboard, managers and administrators take longer to review, approve, or reject leave applications, leading to operational delays.

### Human Errors in Calculations
Calculating monthly attendance percentages and remaining leave balances manually frequently leads to discrepancies and accounting mistakes.

### Data Loss & Security Risks
Physical paper records and local spreadsheets can easily be lost, damaged, or accessed by unauthorized individuals without access control.

### Lack of Real-Time Reporting
Generating attendance and leave summaries manually requires significant effort and time, delaying managerial decision-making.

---

## Need for the Proposed System

The proposed **Employee Leave & Attendance Management System** addresses these operational challenges by leveraging a modern **React.js** dynamic frontend and a high-performance **Python (FastAPI)** backend. The solution provides:

- **Automated Digital Attendance:** Instant clock-in/clock-out tracking via an interactive web interface.
- **Online Leave Request Workflow:** Streamlined submit-and-approve functionality for employees and admins.
- **Automated Balance Calculations:** Real-time updates to leave balances using structured backend logic.
- **Secure & Lightweight Persistence:** Centralized data storage using an optimized **SQLite** database schema.
- **Instant Report Generation:** Real-time summary views on the admin dashboard.
- **Role-Based Access Control:** Strict permission-based security separating employee views from admin management panels.

---

## Conclusion

By transitioning from manual processes to this FastAPI and React-powered system, organisations eliminate operational bottlenecks, reduce administrative overhead, ensure data accuracy, and significantly improve workforce management efficiency.