# Enterprise Express.js Starter Kit

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E=18.0.0-brightgreen)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-4.18-blue)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2b2d42)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A maintainable, scalable, and enterprise-ready backend template built with **Node.js** and **Express.js**, following **Clean Architecture** principles and **Modular Design**.

## 🏗 Architecture & Design Patterns

### Clean Architecture
The project is divided into four main layers to ensure separation of concerns and testability:
- **Domain Layer**: Contains Entities and Repository Interfaces (Pure Business Logic).
- **Application Layer**: Contains Use Cases and DTOs (Orchestrates Business Flow).
- **Infrastructure Layer**: Technical implementations (Prisma, Security, Services).
- **Interface Layer**: Web layer containing Controllers and Routes.

### Key Patterns
- **Modular Monolith**: Features are encapsulated in independent modules.
- **Dependency Injection**: Managed via [Awilix](https://github.com/jeffijoe/awilix) for automatic wiring.
- **Repository Pattern**: Abstraction of data access.
- **Middleware-based Validation**: Request validation using [Joi](https://joi.dev/).

## 🛠 Tech Stack

- **Core**: Node.js (ESM), Express.js
- **Database & ORM**: PostgreSQL/MySQL, Prisma
- **DI Container**: Awilix
- **Authentication**: JWT (jsonwebtoken), Bcrypt
- **Security**: Helmet, CORS
- **Logging**: Winston & Winston Daily Rotate File
- **Validation**: Joi
- **Documentation**: Swagger UI (swagger-jsdoc)
- **Testing**: Jest, Supertest

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- NPM or Yarn
- Database (PostgreSQL/MySQL)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd start-api-expresjs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup Environment Variables:
   ```bash
   cp .env.example .env
   # Update JWT_SECRET and DATABASE_URL in .env
   ```

### Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Sync Database Schema
npx prisma db push
```

### Running the App
```bash
# Development mode
npm run dev

# Production mode
npm run start
```

## 📖 API Documentation

Documentation is automatically generated and available via Swagger UI.

- **Swagger URL**: `http://localhost:3000/api-docs`

### Core Endpoints (`/api/v1`)

| Module | Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | POST | `/auth/login` | Login to get JWT Token | Public |
| **User** | GET | `/users/auth/me` | Get current user profile | Private |
| **User** | GET | `/users` | List all users (Paginated) | Private |
| **User** | POST | `/users` | Create new user | Private |
| **User** | GET | `/users/:idPersonal` | Get user by Personal ID | Private |
| **User** | PUT | `/users/:id` | Update user data | Private |
| **User** | DELETE | `/users/:id` | Delete user | Private |
| **Health** | GET | `/health` | Check system health | Public |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/integration/auth.integration.test.js
```

## 📁 Project Structure

```text
src/
├── modules/                # Domain-driven modules (Authentication, User, etc.)
├── infrastructure/         # Global external services & database config
├── shared/                 # Shared utilities, errors, and middleware
├── config/                 # App configurations (Env, Logger)
├── container.js            # Dependency Injection Registry
├── app.js                  # Express App Setup
└── server.js               # Application Entry Point
```

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
