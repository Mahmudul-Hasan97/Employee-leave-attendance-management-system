# Acceptance Criteria

## Overview
Acceptance Criteria define the specific conditions that must be satisfied for a feature to be considered complete. These criteria are defined using the Given-When-Then format to validate interactions between the **React.js** frontend, **FastAPI (Python)** backend, and **SQLite** database.

---

## 1. User Authentication & Login

### Scenario 1: Successful Login with Valid Credentials
- **Given:** The user is registered in the SQLite database with an active status.
- **When:** The user enters valid email/password credentials on the React login page and submits the form.
- **Then:** The FastAPI backend validates the credentials, returns an HTTP 200 response with session/auth token details, and the React router redirects the user to their respective role-based Dashboard (*Employee* or *HR/Admin*).

### Scenario 2: Unsuccessful Login with Invalid Credentials
- **Given:** The user is on the Login page.
- **When:** The user enters an incorrect email or password.
- **Then:** The FastAPI backend returns an HTTP 401 Unauthorized status, and the React UI displays a clear error message without redirecting.

---

## 2. Daily Attendance Recording

### Scenario: Successful Check-In / Check-Out
- **Given:** An employee is logged in and viewing their Employee Dashboard.
- **When:** The employee clicks the "Mark Attendance" (Check-In or Check-Out) button on the React interface.
- **Then:** An asynchronous POST request is sent to `/api/attendance`, a new record with timestamp is inserted into the SQLite `attendance` table, the UI button state updates, and a success confirmation badge appears.

---

## 3. Leave Application Submission

### Scenario: Submitting a Valid Leave Request
- **Given:** An employee is logged in and has an available leave balance.
- **When:** The employee fills out the Leave Application form (Type, Start Date, End Date, Reason) and clicks "Submit Leave Request".
- **Then:** An asynchronous POST request is sent to `/api/leaves`, a new leave record with status `pending` is stored in SQLite, and the request appears immediately in the employee's pending leave history table.

---

## 4. HR Leave Approval & Rejection

### Scenario 1: HR Approves a Pending Leave
- **Given:** The HR Manager/Admin is logged in and viewing the HR Dashboard leave review list.
- **When:** The HR Manager clicks the "Approve" button for a specific pending leave request.
- **Then:** A PUT request updates the leave status to `approved` in SQLite, the backend automatically recalculates and deducts the employee's remaining leave balance, and the leave status badge on both HR and Employee UI updates in real-time.

### Scenario 2: HR Rejects a Pending Leave
- **Given:** The HR Manager/Admin is logged in and reviewing pending requests.
- **When:** The HR Manager clicks the "Reject" button.
- **Then:** The record status updates to `rejected` in SQLite, no leave balance is deducted, and the updated status is reflected on the employee's history log.

---

## 5. Attendance & Leave Report Generation

### Scenario: Admin Views System Reports
- **Given:** An HR Manager or Admin is logged in and on the Reporting panel.
- **When:** The Admin selects filtering options (e.g., date range or department) and clicks "Generate Report".
- **Then:** The FastAPI backend executes optimized aggregate queries on SQLite and returns JSON statistical data, which the React dashboard dynamically renders into interactive summaries and data tables.