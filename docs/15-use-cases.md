# Use Cases

## Project Name

**Employee Leave & Attendance Management System**

---

# Introduction

A use case describes how users interact with the system to accomplish a specific task. The system has three primary actors:

* Administrator
* HR Manager
* Employee

---

# Actors

| Actor         | Description                            |
| ------------- | -------------------------------------- |
| Administrator | Manages the overall system             |
| HR Manager    | Manages employee attendance and leave  |
| Employee      | Marks attendance and applies for leave |

---

# UC-01 Login

### Actor

Employee / HR Manager / Administrator

### Preconditions

* User is registered.
* User has valid credentials.

### Main Flow

1. Open Login Page.
2. Enter Username.
3. Enter Password.
4. Click Login.
5. System validates credentials.
6. Dashboard opens.

### Alternative Flow

* Invalid username/password.
* Error message displayed.

### Postconditions

User successfully logs in.

---

# UC-02 Mark Attendance

### Actor

Employee

### Preconditions

Employee is logged in.

### Main Flow

1. Open Dashboard.
2. Click "Mark Attendance".
3. System records current date and time.
4. Confirmation message displayed.

### Postconditions

Attendance saved successfully.

---

# UC-03 Apply Leave

### Actor

Employee

### Preconditions

Employee is logged in.

### Main Flow

1. Open Leave Module.
2. Click Apply Leave.
3. Select Leave Type.
4. Select Date.
5. Enter Reason.
6. Submit Request.

### Postconditions

Leave request sent to HR.

---

# UC-04 Approve Leave

### Actor

HR Manager

### Preconditions

HR Manager logged in.

### Main Flow

1. Open Leave Requests.
2. Review Request.
3. Click Approve.
4. System updates status.
5. Employee receives notification.

### Alternative Flow

Reject request with reason.

---

# UC-05 Manage Employees

### Actor

Administrator

### Main Flow

* Add Employee
* Update Employee
* Delete Employee
* Search Employee

---

# UC-06 Generate Reports

### Actor

Administrator / HR Manager

### Reports

* Attendance Report
* Leave Report
* Monthly Summary
* Employee Report

---

# Use Case Summary

| ID    | Use Case         | Actor      |
| ----- | ---------------- | ---------- |
| UC-01 | Login            | All Users  |
| UC-02 | Mark Attendance  | Employee   |
| UC-03 | Apply Leave      | Employee   |
| UC-04 | Approve Leave    | HR         |
| UC-05 | Manage Employees | Admin      |
| UC-06 | Generate Reports | Admin / HR |
