# Database Design

## Project Name
Employee Leave & Attendance Management System

---

# 1. Introduction

The Database Design document details the architectural structure, schema definitions, relational constraints, indexing strategies, and normalization principles applied in the **Employee Leave & Attendance Management System**. It serves as a comprehensive technical guide for managing data persistence in the **SQLite** relational engine via the **SQLAlchemy ORM (Python FastAPI)** layer.

---

# 2. Database Management System (DBMS) Specifications

| Item | Specification | Description |
| :--- | :--- | :--- |
| **Database Engine** | **SQLite3** | Embedded, serverless, file-based relational engine |
| **ORM Framework** | **SQLAlchemy** | Python object-relational mapping abstraction |
| **Storage Mode** | Single File (`app.db`) | Localized ACID-compliant file storage |
| **Character Set** | UTF-8 | Full international character encoding support |
| **Primary Keys** | `INTEGER AUTOINCREMENT` | Auto-incrementing unique integer identifiers |
| **Foreign Keys** | Enabled (`PRAGMA foreign_keys = ON;`) | Enforces referential integrity on connection startup |
| **Transaction Safety** | Full ACID Compliance | Guarantees atomic database operations |

---

# 3. Database Schema Overview

The relational structure consists of four core normalized tables:

1. **`departments`** — Stores organizational department units.
2. **`users`** — Stores user profiles, authentication hashes, roles, and department references.
3. **`attendance`** — Stores daily employee check-in/out timestamps and attendance states.
4. **`leaves`** — Stores leave applications, review statuses, and submission metadata.

---

# 4. Detailed Table Schemas

### 4.1 `departments` Table
Purpose: Stores department taxonomy.

| Field Name | SQLite Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `department_id` | `INTEGER` | **Primary Key**, Auto-Increment | Unique identifier |
| `department_name` | `TEXT` | `NOT NULL`, `UNIQUE` | Department name (*e.g., HR, Tech*) |

---

### 4.2 `users` Table
Purpose: Stores user identities, authentication credentials, and employee profiles.

| Field Name | SQLite Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | `INTEGER` | **Primary Key**, Auto-Increment | Unique user identifier |
| `name` | `TEXT` | `NOT NULL` | Employee full name |
| `email` | `TEXT` | `NOT NULL`, `UNIQUE`, Indexed | Corporate email address (login ID) |
| `password_hash` | `TEXT` | `NOT NULL` | Bcrypt-encrypted password string |
| `role` | `TEXT` | `NOT NULL`, Default `'employee'` | RBAC role (*admin, hr, employee*) |
| `department_id` | `INTEGER` | **Foreign Key** (`departments.department_id`) | Department association |
| `leave_balance` | `INTEGER` | `NOT NULL`, Default `20` | Annual leave allowance balance |
| `created_at` | `TEXT` | `NOT NULL` | Timestamp of profile registration |

---

### 4.3 `attendance` Table
Purpose: Stores daily attendance records and check-in/out timestamps.

| Field Name | SQLite Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `attendance_id` | `INTEGER` | **Primary Key**, Auto-Increment | Unique attendance record ID |
| `user_id` | `INTEGER` | **Foreign Key** (`users.user_id`), `NOT NULL` | Reference to employee |
| `date` | `TEXT` | `NOT NULL` | Date of log (`YYYY-MM-DD`) |
| `check_in` | `TEXT` | `NOT NULL` | Timestamp of check-in (`HH:MM:SS`) |
| `check_out` | `TEXT` | `NULLABLE` | Timestamp of check-out (`HH:MM:SS`) |
| `status` | `TEXT` | `NOT NULL`, Default `'Present'` | Attendance state (*Present, Late, Half-Day*) |

---

### 4.4 `leaves` Table
Purpose: Stores leave requests and approval workflows.

| Field Name | SQLite Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `leave_id` | `INTEGER` | **Primary Key**, Auto-Increment | Unique leave application ID |
| `user_id` | `INTEGER` | **Foreign Key** (`users.user_id`), `NOT NULL` | Reference to applicant |
| `leave_type` | `TEXT` | `NOT NULL` | Type (*Casual, Medical, Annual*) |
| `start_date` | `TEXT` | `NOT NULL` | Start date (`YYYY-MM-DD`) |
| `end_date` | `TEXT` | `NOT NULL` | End date (`YYYY-MM-DD`) |
| `reason` | `TEXT` | `NOT NULL` | Reason for leave request |
| `status` | `TEXT` | `NOT NULL`, Default `'pending'` | Review state (*pending, approved, rejected*) |
| `applied_at` | `TEXT` | `NOT NULL` | Application submission timestamp |

---

# 5. Entity Relationships & Cardinality

- **`departments` → `users` (1 : N):** One department can have multiple employees assigned to it.
- **`users` → `attendance` (1 : N):** One user generates multiple attendance records over time.
- **`users` → `leaves` (1 : N):** One user can submit multiple leave applications over time.

---

# 6. Database Normalization (3NF)

The database schema is fully normalized to **Third Normal Form (3NF)**:
- **First Normal Form (1NF):** Every cell contains atomic (indivisible) values. No repeating groups.
- **Second Normal Form (2NF):** All non-key attributes are fully functionally dependent on the primary key.
- **Third Normal Form (3NF):** No transitive dependencies exist; non-key fields depend only on primary keys.

---

# 7. Data Integrity & Constraints

- **Entity Integrity:** All tables enforce primary keys to ensure unique row identification.
- **Referential Integrity:** Foreign key checks maintain explicit relations between tables (`users.department_id` and `attendance.user_id` / `leaves.user_id`).
- **Domain Integrity:** Strict datatype validations are enforced by Pydantic models before data reaches the SQLite engine.
- **User Uniqueness:** Email uniqueness guarantees that duplicate accounts cannot be provisioned.

---

# 8. Security & Backup Strategy

- **Data Encryption:** Passwords are never stored in plaintext; Passlib/Bcrypt handles hash generation.
- **SQL Injection Prevention:** SQLAlchemy ORM executes all statements using parameterized bindings.
- **Backup Strategy:** 
  - **Automated Snapshots:** Periodic file copies of `app.db` serve as simple, reliable point-in-time backups.
  - **Zero-Downtime Copies:** SQLite backup APIs enable live database file copying without taking the service offline.

---

# Conclusion

The database design provides a structured, ACID-compliant relational foundation for the **Employee Leave & Attendance Management System**. By leveraging **SQLite** managed via **SQLAlchemy ORM**, the system achieves optimal performance, integrity, and security for workplace management workflows.