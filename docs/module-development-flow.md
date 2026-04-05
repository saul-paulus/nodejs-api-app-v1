# Module Development Flow

This documentation explains the standard flow for adding new features or modules to this project using **Clean Architecture** principles.

## Layer Architecture

Each module is divided into 4 main layers:
1.  **Domain**: Core business logic (Entities & Interfaces).
2.  **Application**: Feature orchestration (Use Cases & DTOs).
3.  **Infrastructure**: Technical implementations (Database, Security, Third-party).
4.  **Interfaces**: Entry points (Controllers & Routes).

---

## Steps to Add a New Module (Example: `Auth`)

### 1. Domain Layer
Define data contracts and repository interfaces in the innermost layer.
- **Entities**: `src/modules/auth/domain/entities/Auth.js` (Optional).
- **Repositories**: `src/modules/auth/domain/repositories/AuthRepository.js` (Interface).

```javascript
export default class AuthRepository {
  async findByUsername(_username) { throw new Error('Not implemented'); }
}
```

### 2. Infrastructure Layer (Data Area)
Implement the repositories defined in the domain layer.
- **Repository Implementation**: `src/modules/auth/infrastructure/repositories/PrismaAuthRepository.js`.

```javascript
export default class PrismaAuthRepository {
  constructor({ prisma }) { this.prisma = prisma; }
  async findByUsername(username) { 
    return this.prisma.users.findUnique({ where: { username } });
  }
}
```

### 3. Application Layer
Create business logic specific to the feature.
- **Use Case**: `src/modules/auth/application/usecases/LoginUseCase.js`.
- **DTO**: `src/modules/auth/application/dtos/auth.dto.js`.

```javascript
export default class LoginUseCase {
  constructor({ authRepository, jwtService }) {
    this.authRepository = authRepository;
    this.jwtService = jwtService;
  }
  async execute(credentials) {
    // Login logic...
  }
}
```

### 4. Interfaces Layer
Create a Controller to handle HTTP requests and Routes to define endpoints.
- **Controller**: `src/modules/auth/interfaces/controllers/AuthController.js`.
- **Routes**: `src/modules/auth/interfaces/routes/auth.routes.js`.

```javascript
// routes
export default ({ authController }) => {
  const router = express.Router();
  router.post('/login', authController.login.bind(authController));
  return router;
};
```

### 5. Global Registration

1.  **Awilix (Container)**: 
    By default, Awilix **auto-loads** all files in `usecases`, `repositories`, `controllers`, and `routes`.
    The file `PrismaAuthRepository.js` will be registered as `prismaAuthRepository`.
    
    If you want a specific alias (e.g., `authRepository`), add it in `src/container.js`:
    ```javascript
    container.register({
      authRepository: asFunction(({ prismaAuthRepository }) => prismaAuthRepository).scoped(),
    });
    ```

2.  **Express (App)**:
    Register the new router in `src/app.js`:
    ```javascript
    app.use('/api/v1/auth', container.resolve('authRoutes'));
    ```

---

## Naming Conventions Summary
- **Use Case**: End with `UseCase.js` (CamelCase).
- **Controller**: End with `Controller.js` (CamelCase).
- **Routes**: End with `.routes.js` (lowercase).
- **Repository Implementation**: Start with the provider name (e.g., `PrismaUserRepository.js`).

---

## Documentation
For more details on how to develop modules, please refer to the [Module Development Flow](docs/module-development-flow.md).
