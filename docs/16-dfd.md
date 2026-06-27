# Data Flow Diagram (DFD)

## Project Name

Employee Leave & Attendance Management System

---

# Introduction

A Data Flow Diagram (DFD) illustrates how information moves through the system. It identifies external entities, processes, data stores, and data flows.

---

# External Entities

* Employee
* HR Manager
* Administrator

---

# Main Processes

1. User Authentication
2. Attendance Management
3. Leave Management
4. Employee Management
5. Report Generation

---

# Data Stores

* User Database
* Employee Database
* Attendance Database
* Leave Database

---

# Context Diagram

```
Employee
      |
      |
      V

+---------------------------------------+
| Employee Leave & Attendance System    |
+---------------------------------------+
      ^
      |
HR Manager

      ^
      |
Administrator
```

---

# DFD Level 0

```
Employee
    |
    | Attendance / Leave Request
    V

+----------------------------+
| Attendance Management      |
+----------------------------+

            |

            V

Attendance Database


Employee

     |

     V

+----------------------------+
| Leave Management           |
+----------------------------+

            |

            V

Leave Database
```

---

# DFD Level 1

### Process 1

Login Authentication

Input

* Username
* Password

Output

* Dashboard

---

### Process 2

Attendance Recording

Input

* Employee ID
* Date
* Time

Output

Attendance Record

---

### Process 3

Leave Processing

Input

* Leave Form

Output

Approved / Rejected Status

---

### Process 4

Report Generation

Input

Attendance Data

Leave Data

Output

Monthly Reports

---

# Data Flow Summary

| Process    | Input              | Output            |
| ---------- | ------------------ | ----------------- |
| Login      | Username, Password | Dashboard         |
| Attendance | Employee ID        | Attendance Record |
| Leave      | Leave Form         | Leave Status      |
| Reports    | Attendance Data    | Reports           |

---

# Conclusion

The DFD clearly represents the movement of information among users, system processes, and databases. It helps developers understand how data flows through the Employee Leave & Attendance Management System.
