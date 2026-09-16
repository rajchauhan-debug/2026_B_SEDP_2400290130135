# Software Requirements Specification (SRS)

## CampusCareer – Student Placement & Internship Management System

**Version:** 1.0  
**Project Type:** Web-Based Application  
**Domain:** Student Placement and Internship Management

---

# 1. Introduction

## 1.1 Purpose

The purpose of this Software Requirements Specification (SRS) is to define the functional and non-functional requirements of CampusCareer – Student Placement & Internship Management System.

CampusCareer is a web-based system that provides a centralized platform for students to view placement and internship opportunities, apply for suitable opportunities, and track their application status.

The system also provides administrative functionality for managing opportunities and viewing student applications.

---

## 1.2 Document Conventions

The following conventions are used in this document:

- **FR** – Functional Requirement
- **NFR** – Non-Functional Requirement
- **US** – User Story
- **Student** – Student using the system
- **Admin** – Placement administrator managing opportunities
- Requirements are identified using unique IDs.
- **High** priority requirements are essential for the basic operation of the system.
- **Medium** priority requirements support the main functionality.

---

## 1.3 Intended Audience and Reading Suggestions

This document is intended for:

- Project members
- Developers
- Testers
- Project manager
- Faculty/project evaluator
- Future maintainers

Readers should first understand the Introduction and Overall Description, followed by System Features and Non-Functional Requirements.

---

## 1.4 Product Scope

CampusCareer provides a centralized platform for managing student placement and internship opportunities.

### In Scope

- Student registration and login
- Student profile management
- Viewing placement and internship opportunities
- Applying for opportunities
- Tracking application status
- Admin login
- Adding opportunities
- Deleting opportunities
- Viewing student applications

### Out of Scope

- Online payment
- AI-based job recommendation
- Resume generation
- Online interviews
- Company payroll management
- Complex analytics
- External job portal integration

---

## 1.5 References

The following references are used for preparing this SRS:

1. Software Engineering course material
2. Experiment 2 – Problem Identification and Feasibility
3. Experiment 3 – Requirement Elicitation
4. Project requirement and scope defined for CampusCareer

---

# 2. Overall Description

## 2.1 Product Perspective

CampusCareer is a standalone web-based application designed to centralize placement and internship related activities.

The system consists of:

- Frontend interface for students and administrators
- Backend REST API
- Database for storing users, opportunities and applications

The system follows a client-server architecture.

---

## 2.2 Product Functions

The major functions of CampusCareer are:

### Student Functions

- Register an account
- Login to the system
- View and manage profile
- View available opportunities
- Apply for an opportunity
- View submitted applications
- Track application status

### Admin Functions

- Login to the system
- Add placement/internship opportunities
- Delete opportunities
- View student applications
- Update application status

---

## 2.3 User Classes and Characteristics

| User Class | Description |
|---|---|
| Student | Views opportunities, applies for them and tracks applications |
| Placement Administrator | Manages opportunities and student applications |
| System Administrator | Maintains the application and database |

Students are expected to have basic knowledge of using a web browser.

Administrators should have basic knowledge of managing placement and internship information.

---

## 2.4 Operating Environment

CampusCareer will operate in a standard web environment.

### Client Environment

- Modern web browser
- Windows/Linux/macOS
- Internet connection

### Server Environment

- Node.js runtime
- Express.js backend
- MongoDB database

### Development Environment

- Visual Studio Code
- Git
- GitHub
- Postman

---

## 2.5 Design and Implementation Constraints

The following constraints apply to the project:

- The frontend will use HTML, CSS and JavaScript.
- The backend will use Node.js and Express.js.
- MongoDB will be used for data storage.
- The system will follow a REST API based approach.
- The project should remain simple and suitable for academic demonstration.
- Authentication will be required for protected student and admin functions.

---

## 2.6 User Documentation

Basic instructions will be provided for:

- Student registration and login
- Viewing opportunities
- Applying for an opportunity
- Tracking application status
- Admin management of opportunities and applications

---

## 2.7 Assumptions and Dependencies

### Assumptions

- Students have valid registration details.
- Administrators enter correct opportunity information.
- Users have access to a modern web browser.
- Internet/network connectivity is available when the application is being used.

### Dependencies

- Node.js
- Express.js
- MongoDB
- Web browser
- Internet/network connectivity

---

# 3. External Interface Requirements

## 3.1 User Interfaces

The application will provide simple web pages for:

### Student

- Registration page
- Login page
- Student dashboard
- Profile page
- Opportunities page
- Application status page

### Admin

- Admin login
- Admin dashboard
- Opportunity management page
- Application management page

The interface should be simple, clear and easy to navigate.

---

## 3.2 Hardware Interfaces

No specialized hardware is required.

The system can be accessed using:

- Desktop computer
- Laptop
- Other standard devices capable of running a web browser

---

## 3.3 Software Interfaces

The system will interact with:

- Web browser
- Node.js
- Express.js
- MongoDB

