## Prisma schema modular

- **Source of truth**: file-file di folder `prisma/schema/*.prisma`
- **Output generated**: `prisma/schema.prisma` (auto-generated, jangan diedit manual)

### Perintah

- Build schema: `npm run prisma:schema:build`
- Generate client: `npm run prisma:generate`
- Migrate: `npm run prisma:migrate`
- Studio: `npm run prisma:studio`

### Aturan

- `prisma/schema/_base.prisma` wajib berisi `generator` + `datasource`
- File lain khusus `model/enum/type` per domain (contoh: `user.prisma`, `product.prisma`, dst.)
