# Database Design

## Project Name

**Employee Leave & Attendance Management System**

---

# 1. Introduction

The Database Design document describes the structure of the database used in the Employee Leave & Attendance Management System. It defines the tables, attributes, relationships, keys, constraints, and normalization applied to ensure efficient data storage and retrieval.

---

# 2. Database Management System

| Item           | Description    |
| -------------- | -------------- |
| Database       | MySQL          |
| Storage Engine | InnoDB         |
| Character Set  | UTF-8          |
| Primary Key    | Auto Increment |
| Foreign Key    | Supported      |

---

# 3. Database Tables

The system consists of the following tables:

* Users
* Employees
* Departments
* Attendance
* Leave_Requests

---

# 4. Users Table

Purpose:
Stores login information for all users.

| Field    | Type         | Constraint      |
| -------- | ------------ | --------------- |
| user_id  | INT          | Primary Key     |
| username | VARCHAR(50)  | Unique          |
| password | VARCHAR(255) | Not Null        |
| role     | VARCHAR(20)  | Not Null        |
| status   | VARCHAR(20)  | Active/Inactive |

---

# 5. Employees Table

Purpose:
Stores employee information.

| Field         | Type         |
| ------------- | ------------ |
| employee_id   | INT          |
| first_name    | VARCHAR(50)  |
| last_name     | VARCHAR(50)  |
| email         | VARCHAR(100) |
| phone         | VARCHAR(20)  |
| department_id | INT          |
| joining_date  | DATE         |

Primary Key

employee_id

Foreign Key

department_id

---

# 6. Departments Table

Purpose:
Stores department information.

| Field           | Type         |
| --------------- | ------------ |
| department_id   | INT          |
| department_name | VARCHAR(100) |

---

# 7. Attendance Table

Purpose:
Stores daily attendance.

| Field           | Type        |
| --------------- | ----------- |
| attendance_id   | INT         |
| employee_id     | INT         |
| attendance_date | DATE        |
| check_in        | TIME        |
| check_out       | TIME        |
| status          | VARCHAR(20) |

---

# 8. Leave Requests Table

Purpose:
Stores employee leave requests.

| Field           | Type        |
| --------------- | ----------- |
| leave_id        | INT         |
| employee_id     | INT         |
| leave_type      | VARCHAR(30) |
| start_date      | DATE        |
| end_date        | DATE        |
| reason          | TEXT        |
| approval_status | VARCHAR(20) |

---

# 9. Relationships

Department → Employee

1 : Many

Employee → Attendance

1 : Many

Employee → Leave Requests

1 : Many

User → Employee

1 : 1

---

# 10. Normalization

The database is normalized up to **Third Normal Form (3NF)**.

Benefits:

* Eliminates duplicate data.
* Improves consistency.
* Reduces redundancy.
* Simplifies maintenance.

---

# 11. Constraints

* Primary Key
* Foreign Key
* NOT NULL
* UNIQUE
* AUTO_INCREMENT

---

# 12. Security

* Passwords are encrypted.
* Database access is restricted.
* Regular backups are maintained.
* User permissions are role-based.

---

# 13. Backup Strategy

* Daily Automatic Backup
* Weekly Full Backup
* Monthly Archive Backup

---

# 14. Advantages

* Fast data retrieval
* Data integrity
* Easy maintenance
* Better scalability
* High security

---

# Conclusion

The database design ensures reliable, secure, and efficient management of employee attendance and leave information. Proper normalization, constraints, and relationships maintain data consistency and improve system performance.
