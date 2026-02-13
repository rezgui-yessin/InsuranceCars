# 🚗 Auto Insurance Management System

A comprehensive, full-stack web application for managing car insurance policies, claims, and payments. This system features a robust Spring Boot backend and a modern Angular frontend, designed with Role-Based Access Control (RBAC) for Administrators, Agents, and Clients.

---

## 🏗️ Architecture & Tech Stack

This project is a monorepo consisting of two main functionalities:

### 🔙 [Backend Service](./backend/)
Built with **Java 17** and **Spring Boot 3**.
*   **Core**: Spring Web, Spring Data JPA, Spring Security.
*   **Database**: PostgreSQL.
*   **Authentication**: JWT (JSON Web Tokens).
*   **Documentation**: OpenAPI / Swagger UI.
*   **Tooling**: Maven, Lombok.

### 🎨 [Frontend Application](./front/)
Built with **Angular 18**.
*   **UI Framework**: Bootstrap 5 & Bootstrap Icons.
*   **Architecture**: Standalone Components, Lazy Loading, Role-based Guards.
*   **State Management**: RxJS services.

---

## 👥 Actors & Capabilities

This system uses Role-Based Access Control (RBAC) to provide a tailored experience for each type of user.

### 👤 Client (The Policyholder)
The end-user looking to insure their vehicle.
*   **Account Management**: Register, login, and update personal profile.
*   **Vehicle Management**: Register new cars, upload car photos, and view vehicle details.
*   **Policy Management**: Browse insurance plans (Basic, Premium, Full Coverage), purchase new policies, and view active/expired policies.
*   **Claims Operations**: File new accident claims, upload incident photos/documents, and track claim status (Pending, Approved, Rejected).
*   **Financials**: View payment history, download invoices, and check upcoming renewal dates.
*   **Dashboard**: A personalized overview of cars, active policies, and pending actions.

### 👔 Agent (The Broker)
The intermediary who manages relationships and sales.
*   **Client Management**: View list of assigned clients and their policy history.
*   **Policy Operations**: Review and approve policy applications, create policies on behalf of clients.
*   **Claims Processing**: Review claim submissions from assigned clients and provide initial assessments.
*   **Performance Tracking**: Access a dedicated dashboard showing active policies count, pending tasks, and commission earnings.

### 🛡️ Admin (The System Manager)
The super-user with full control over the platform.
*   **User Management**: Create, view, update, or delete Client and Agent accounts.
*   **System Oversight**: Global view of all policies, claims, and consolidated financial transactions.
*   **Reporting**: Access to system-wide statistics (Total Revenue, Active Users, Claim Ratios) and visual charts.
*   **Configuration**: Manage system settings, define insurance plans, and set pricing rules.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1️⃣ Prerequisites

Ensure you have the following installed:
*   **Java JDK 17** or higher
*   **Node.js 18** (LTS) or higher
*   **PostgreSQL 14** or higher
*   **Maven** (optional, wrapper is included)
*   **Angular CLI** (`npm install -g @angular/cli`)

---

### 2️⃣ Database Setup

1.  Open your PostgreSQL tool (PgAdmin, DBeaver, or CLI).
2.  Create a new database named `insurance_db`.
    ```sql
    CREATE DATABASE insurance_db;
    ```
3.  (Optional) The default credentials are set to `username: postgres`, `password: root`. If yours differ, update the configuration file in `backend/src/main/resources/application.properties`.

---

### 3️⃣ Backend Setup (API)

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies and build the project:
    ```bash
    ./mvnw clean install
    ```
    *(Windows: use `mvnw`)*
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
4.  The backend server will start at **`http://localhost:8080`**.
    *   **Swagger API Docs**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

### 4️⃣ Frontend Setup (UI)

1.  Navigate to the frontend folder:
    ```bash
    cd front
    ```
2.  Install NPM dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    ng serve
    ```
    *(Or `npm start`)*
4.  Open your browser and navigate to **`http://localhost:4200`**.

---

## 🔑 Default Configuration

*   **Database Port**: `5432`
*   **Backend Port**: `8080`
*   **Frontend Port**: `4200`
*   **JWT Secret**: Configured in `application.properties`.

## 📂 Project Structure

```bash
InsurancePj/
├── backend/          # Spring Boot Application (API)
│   ├── src/
│   ├── pom.xml
│   └── README.md     # Detailed Backend Documentation
├── front/            # Angular Application (Client)
│   ├── src/
│   ├── angular.json
│   └── README.md     # Detailed Frontend Documentation
└── README.md         # (This File)
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.


