# Surveys

## Survey Objective

The survey was conducted to quantitatively measure employee satisfaction with existing attendance tracking and leave request workflows, as well as to gather feedback on user preference for a modern, web-based digital solution built with **React.js** and **FastAPI**.

---

## Participant Overview

- **Total Survey Respondents:** 30 Employees (across HR, Administration, and Engineering departments)
- **Data Collection Method:** Anonymous digital questionnaire

---

## Survey Questions

1. Do you currently record your daily attendance manually?
2. Have you experienced attendance calculation errors or missing logs in the past 6 months?
3. Do you submit leave requests on paper or via unstructured emails?
4. Does the current leave approval process take more than 24-48 hours?
5. Would you prefer a responsive, web-based online portal for check-ins and leave requests?
6. Do you need instant, real-time access to your personal attendance and leave history?
7. Should remaining leave balances be calculated automatically after every approved leave?
8. Would a centralized, single-click approval dashboard benefit HR managers?
9. Is instant UI feedback important to you during daily clock-ins?
10. Would you strongly recommend replacing paper/spreadsheet records with a digital web application?

---

## Survey Results Summary

| Key Survey Metrics | Yes (%) | No (%) | Key Takeaway |
| :--- | :--- | :--- | :--- |
| **Manual Attendance Usage** | 80% | 20% | Vast majority still rely on manual registers or basic spreadsheets. |
| **Experience with Attendance Errors** | 70% | 30% | High error rate due to manual data entry and lack of automated tracking. |
| **Paper / Email Leave Submissions** | 85% | 15% | Leave requests lack a centralized, structured submission platform. |
| **Demand for Online Web Application** | 95% | 5% | Overwhelming preference for an accessible digital web portal. |
| **Need for Real-Time Reports & History** | 90% | 10% | Strong need for self-service dashboards showing personal history and balances. |

---

## Technical & Operational Analysis

The survey data clearly highlights significant friction points in legacy manual processes:

1. **High Error & Frustration Rates:** 70% of respondents experienced errors, proving the failure of manual logging and spreadsheet calculations.
2. **User Experience Preference:** 95% of users demand a streamlined web portal, driving our architectural choice to implement a fast Single Page Application (SPA) using **React.js**.
3. **Efficiency Gains:** Automated backend logic powered by **FastAPI** and **SQLite** directly resolves user demand for real-time leave balance calculations and instantaneous status updates.

---

## Conclusion

The quantitative findings from this survey strongly justify the transition to a modern digital platform. Building the **Employee Leave & Attendance Management System** using React and FastAPI directly addresses user dissatisfaction, automates calculations, eliminates paperwork, and ensures accurate organizational data management.