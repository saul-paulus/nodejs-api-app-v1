# Module Development Flow

Dokumentasi ini menjelaskan alur standar untuk menambahkan fitur atau modul baru ke dalam project ini menggunakan prinsip **Clean Architecture**.

## Arsitektur Layer

Setiap modul dibagi menjadi 4 layer utama:
1.  **Domain**: Logika bisnis inti (Entitas & Interface).
2.  **Application**: Orkestrasi fitur (Use Cases & DTO).
3.  **Infrastructure**: Implementasi teknis (Database, Security, Third-party).
4.  **Interfaces**: Entry point (Controllers & Routes).

---

## Langkah-langkah Menambah Modul Baru (Contoh: `Auth`)

### 1. Layer Domain
Tentukan kontrak data dan repository di layer paling dalam.
- **Entities**: `src/modules/auth/domain/entities/Auth.js` (Opsional).
- **Repositories**: `src/modules/auth/domain/repositories/AuthRepository.js` (Interface).

```javascript
export default class AuthRepository {
  async findByUsername(_username) { throw new Error('Not implemented'); }
}
```

### 2. Layer Infrastructure (Data Area)
Implementasikan repository yang sudah didefinisikan di domain.
- **Repository Impl**: `src/modules/auth/infrastructure/repositories/PrismaAuthRepository.js`.

```javascript
export default class PrismaAuthRepository {
  constructor({ prisma }) { this.prisma = prisma; }
  async findByUsername(username) { 
    return this.prisma.users.findUnique({ where: { username } });
  }
}
```

### 3. Layer Application
Buat logika bisnis spesifik untuk fitur tersebut.
- **Use Case**: `src/modules/auth/application/usecases/LoginUseCase.js`.
- **DTO**: `src/modules/auth/application/dtos/auth.dto.js`.

```javascript
export default class LoginUseCase {
  constructor({ authRepository, jwtService }) {
    this.authRepository = authRepository;
    this.jwtService = jwtService;
  }
  async execute(credentials) {
    // Logika login...
  }
}
```

### 4. Layer Interfaces
Buat Controller untuk menangani HTTP request dan Routes untuk definisi endpoint.
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

### 5. Registrasi Global

1.  **Awilix (Container)**: 
    Secara default, Awilix akan melakukan **Auto-load** terhadap semua file di `usecases`, `repositories`, `controllers`, dan `routes`.
    File `PrismaAuthRepository.js` akan terdaftar sebagai `prismaAuthRepository`.
    
    Jika Anda ingin alias khusus (misal `authRepository`), tambahkan di `src/container.js`:
    ```javascript
    container.register({
      authRepository: asFunction(({ prismaAuthRepository }) => prismaAuthRepository).scoped(),
    });
    ```

2.  **Express (App)**:
    Daftarkan router baru di `src/app.js`:
    ```javascript
    app.use('/api/v1/auth', container.resolve('authRoutes'));
    ```

---

## Ringkasan Penamaan (Convention)
- **Use Case**: Akhiri dengan `UseCase.js` (CamelCase).
- **Controller**: Akhiri dengan `Controller.js` (CamelCase).
- **Routes**: Akhiri dengan `.routes.js` (lowercase).
- **Repository Implementation**: Awali dengan provider (misal: `PrismaUserRepository.js`).
