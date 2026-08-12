# Interviews

## Objective

The objective of conducting interviews was to gather direct qualitative insights from key organizational roles regarding current operational pain points in attendance tracking and leave handling. The findings helped define functional specifications for building a modern **React.js** frontend and **FastAPI (Python)** backend web application.

---

## Interview Participants

| Role | Department | Focus Area |
| :--- | :--- | :--- |
| **HR Manager** | Human Resources | Leave processing, employee records, and monthly attendance reporting. |
| **Senior Software Employee** | Engineering | User experience expectations, daily check-ins, and leave status visibility. |

---

## Key Interview Questions

1. How is daily attendance currently recorded and processed?
2. What is the step-by-step workflow for submitting and approving leave requests?
3. What recurring challenges or bottlenecks occur in the current system?
4. How much time is spent manually calculating leave balances and compiling attendance reports?
5. What key technical features and UI improvements are required in a new digital solution?

---

## Summary of Responses

### Current Attendance Tracking
Attendance is tracked via physical logbooks or shared Excel spreadsheets, which require manual updates and are susceptible to inaccuracies or missing entries.

### Current Leave Application Workflow
Employees fill out physical paper leave application forms or send unstructured emails to HR, leading to administrative overhead and untracked communication threads.

### Primary Operational Problems Identified
- **Data Inconsistencies:** Lost or duplicate physical records and spreadsheet sync errors.
- **Approval Bottlenecks:** Delayed leave approval feedback due to lack of a centralized dashboard view.
- **Calculation Errors:** Manual mistakes when subtracting taken leaves from annual allowances.
- **Reporting Overhead:** Compiling monthly attendance summaries requires hours of manual cross-referencing.

### Suggested Technical Improvements & Feature Requests
- **Digital One-Click Check-In:** A fast, web-based UI for daily clock-ins built with a responsive framework like React.
- **Centralized Admin Dashboard:** Real-time visibility into all pending leave requests with instant approve/reject actions.
- **Automated Balance Tracking:** Programmatic calculation of leave balances backed by a reliable relational database (SQLite).
- **Fast API Integration:** Instant page updates without full page reloads, powered by asynchronous REST APIs (FastAPI).

---

## Conclusion

The interviews strongly confirmed the urgent need to transition from manual/paper-based workflows to a web application. The gathered feedback directly influenced the design of our **React + FastAPI** system architecture, ensuring high performance, ease of use, and accurate data management.