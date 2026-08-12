API Design SpecificationProject NameEmployee Leave & Attendance Management System1. IntroductionThe API Design document defines the RESTful application programming interfaces (APIs) built with Python FastAPI to serve the React.js Single Page Application (SPA) frontend. All endpoints exchange data using JSON payloads, utilize standard HTTP methods, leverage Pydantic schema models for data validation, and interface with an SQLite database via SQLAlchemy ORM.2. Base URL & ProtocolPlaintext[http://127.0.0.1:8000/api/v1](http://127.0.0.1:8000/api/v1)
Protocol: HTTP / HTTPSContent-Type Header: application/jsonASGI Server: Uvicorn3. Authentication & Session APIs3.1 User LoginAuthenticates user credentials and initializes session identity.Method: POSTEndpoint: /api/v1/auth/loginRequest Body:JSON{
  "email": "employee@company.com",
  "password": "SecurePassword123!"
}
Response (200 OK):JSON{
  "status": "success",
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "name": "Mahmudul Hasan",
    "email": "employee@company.com",
    "role": "employee",
    "department_id": 2
  }
}
3.2 User LogoutTerminates the active user session.Method: POSTEndpoint: /api/v1/auth/logoutResponse (200 OK):JSON{
  "status": "success",
  "message": "Successfully logged out"
}
4. User & Employee Management APIs (Admin/HR)4.1 Get All EmployeesRetrieves a list of all registered employees.Method: GETEndpoint: /api/v1/usersResponse (200 OK):JSON[
  {
    "user_id": 1,
    "name": "Mahmudul Hasan",
    "email": "mahmudul@company.com",
    "role": "employee",
    "department_id": 1,
    "leave_balance": 20,
    "created_at": "2026-06-01T10:00:00"
  }
]
4.2 Create New EmployeeRegisters a new user account with a hashed password.Method: POSTEndpoint: /api/v1/usersRequest Body:JSON{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "password": "Password123!",
  "role": "employee",
  "department_id": 2
}
Response (201 Created):JSON{
  "message": "User created successfully",
  "user_id": 2
}
4.3 Update Employee ProfileUpdates an existing user's details.Method: PUTEndpoint: /api/v1/users/{user_id}Request Body:JSON{
  "name": "Jane Doe Updated",
  "role": "hr",
  "department_id": 2
}
Response (200 OK):JSON{
  "message": "User updated successfully"
}
4.4 Delete / Deactivate EmployeeRemoves a user account from the SQLite database.Method: DELETEEndpoint: /api/v1/users/{user_id}Response (200 OK):JSON{
  "message": "User deleted successfully"
}
5. Attendance APIs5.1 Clock-In TimestampRecords an employee's daily check-in time.Method: POSTEndpoint: /api/v1/attendance/clock-inRequest Body:JSON{
  "user_id": 1
}
Response (201 Created):JSON{
  "message": "Clock-in recorded successfully",
  "attendance_id": 101,
  "date": "2026-06-15",
  "check_in": "09:00:15",
  "status": "Present"
}
5.2 Clock-Out TimestampUpdates today's check-in log with a clock-out timestamp.Method: POSTEndpoint: /api/v1/attendance/clock-outRequest Body:JSON{
  "user_id": 1
}
Response (200 OK):JSON{
  "message": "Clock-out recorded successfully",
  "check_out": "17:01:45"
}
5.3 Get User Attendance LogsRetrieves historical attendance records for a specific employee.Method: GETEndpoint: /api/v1/attendance/user/{user_id}Response (200 OK):JSON[
  {
    "attendance_id": 101,
    "date": "2026-06-15",
    "check_in": "09:00:15",
    "check_out": "17:01:45",
    "status": "Present"
  }
]
6. Leave Management APIs6.1 Submit Leave RequestSubmits a new digital leave application.Method: POSTEndpoint: /api/v1/leavesRequest Body:JSON{
  "user_id": 1,
  "leave_type": "Casual",
  "start_date": "2026-07-01",
  "end_date": "2026-07-03",
  "reason": "Family obligation"
}
Response (201 Created):JSON{
  "message": "Leave request submitted successfully",
  "leave_id": 55,
  "status": "pending"
}
6.2 Get Pending Leave Requests (HR/Admin)Retrieves all leave applications awaiting administrative review.Method: GETEndpoint: /api/v1/leaves/pendingResponse (200 OK):JSON[
  {
    "leave_id": 55,
    "user_id": 1,
    "employee_name": "Mahmudul Hasan",
    "leave_type": "Casual",
    "start_date": "2026-07-01",
    "end_date": "2026-07-03",
    "reason": "Family obligation",
    "status": "pending"
  }
]
6.3 Review Leave Status (Approve / Reject)Updates a leave request status and automatically deducts leave balance upon approval.Method: PUTEndpoint: /api/v1/leaves/{leave_id}/statusRequest Body:JSON{
  "status": "approved"
}
Response (200 OK):JSON{
  "message": "Leave request approved successfully",
  "updated_leave_balance": 17
}
7. Analytics & Reporting APIs7.1 System Summary StatisticsProvides aggregated dashboard metrics for administrative viewports.Method: GETEndpoint: /api/v1/reports/summaryResponse (200 OK):JSON{
  "total_employees": 45,
  "present_today": 38,
  "pending_leaves": 4,
  "on_leave_today": 3
}
8. HTTP Status CodesFastAPI utilizes standard HTTP status codes:CodeStatusTrigger Condition200OKRequest successfully processed201CreatedResource successfully created (e.g., clock-in, leave created)400Bad RequestBusiness rule violation (e.g., duplicate clock-in today, insufficient leave balance)401UnauthorizedMissing authentication or invalid credentials403ForbiddenUser role permissions insufficient for action404Not FoundSpecified entity ID missing from SQLite database422Unprocessable EntityPydantic JSON validation failure500Internal Server ErrorUnexpected backend server exception9. Error Response FormatFastAPI formats error responses using a standardized JSON payload structure:JSON{
  "detail": "Clock-in record already exists for today."
}
10. Summary Table of Endpoint RoutesModuleHTTP MethodEndpoint PathAccess LevelAuthPOST/api/v1/auth/loginPublicAuthPOST/api/v1/auth/logoutAuthenticatedUsersGET/api/v1/usersAdmin / HRUsersPOST/api/v1/usersAdminAttendancePOST/api/v1/attendance/clock-inEmployeeAttendancePOST/api/v1/attendance/clock-outEmployeeLeavesPOST/api/v1/leavesEmployeeLeavesGET/api/v1/leaves/pendingHR / AdminLeavesPUT/api/v1/leaves/{leave_id}/statusHR / AdminReportsGET/api/v1/reports/summaryHR / AdminConclusionThis API Design document provides a clear RESTful specification for integrating the React.js frontend with the FastAPI backend. Through typed Pydantic schemas, explicit HTTP status codes, and JSON payloads, the API guarantees smooth, predictable communication for managing employee attendance and leave workflows.