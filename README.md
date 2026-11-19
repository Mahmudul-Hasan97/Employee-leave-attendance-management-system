# Employee Leave & Attendance Management System

## Overview

Employee Leave & Attendance Management System is a modern web-based application developed to automate attendance tracking and leave management. The system reduces manual paperwork and provides an efficient workflow for employees, HR managers, and administrators.

---

## Features

- **User Authentication:** Secure login for employees and admins.
- **Employee Management:** Add, update, and manage employee profiles.
- **Attendance Tracking:** Keep daily records of employee attendance.
- **Leave Management:** Apply for leaves and track leave balances.
- **Leave Approval:** Admin workflow to approve or reject leave requests.
- **Dashboard:** Interactive UI to view attendance and leave summaries.
- **Role-Based Access Control:** Distinct views and permissions for Admins and Employees.

---

## Technologies Used

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5, CSS3 & Bootstrap
- Axios (for API requests)

### Backend
- Python
- FastAPI
- Uvicorn (ASGI server)

### Database
- SQLite

### Version Control
- Git & GitHub

---

## Run the application locally

### 1. Start the backend

In PowerShell, run these commands from the repository root:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements-dev.txt
python seed.py
python -m uvicorn app.main:app --reload
```

The API is available at `http://127.0.0.1:8000`; interactive API documentation is at `http://127.0.0.1:8000/docs`. The SQLite database is stored in `backend/employee_system_v2.db`.

The local demo accounts are `admin@gmail.com` / `admin123` and `employee@gmail.com` / `employee123`. Change these credentials and set a strong `SECRET_KEY` before deploying. Production mode refuses to start with the development-only signing key.

Run backend tests from `backend` with:

```powershell
python -m pytest
```

### 2. Start the frontend

Install Node.js `20.19+` or `22.13+`, then run these commands in a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

---

## Folder Structure

```text
employee-leave-attendance-management-system/
│
├── backend/                # FastAPI Backend System
│   ├── app/                # Main application package
│   ├── seed.py             # Database seed script
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # React Frontend Application
│   ├── src/                # React components and API services
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
│
├── docs/                   # Documentation files
├── README.md               # Project documentation
├── LICENSE                 # License information
└── .gitignore              # Git ignore rules

Modules
Authentication

Attendance

Leave Management

Employee Management

Reports

Future Scope
Mobile App

Face Recognition Attendance

Payroll System

Email Notifications

Author
Mahmudul Hasan

License
MIT License

Resubmission Update
Updated frontend base setup documentation for Issue #21.

Backend Resubmission Update
Updated backend base setup documentation for Issue #23.