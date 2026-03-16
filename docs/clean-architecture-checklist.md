# Clean Architecture Verification Checklist

Ringkasan: checklist ini membantu memastikan boundary antara layer terpenuhi dan mudah di-otomasi.

1. Domain Layer (src/modules/**/domain)
   - [ ] Tidak ada impor dari `src/modules/**/infrastructure` atau `src/modules/**/interfaces`.
   - [ ] Hanya mendefinisikan entitas, value objects, dan port (repository interfaces).

2. Application / Use-cases (src/modules/**/application)
   - [ ] Hanya mengimpor dari `domain` dan DTO (`src/modules/**/application/dtos`).
   - [ ] Tidak langsung mengimpor implementasi infrastruktur (Prisma, Jwt, dll.).
   - [ ] Semua dependency eksternal masuk melalui konstruktor (DI).

3. Interface Adapters (src/modules/**/interfaces)
   - [ ] Controllers dan middleware memanggil use-cases (port/adapters), bukan repos langsung.
   - [ ] Validation & OpenAPI schema untuk HTTP berada di `interfaces`.
   - [ ] Routes mengimpor `interfaces` validation, bukan `infrastructure` validation.

4. Infrastructure (src/modules/**/infrastructure)
   - [ ] Semua akses DB dan implementasi repositori di sini.
   - [ ] Service infra (PasswordHasher, JwtService, Prisma client) hanya di sini.
   - [ ] Implementasi memenuhi kontrak yang didefinisikan di `domain/repositories`.

5. Composition Root / DI (src/container.js)
   - [ ] Hanya `container.js`/`server.js` yang mengikat port → implementasi.
   - [ ] Container mendaftarkan `prisma`, `passwordHasher`, dan module modules/**/infrastructure implementations.

6. Tests
   - [ ] Tambahkan test integrasi yang mem-mock infra (contoh: `tests/integration/register.mock.integration.test.js`).
   - [ ] Tambahkan unit test untuk use-cases yang mem-mock repository/hasher.

7. Automation / Linting
   - [ ] Jalankan `npx dependency-cruiser --config .dependency-cruiser.js --validate src` untuk mendeteksi pelanggaran.
   - [ ] Tambahkan script NPM: `npm run depcruise` (sudah ada) dan jalankan di CI.
   - [ ] Opsional: tambahkan rule ESLint custom atau `dependency-cruiser` rules yang lebih ketat.

8. Remediation Steps jika pelanggaran ditemukan
   - [ ] Pindahkan file validation dari `infrastructure` → `interfaces` (sudah dipindahkan).
   - [ ] Abstraksi panggilan bcrypt/jwt ke service infra (contoh: `PasswordHasher`).
   - [ ] Pastikan use-case menerima `passwordHasher` lewat konstruktor.

9. Useful Commands
   - `npm run depcruise` — jalankan pemeriksaan dependency-cruiser
   - `node --experimental-vm-modules node_modules/jest/bin/jest.js tests/integration/register.mock.integration.test.js -i` — jalankan test integrasi mocked

Referensi file yang diubah selama evaluasi:
- [src/modules/user/application/usecases/RegisterUser.js](src/modules/user/application/usecases/RegisterUser.js)
- [src/modules/user/infrastructure/security/PasswordHasher.js](src/modules/user/infrastructure/security/PasswordHasher.js)
- [src/modules/user/interfaces/validation/user.validation.js](src/modules/user/interfaces/validation/user.validation.js)
- [src/modules/user/interfaces/validation/user.schema.js](src/modules/user/interfaces/validation/user.schema.js)
- [tests/integration/register.mock.integration.test.js](tests/integration/register.mock.integration.test.js)
- [.dependency-cruiser.js](.dependency-cruiser.js)
