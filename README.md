# Enterprise Express.js REST API Template

[![NODEJS Version](https://img.shields.io/badge/Node.js-%3E=16.14-brightgreen)](https://nodejs.org/en/)
[![Express Version](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A robust, enterprise-grade REST API backend template built with **Express.js**. This template provides a highly scalable, maintainable, and testable foundation for building modern web applications, microservices, and large-scale APIs.

## 🏗 Architecture Overview

This project is meticulously designed around three core architectural principles to ensure clean code and separation of concerns:

1. **Layered Architecture**: Separation of routing (Controllers), business logic (Services), and data access (Repositories).
2. **Modular Architecture**: Features are encapsulated into isolated modules (e.g., User, Product, Order) rather than grouped by technical roles.
3. **Dependency Injection (DI)**: Powered by [Awilix](https://github.com/jeffijoe/awilix), enabling seamless coupling management, inversion of control, and effortless unit testing.

---

## ✨ Key Features

- ✅ **Unified JSON Response Structure**: Consistent and standardized API contracts (`success`, `message`, `data`/`errors`).
- ✅ **Centralized Exception Handling**: A global error handler that catches all structural, validation, and domain-specific errors and gracefully maps them to standard API responses.
- ✅ **Dependency Injection Container**: Out-of-the-box DI container setup for managing application context.
- ✅ **Framework-Agnostic Business Logic**: Services remain completely unaware of the HTTP layer (Express `req`/`res`).
- ✅ **Scalable Folder Structure**: Modular folder layouts ready for enterprise scalability.

---

## 🧰 Tech Stack & Tools

This template leverages the best modern tools to ensure stability, performance, and developer experience.

| Technology/Tool   | Purpose                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Node.js**       | The runtime environment capable of handling high-throughput asynchronous operations.                                    |
| **Express.js**    | The minimalist and fast web framework used for routing HTTP requests.                                                   |
| **Awilix**        | Dependency Injection (DI) container ensuring loose coupling and testability across layers.                              |
| **Winston**       | Centralized, enterprise-ready logging to write server activities and errors directly to rotating `.log` files.          |
| **ESLint**        | Enforces consistent code quality and catches syntax errors early. Configured here with `airbnb-base` rules.             |
| **Nodemon**       | A development utility that automatically restarts the node application when file changes in the directory are detected. |
| **Dotenv**        | Securely loads environment variables from a `.env` file into `process.env`.                                             |
| **Helmet & CORS** | Provides robust security by setting various HTTP headers and managing Cross-Origin restrictions.                        |

---

## 📂 Folder Structure

The directory structure is purposely domain-driven.

```text
api-expresjs/
├── src/
│   ├── app.js                 # Express app setup, global middlewares, and unified error handler
│   ├── server.js              # Application entry point: Bootstraps the DI container and starts the server
│   ├── container.js           # Awilix DI Container configuration and module registrations
│   │
│   ├── config/                # Environment variables and application configurations loader (.env)
│   │
│   ├── core/                  # Core application logic shared across all modules
│   │   ├── exceptions/        # Custom ApiError classes and global error handlers
│   │   ├── middlewares/       # Shared Express middlewares (Auth, Validation, etc.)
│   │   └── utils/             # Helper utilities like custom Response Formatters
│   │
│   ├── infrastructure/        # Adapters for external systems (Database Connections, Redis, external APIs)
│   │
│   └── modules/               # 👈 Domain-driven feature modules reside here
│       └── health/            # Example feature/module (Health Check)
│           ├── health.controller.js  # Presentation Layer (HTTP Request/Response)
│           ├── health.routes.js      # Express Router mappings
│           └── index.js              # DI Container registration entry point for this module
...
```

---

## 🔄 Request Lifecycle & Layered Flow

All incoming requests adhere strictly to the following layered pipeline, communicating via the DI Container interface without tight coupling:

```text
 Client Request
       │
       ▼
    Router        (Routes HTTP paths to specific Controller methods)
       │
       ▼
  Controller      (Parses request, validates input, formats unified response)
       │
       ▼
   Service        (The core Business/Domain Logic. HTTP-agnostic)
       │
       ▼
  Repository      (Data Access Layer. Communicates with Database/ORM)
       │
       ▼
   Database       (PostgreSQL, MongoDB, MySQL, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js >= 16.14.0
- npm or yarn

### Installation

1. Clone the repository and navigate into the project directory:

   ```bash
   cd api-expresjs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy the provided `.env.example` file and configure your local settings.

   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The server will start running on the designated port (default: `http://localhost:3000`).

### Verify Setup

You can verify the API is running correctly by hitting the health check endpoint:

```bash
curl http://localhost:3000/api/v1/health
```

---

## 🛠 Adding a New Feature (Module)

To build a new feature (e.g., `Users`), follow these steps within the `src/modules` directory:

1. Create a folder: `src/modules/users`.
2. Create your Data Access Layer: `users.repository.js`.
3. Create your Business Logic Layer: `users.service.js` (injecting the repository through the constructor).
4. Create your Presentation Layer: `users.controller.js` (injecting the service through the constructor).
5. Map your endpoints: `users.routes.js`.
6. Export the module components via an `index.js` file to register them into the main `src/container.js`.

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
