# Entity Relationship Diagram (ERD)

## Project Name
Employee Leave & Attendance Management System

---

# Introduction

The Entity Relationship Diagram (ERD) illustrates the logical database structure and schema design for the **Employee Leave & Attendance Management System**. It specifies the relational database entities, their physical data attributes, primary keys, foreign keys, constraints, and cardinalities implemented in the **SQLite** relational engine via **SQLAlchemy ORM (Python FastAPI)**.

---

# Design Objectives

The database schema is engineered to:
- **Normalize Data:** Eliminate data redundancy through 3NF relational modeling.
- **Ensure Referential Integrity:** Enforce foreign key relationships across users, attendance records, and leave requests.
- **Optimize Performance:** Enable fast REST API query execution times for FastAPI backend services.
- **Support Authentication:** Securely store hashed user credentials and role definitions.

---

# Core Database Entities & Schema Definition

### Entity 1: `departments`
Stores organizational department units.

| Attribute | SQLite Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `department_id` | `INTEGER` | **Primary Key** (Auto-Increment) | Unique identifier for each department |
| `department_name` | `TEXT` | `NOT NULL`, `UNIQUE` | Name of the department (*e.g., HR, Engineering*) |

---

### Entity 2: `users`
Stores unified employee profiles, administrative credentials, and role assignments.

| Attribute | SQLite Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | `INTEGER` | **Primary Key** (Auto-Increment) | Unique identifier for each system user |
| `name` | `TEXT` | `NOT NULL` | Full name of the user |
| `email` | `TEXT` | `NOT NULL`, `UNIQUE` | Corporate email used for login |
| `password_hash` | `TEXT` | `NOT NULL` | Bcrypt-hashed password string |
| `role` | `TEXT` | `NOT NULL`, `DEFAULT 'employee'` | System access role (*admin, hr, employee*) |
| `department_id` | `INTEGER` | **Foreign Key** (`departments.department_id`) | Department assignment |
| `leave_balance` | `INTEGER` | `NOT NULL`, `DEFAULT 20` | Remaining annual leave allowance |
| `created_at` | `TEXT` | `NOT NULL` | ISO timestamp of user creation |

---

### Entity 3: `attendance`
Stores daily clock-in and check-out logs recorded by employees.

| Attribute | SQLite Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `attendance_id` | `INTEGER` | **Primary Key** (Auto-Increment) | Unique attendance log identifier |
| `user_id` | `INTEGER` | **Foreign Key** (`users.user_id`) | Associated employee reference |
| `date` | `TEXT` | `NOT NULL` | Date of attendance log (`YYYY-MM-DD`) |
| `check_in` | `TEXT` | `NOT NULL` | Timestamp of check-in (`HH:MM:SS`) |
| `check_out` | `TEXT` | `NULLABLE` | Timestamp of check-out (`HH:MM:SS`) |
| `status` | `TEXT` | `NOT NULL`, `DEFAULT 'Present'` | Attendance state (*Present, Late, Half-Day*) |

---

### Entity 4: `leaves`
Stores leave applications and HR review statuses.

| Attribute | SQLite Data Type | Key / Constraint | Description |
| :--- | :--- | :--- | :--- |
| `leave_id` | `INTEGER` | **Primary Key** (Auto-Increment) | Unique leave request identifier |
| `user_id` | `INTEGER` | **Foreign Key** (`users.user_id`) | Requesting employee reference |
| `leave_type` | `TEXT` | `NOT NULL` | Classification (*Casual, Medical, Annual*) |
| `start_date` | `TEXT` | `NOT NULL` | Leave start date (`YYYY-MM-DD`) |
| `end_date` | `TEXT` | `NOT NULL` | Leave end date (`YYYY-MM-DD`) |
| `reason` | `TEXT` | `NOT NULL` | Detailed justification for request |
| `status` | `TEXT` | `NOT NULL`, `DEFAULT 'pending'` | Current review state (*pending, approved, rejected*) |
| `applied_at` | `TEXT` | `NOT NULL` | ISO timestamp of application submission |

---

# Entity Relationships & Cardinalities

```text
┌───────────────────────────┐
│        departments        │
├───────────────────────────┤
│ PK  department_id         │
│     department_name       │
└─────────────┬─────────────┘
              │ 1
              │
              │ N
┌─────────────┴─────────────┐
│           users           │
├───────────────────────────┤
│ PK  user_id               │
│ FK  department_id         │
│     name                  │
│     email                 │
│     password_hash         │
│     role                  │
│     leave_balance         │
└──────┬─────────────┬──────┘
       │ 1           │ 1
       │             │
       │ N           │ N
┌──────┴──────┐┌─────┴──────┐
│ attendance  ││   leaves   │
├─────────────┤├────────────┤
│ PK att_id   ││ PK leave_id│
│ FK user_id  ││ FK user_id │
│    date     ││    type    │
│    check_in ││    status  │
└─────────────┘└────────────┘
Relationship Breakdown
departments → users (1 : N)

One department contains multiple employees (users).

Each user belongs to exactly one department.

users → attendance (1 : N)

One employee (users) generates multiple daily attendance logs over time.

Each attendance record belongs strictly to one employee.

users → leaves (1 : N)

One employee (users) can submit multiple leave requests throughout the year.

Each leave request belongs strictly to one employee.

Data Integrity Rules & Constraints
Foreign Key Constraints: Enabled in SQLite via PRAGMA foreign_keys = ON; in FastAPI connection startup.

Unique Constraints: The email field in users and department_name in departments must be strictly unique.

Cascade Deletes: Deleting a user profile handles orphan records predictably across attendance and leaves tables via SQLAlchemy ORM relationship configuration.

Default Statuses: New leave applications default to 'pending', and new user roles default to 'employee'.

Conclusion
This Entity Relationship Diagram provides a structured relational blueprint for the Employee Leave & Attendance Management System. By translating these specifications into SQLAlchemy ORM models, the backend seamlessly maintains data consistency and ACID transaction safety within the SQLite database.