CREATE TABLE departments(
department_id INT PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(100)
);

CREATE TABLE employees(
employee_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50),
last_name VARCHAR(50),
email VARCHAR(100),
phone VARCHAR(20),
department_id INT
);

CREATE TABLE attendance(
attendance_id INT PRIMARY KEY AUTO_INCREMENT,
employee_id INT,
attendance_date DATE,
check_in TIME,
check_out TIME,
status VARCHAR(20)
);

CREATE TABLE leave_requests(
leave_id INT PRIMARY KEY AUTO_INCREMENT,
employee_id INT,
leave_type VARCHAR(30),
start_date DATE,
end_date DATE,
reason TEXT,
approval_status VARCHAR(20)
);
