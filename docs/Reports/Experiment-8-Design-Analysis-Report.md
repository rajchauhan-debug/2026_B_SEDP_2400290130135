# Experiment 8: Design Analysis Report

**Course:** CS311P — Software Engineering and Design Principles Lab  
**Project:** CampusCareer — Student Placement & Internship Management System  
**Experiment:** 8 — Software Design Principles  
**Team Members:** Ram Kumar Verma, Harshdeep  
**Technology Stack:** HTML, CSS, JavaScript, Node.js, Express.js, MongoDB

---

## 1. Aim

To analyze and apply fundamental software design principles to the CampusCareer project, including modularization, coupling and cohesion, function-oriented versus object-oriented design, and top-down versus bottom-up design.

## 2. Objectives

1. Divide CampusCareer into manageable and independent modules.
2. Identify how coupling and cohesion affect maintainability.
3. Compare function-oriented and object-oriented design approaches.
4. Compare top-down and bottom-up design approaches.
5. select a practical design approach for a small web-based placement and internship management system.

## 3. Project Overview

CampusCareer is a web-based application intended to provide a centralized platform for students to view placement and internship opportunities, apply for suitable opportunities, and track application status. An authorized administrator can add or delete opportunities, view student applications, and update application status.

The planned system uses:
- **Frontend:** HTML, CSS and JavaScript
- **Backend:** Node.js with Express.js REST APIs
- **Database:** MongoDB
- **Version control:** Git and GitHub

The project is intentionally kept small and suitable for an academic demonstration. Features such as payments, AI-based recommendations, resume generation, and external job-portal integration are outside the project scope.

## 4. Modularization

### 4.1 Meaning

Modularization is the process of dividing a software system into smaller, manageable parts called modules. Each module is responsible for a clearly defined set of related tasks.

Good modularization makes a system easier to understand, test, debug, maintain and extend.

### 4.2 Proposed Modules in CampusCareer

| Module | Main responsibilities |
|---|---|
| Authentication Module | Student/admin login, registration and access checks |
| Student Profile Module | Display and update permitted student profile information |
| Opportunity Module | Display opportunity details; allow authorized admins to add or delete opportunities |
| Application Module | Submit an application, prevent duplicate applications and store the application |
| Application Tracking Module | Show a student's submitted applications and current status |
| Admin Application Management Module | Let authorized admins view applications and update their status |
| Database Access Module | Organize database operations for students, administrators, opportunities and applications |
| User Interface Module | Provide pages and interactions for students and administrators |

These are logical modules. They do not require separate servers or microservices; they can be organized within a single Node.js/Express application.

### 4.3 Benefits for CampusCareer

- A change to the opportunity display page should not require rewriting application-status logic.
- Duplicate-application validation can be maintained in the Application Module.
- Each module can be tested separately before end-to-end testing.
- New features can be added in the future with less disruption to existing features.

## 5. Coupling and Cohesion Analysis

### 5.1 Coupling

**Coupling** describes how strongly one module depends on another module.

- **Low coupling** is preferred because a change in one module causes fewer changes in others.
- **High coupling** is undesirable because modules become difficult to change and test independently.

### 5.2 Cohesion

**Cohesion** describes how closely related the responsibilities within one module are.

- **High cohesion** is preferred because a module focuses on one clear responsibility.
- **Low cohesion** occurs when unrelated tasks are grouped in the same module.

### 5.3 Analysis of CampusCareer

| Module | Intended cohesion | Coupling approach |
|---|---|---|
| Authentication | High: handles registration, login and access checks | Expose clear authentication functions; do not let every page implement its own login checks |
| Opportunity | High: handles opportunity-related operations | Communicate through defined API routes and database functions |
| Application | High: handles application submission and duplicate checks | Use the authenticated student ID and selected opportunity ID rather than relying on UI-only validation |
| Application Tracking | High: focuses on retrieving and displaying application status | Obtain data through the backend rather than directly accessing database records from the frontend |
| Database Access | High: groups database queries and persistence operations | Keep database details out of frontend code |
| User Interface | High: focuses on presentation and user interaction | Call backend APIs instead of embedding database or business rules in UI code |

### 5.4 Example

When a student clicks **Apply**, the frontend sends an application request to the backend. The Application Module validates the request, checks whether the student has already applied, and saves the new application through database operations.

The frontend does not directly write to MongoDB. This separation lowers coupling and keeps the duplicate-application business rule in one responsible place.

## 6. Function-Oriented vs Object-Oriented Design

### 6.1 Function-Oriented Design

Function-oriented design organizes a system primarily around functions or procedures. Data is passed to functions that perform operations on it.

**Example for CampusCareer:**
- `registerStudent()`
- `loginUser()`
- `getOpportunities()`
- `applyForOpportunity()`
- `updateApplicationStatus()`

**Advantages:**
- Straightforward for small, procedural tasks.
- Easy to follow when the workflow is mostly a sequence of operations.