The frontend communicates with the backend through REST API requests.

---

## 3.4 Communications Interfaces

The frontend and backend will communicate using HTTP/HTTPS requests.

REST API endpoints will be used for operations such as:

- User registration
- Login
- Fetching opportunities
- Applying for opportunities
- Fetching applications
- Admin operations

---

# 4. System Features

## 4.1 Student Registration and Login

### Description

Students should be able to create an account and securely log in to the system.

### Functional Requirements

**FR-01:** The system shall allow a student to register using required personal information.

**FR-02:** The system shall validate required registration information.

**FR-03:** The system shall allow registered students to log in.

**FR-04:** The system shall reject invalid login credentials.

**FR-05:** The system shall provide access to student features only after successful login.

---

## 4.2 Student Profile

### Description

Students should be able to view and manage their basic profile information.

### Functional Requirements

**FR-06:** The system shall display the student's profile information.

**FR-07:** The system shall allow the student to update permitted profile information.

---

## 4.3 View Placement and Internship Opportunities

### Description

Students should be able to view available placement and internship opportunities.

### Functional Requirements

**FR-08:** The system shall display available opportunities.

**FR-09:** The system shall display relevant information such as title, company, type and description.

**FR-10:** The system shall allow students to view the details of an opportunity.

---

## 4.4 Apply for Opportunity

### Description

Students should be able to apply for suitable placement or internship opportunities.

### Functional Requirements

**FR-11:** The system shall allow a logged-in student to apply for an available opportunity.

**FR-12:** The system shall record the student's application.

**FR-13:** The system shall prevent duplicate applications for the same opportunity.

**FR-14:** The system shall display a confirmation after successful application.

---

## 4.5 Track Application Status

### Description

Students should be able to view the status of their submitted applications.

### Functional Requirements

**FR-15:** The system shall display applications submitted by the student.

**FR-16:** The system shall display the current status of each application.

**FR-17:** The system shall allow students to identify whether an application is pending, selected or rejected.

---

## 4.6 Admin Opportunity Management

### Description

The administrator should be able to manage placement and internship opportunities.

### Functional Requirements

**FR-18:** The system shall allow an authorized administrator to add an opportunity.

**FR-19:** The system shall allow an authorized administrator to delete an opportunity.

**FR-20:** The system shall display managed opportunities to the administrator.

---

## 4.7 Admin Application Management

### Description

The administrator should be able to view and manage student applications.

### Functional Requirements

**FR-21:** The system shall allow an authorized administrator to view student applications.

**FR-22:** The system shall display application details.

**FR-23:** The system shall allow the administrator to update the application status.

---

# 5. Other Non-Functional Requirements

## 5.1 Performance Requirements

**NFR-01:** The system should provide normal user operations within a reasonable response time under normal usage.

**NFR-02:** Database operations should complete without unnecessary delay.

**NFR-03:** The system should support multiple student records and applications.

---

## 5.2 Safety Requirements

**NFR-04:** The system shall prevent unauthorized users from accessing protected student and administrator functions.

**NFR-05:** The system shall validate user input before processing it.

---

## 5.3 Security Requirements

**NFR-06:** User authentication shall be required for protected operations.

**NFR-07:** Administrator functions shall be accessible only to authorized administrators.

**NFR-08:** Passwords shall not be stored in plain text.

**NFR-09:** User input shall be validated before being stored or processed.

**NFR-10:** The system shall prevent unauthorized access to application information.

---

## 5.4 Software Quality Attributes

### Usability

The interface should be simple and understandable for students and administrators.

### Reliability

The system should correctly store and retrieve user, opportunity and application information.

### Maintainability

The system should be organized into separate frontend, backend and database components to simplify maintenance.

### Testability

The system requirements should allow functional testing of individual features.

### Portability

The application should be usable on common operating systems through a modern web browser.

---

## 5.5 Business Rules

**BR-01:** Only registered students can apply for opportunities.

**BR-02:** A student cannot apply more than once for the same opportunity.

**BR-03:** Only authorized administrators can add or delete opportunities.

**BR-04:** Only authorized administrators can update application status.

**BR-05:** Students can view the status of their own applications.

---

# 6. Other Requirements

## 6.1 Database Requirements

The system shall maintain data for:

- Students
- Administrators
- Opportunities
- Applications

MongoDB will be used as the database management system.

---

# Appendix A: Glossary

| Term | Meaning |
|---|---|
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| UI | User Interface |
| Student | User who searches and applies for opportunities |
| Admin | Authorized user who manages opportunities and applications |
| Opportunity | Placement or internship opportunity |
| Application | Student's request to participate in an opportunity |

---

# Appendix B: Analysis Models

The following models may be added during the system design phase:

- Use Case Diagram
- Data Flow Diagram
- Class Diagram
- Entity Relationship Diagram
- Activity Diagram

---

# Appendix C: To Be Determined List

At the current stage, no major requirements are pending.

Future implementation details may be refined during the design and development phases.