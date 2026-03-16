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
| **Prisma**        | Object-Relational Mapping (ORM) for database management.                                                                |
| **Bcrypt**        | Password hashing for secure authentication.                                                                             |
| **Jest**          | Testing framework for unit and integration testing.                                                                     |
| **Joi**           | Schema description language and validator for JavaScript objects.                                                       |
| **Babel**         | JavaScript compiler that converts code using new syntax into backward-compatible versions of JavaScript.                |
| **Swagger**       | Doc for Spec API                                                                                                        |

---

## 📂 Folder Structure

The directory structure is purposely domain-driven.

```text
api-expresjs/
src/
├── core/                   # Cross-cutting concerns & Shared Domain logic
│   ├── exceptions/         # Global error types (ApiError, DomainError)
│   ├── middlewares/        # Express global middlewares
│   └── utils/              # Shared helper functions
├── modules/                # Bounded Contexts (Feature-based)
│   └── user/               # User Module
│       ├── domain/         # Layer 1: Entities & Business Rules
│       │   ├── user.js     # User Entity
│       │   └── errors.js   # User-specific Domain Errors
│       ├── application/    # Layer 2: Use Cases & Application Logic
│       │   ├── use-cases/  # Orchestrates business logic
│       │   │   ├── register-user.js
│       │   │   └── get-user.js
│       │   └── dtos/       # Data Transfer Objects
│       ├── infrastructure/ # Layer 3: External Implementations
│       │   ├── persistence/ # Database (Prisma)
│       │   │   └── prisma-user.repository.js
│       │   ├── http/        # Web layer (Controller, Routes)
│       │   │   ├── user.controller.js
│       │   │   └── user.routes.js
│       │   └── validation/  # Request validation logic
│       └── index.js         # Entry point (DI registration)
└── infrastructure/          # Layer 4: Frameworks & Drivers
    ├── database/            # Database client setup (Prisma)
    └── third-party/         # External service clients (Email, S3, etc.)
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
   Service        (The core Business/Logic. Layered in Application layer)
       │
       ▼
  Repository      (Data Access Layer. Communicates with Database/ORM)
       │
       ▼
   Database       (PostgreSQL, MongoDB, MySQL, etc.)
```

### 📖 Layer Descriptions

#### 1. Domain Layer (`modules/*/domain/`)
- **Purpose**: Pure business logic and domain definitions.
- **Content**: Entities, Value Objects, Domain Services.
- **Rule**: NO dependencies on other layers (DB, Express, etc.).

#### 2. Application Layer (`modules/*/application/`)
- **Purpose**: Orchestrates the flow of data to and from the domain layer.
- **Content**: Use cases (Services), Repository Interfaces, DTOs.
- **Rule**: Can depend on the Domain Layer.

#### 3. Infrastructure Layer (`modules/*/infrastructure/`)
- **Purpose**: Implementations of external tools and frameworks.
- **Content**: API Controllers, Repository implementations (Prisma), Router definitions, Validation.
- **Rule**: Can depend on Application and Domain layers.

#### 4. Shared Layer (`src/shared/`)
- **Purpose**: Shared utilities and base classes.
- **Content**: Base Exception classes, Global Middlewares, Validation utilities, logging.

### 💡 Why this structure?
- **Highly Modular**: Adding a new feature means adding a new folder in `modules/`.
- **Easy to Test**: Use cases and Entities can be tested without a database or server.
- **Decoupled**: You can swap Prisma for another ORM by only changing the `persistence/` folder inside the module.
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

To build a new feature (e.g., `Users`), follow these structured steps within the `src/modules` directory:

1. **Create Module Directory**: `src/modules/users`.
2. **Setup Layers**:
   - `application/use-cases/`: Business logic services.
   - `domain/`: Entities and domain errors.
   - `infrastructure/http/`: Controllers and routes.
   - `infrastructure/persistence/`: Repository implementation.
   - `infrastructure/validation/`: Request validation and schemas.
3. **Register Persistence**: Implement `prisma-users.repository.js`.
4. **Register Logic**: Implement `users.service.js` (injecting the repository).
5. **Register Presentation**: Implement `users.controller.js` and `users.routes.js`.
6. **Export & Register**: Create/update `index.js` within the module to register all components into the main DI container.

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
