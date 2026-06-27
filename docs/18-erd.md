# Entity Relationship Diagram (ERD)

## Project Name

**Employee Leave & Attendance Management System**

---

# Introduction

The Entity Relationship Diagram (ERD) illustrates the logical structure of the database used in the Employee Leave & Attendance Management System. It identifies the entities, their attributes, primary keys, foreign keys, and relationships.

---

# Objectives

The ERD is designed to:

* Store employee information.
* Record daily attendance.
* Manage leave applications.
* Maintain department details.
* Authenticate users securely.
* Support report generation.

---

# Main Entities

The system contains the following entities:

1. Users
2. Employees
3. Departments
4. Attendance
5. Leave Requests

---

# Entity 1: Users

Purpose:
Stores login credentials and user roles.

| Attribute | Data Type    | Key         |
| --------- | ------------ | ----------- |
| user_id   | INT          | Primary Key |
| username  | VARCHAR(50)  | Unique      |
| password  | VARCHAR(255) |             |
| role      | VARCHAR(20)  |             |
| status    | VARCHAR(20)  |             |

---

# Entity 2: Employees

Purpose:
Stores employee personal information.

| Attribute     | Data Type    | Key         |
| ------------- | ------------ | ----------- |
| employee_id   | INT          | Primary Key |
| first_name    | VARCHAR(50)  |             |
| last_name     | VARCHAR(50)  |             |
| email         | VARCHAR(100) | Unique      |
| phone         | VARCHAR(20)  |             |
| department_id | INT          | Foreign Key |
| joining_date  | DATE         |             |

---

# Entity 3: Departments

Purpose:
Stores department information.

| Attribute       | Data Type    | Key         |
| --------------- | ------------ | ----------- |
| department_id   | INT          | Primary Key |
| department_name | VARCHAR(100) |             |

---

# Entity 4: Attendance

Purpose:
Stores employee attendance records.

| Attribute       | Data Type   | Key         |
| --------------- | ----------- | ----------- |
| attendance_id   | INT         | Primary Key |
| employee_id     | INT         | Foreign Key |
| attendance_date | DATE        |             |
| check_in        | TIME        |             |
| check_out       | TIME        |             |
| status          | VARCHAR(20) |             |

---

# Entity 5: Leave Requests

Purpose:
Stores leave application information.

| Attribute       | Data Type   | Key         |
| --------------- | ----------- | ----------- |
| leave_id        | INT         | Primary Key |
| employee_id     | INT         | Foreign Key |
| leave_type      | VARCHAR(30) |             |
| start_date      | DATE        |             |
| end_date        | DATE        |             |
| reason          | TEXT        |             |
| approval_status | VARCHAR(20) |             |

---

# Relationships

## Users → Employees

Relationship:

One User account belongs to one Employee.

Cardinality:

1 : 1

---

## Department → Employees

Relationship:

One Department contains many Employees.

Cardinality:

1 : N

---

## Employee → Attendance

Relationship:

One Employee has many Attendance Records.

Cardinality:

1 : N

---

## Employee → Leave Requests

Relationship:

One Employee can submit multiple Leave Requests.

Cardinality:

1 : N

---

# ERD (Text Representation)

```text
Departments
--------------
department_id (PK)
department_name
        |
        | 1
        |
        | N
Employees
--------------
employee_id (PK)
department_id (FK)
name
email
phone
        |
        |1
        |
        |N
Attendance
--------------
attendance_id (PK)
employee_id (FK)
date
check_in
check_out
status

Employees
        |
        |1
        |
        |N
Leave Requests
--------------
leave_id (PK)
employee_id (FK)
leave_type
start_date
end_date
status

Users
--------------
user_id (PK)
username
password
role
status
```

---

# Data Integrity Rules

* Every Employee must belong to one Department.
* Attendance cannot exist without an Employee.
* Leave Requests must reference an Employee.
* Usernames must be unique.
* Primary keys must be unique.
* Foreign keys must maintain referential integrity.

---

# Advantages of ERD

* Reduces data redundancy.
* Improves database consistency.
* Simplifies relationship management.
* Supports future scalability.
* Makes implementation easier.

---

# Conclusion

The Entity Relationship Diagram provides a structured database design for the Employee Leave & Attendance Management System. It clearly defines entities, relationships, and constraints, ensuring efficient data storage and retrieval.
