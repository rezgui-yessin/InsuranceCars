# Auto Insurance System - Backend

This is the Spring Boot 3 backend for a comprehensive Car Insurance Management System. It provides RESTful APIs for Clients, Agents, and Administrators to manage insurance policies, claims, cars, and payments.

## 🚀 Tech Stack

- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Security** with **JWT** Authentication
- **Spring Data JPA** (Hibernate)
- **PostgreSQL** Database
- **Lombok**
- **Maven**
- **Swagger / OpenAPI 3** for API Documentation

## 📂 Project Modules

1.  **Authentication & Authorization**
    -   JWT-based security.
    -   Role-Based Access Control (RBAC): `ADMIN`, `AGENT`, `CLIENT`.
2.  **User Management**
    -   Admin dashboard to manage users.
    -   Profile management for Clients and Agents.
3.  **Car Management**
    -   CRUD operations for cars.
    -   **Image Upload** support for car photos.
4.  **Policy Management**
    -   Create and manage insurance policies (Basic, Premium, Full).
    -   Assign policies to clients and cars.
5.  **Claims Processing**
    -   Submit claims with document references.
    -   Agent approval/rejection workflow.
6.  **Payments**
    -   Track payments linked to policies.

## 🛠️ Prerequisites

-   **Java 17** SDK installed.
-   **Maven** installed (or use `./mvnw`).
-   **PostgreSQL** installed and running.

## ⚙️ Setup & Configuration

### 1. Database Setup

Create a PostgreSQL database named `insurance_db`:

```sql
CREATE DATABASE insurance_db;
```

### 2. Configuration (`application.properties`)

The configuration is located in `src/main/resources/application.properties`. Update the database credentials if necessary:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/insurance_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### 3. File Upload Directory

The application will automatically create an `uploads` directory in the project root to store car images.

## ▶️ How to Run

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd auto-insurance-system/backend
    ```

2.  **Build and Run**:
    ```bash
    mvn spring-boot:run
    ```

The application will start on `http://localhost:8080`.

## 📚 API Documentation

Once the application is running, you can access the full API documentation via **Swagger UI**:

👉 **[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

## 🔑 Default Credentials

On the first run, a default **Admin** account is created:

-   **Email**: `admin@insurance.com`
-   **Password**: `admin123`

## 🧪 Testing with Postman (Quick Start)

1.  **Login** (POST `/api/auth/login`) with the admin credentials or register a new user.
2.  Copy the `token` from the response.
3.  In subsequent requests, add the header:
    -   **Key**: `Authorization`
    -   **Value**: `Bearer <your_token>`

## 🌐 Frontend Integration

-   **CORS** is enabled for `http://localhost:4200` (Angular default).
-   **Car Images**: To upload a car with an image, use `POST /api/client/cars` with `multipart/form-data`:
    -   `car`: JSON string (e.g., `{"brand":"BMW", ...}`)
    -   `image`: File upload.

## 📝 License

This project is licensed under the MIT License.