**Limitations:**
- As features grow, data and operations can become spread across many functions.
- Related data and behavior may be harder to keep together if there is no clear structure.

### 6.2 Object-Oriented Design

Object-oriented design organizes software around objects that combine data and related behavior. Common concepts include classes, objects, encapsulation and relationships.

**Example for CampusCareer:**
- `Student`
- `Admin`
- `Opportunity`
- `Application`

An `Application` represents a student's application to an opportunity and can be associated with its student, opportunity and status. The existing class diagram models these core entities and their relationships.

**Advantages:**
- Related data and responsibilities can be grouped together.
- Classes provide a natural way to model project entities.
- The design can be extended without placing all responsibilities in one large module.

**Limitations:**
- Too many classes or unnecessary abstractions can make a small project harder to understand.
- Object-oriented design still needs good module boundaries and clear responsibilities.

### 6.3 Comparison and Choice

| Basis | Function-oriented | Object-oriented |
|---|---|---|
| Main organization | Functions/procedures | Classes and objects |
| Focus | Operations to perform | Entities, data and behavior |
| Example | `applyForOpportunity()` | `Application` associated with a `Student` and `Opportunity` |
| Best fit here | Useful for individual service functions and workflows | Useful for modeling CampusCareer's main entities |

**Selected approach:** CampusCareer will use an object-oriented domain model for entities such as Student, Admin, Opportunity and Application, while using functions/controllers to handle API operations. This is a practical combination rather than forcing every part of the project into a class.

## 7. Top-Down vs Bottom-Up Design

### 7.1 Top-Down Design

Top-down design begins with the complete system and divides it into progressively smaller subsystems and modules.

**CampusCareer example:**
1. Identify the main system: CampusCareer.
2. Divide it into Student, Admin, Opportunity and Application areas.
3. Define the API operations for each area.
4. Implement the relevant functions and database operations.

**Advantages:** Keeps the overall requirements and system structure in view.

### 7.2 Bottom-Up Design

Bottom-up design starts with smaller components and combines them to build larger subsystems.

**CampusCareer example:**
1. Create reusable input-validation and database functions.
2. Build specific operations such as fetching opportunities or saving applications.
3. Combine these operations into backend routes and workflows.
4. Connect the backend routes to the user interface.

**Advantages:** Small components can be checked individually and reused.

### 7.3 Comparison and Choice

| Basis | Top-down | Bottom-up |
|---|---|---|
| Starting point | Whole system and its requirements | Small, reusable components |
| Main benefit | Preserves an overall plan | Encourages component reuse and early component testing |
| CampusCareer use | Define modules and responsibilities from the SRS | Implement and test utility/database functions before integrating them |

**Selected approach:** Use a **hybrid approach**. Begin top-down by defining features and module boundaries from the SRS. Then implement and test smaller components bottom-up, integrating them into complete student and admin workflows.

## 8. Design Decisions for CampusCareer

1. Keep the frontend, backend API and database access responsibilities separate.
2. Keep the system as one straightforward web application; microservices are not required for this academic scope.
3. Validate inputs in the backend, even if the frontend also performs basic validation.
4. Enforce the duplicate-application rule in the backend/database workflow, not only by hiding or disabling the Apply button in the UI.
5. Require authentication for protected student and administrator operations.
6. Limit administrator operations to authorized administrators.
7. Keep application status values consistent, such as Pending, Selected and Rejected, as described in the SRS.
8. Use clear module/function names and test the main operations independently before integrating them.

## 9. Expected Benefits

Applying these design principles should make CampusCareer:
- Easier to maintain because responsibilities are separated.
- Easier to test because individual modules have clear purposes.
- Less error-prone because important rules are handled in the backend.
- Easier to extend with future features without introducing unnecessary architectural complexity.

These are expected design benefits; they should be verified during implementation and testing.

## 10. Conclusion

The design analysis shows that CampusCareer should be divided into cohesive modules with low dependencies between them. An object-oriented model is suitable for its main entities, while functions and API controllers handle operations. A hybrid top-down and bottom-up approach is practical: define the system from the requirements first, then build and test small components before integration.

This approach aligns the design with CampusCareer's SRS and keeps the project understandable, maintainable and appropriate for an academic demonstration.

---

## Viva Quick Revision

**Q1. What is modularization?**  
Dividing software into smaller modules, each with a clear responsibility.

**Q2. What is coupling?**  
The degree of dependency between modules. Lower coupling is generally preferred.

**Q3. What is cohesion?**  
How closely related the responsibilities within a module are. Higher cohesion is generally preferred.

**Q4. Which design approach is suitable for CampusCareer?**  
An object-oriented model for the main entities, with functions/controllers for API operations.

**Q5. What is the difference between top-down and bottom-up design?**  
Top-down starts with the complete system and breaks it into modules. Bottom-up starts with small components and combines them into larger parts.

**Q6. Why use both approaches?**  
Top-down planning keeps the design aligned with requirements; bottom-up implementation supports component-level testing and reuse.
