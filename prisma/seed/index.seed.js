import prismaClient from '#/infrastructure/database/connection.js';

const permissions = [
  { nm_permission: 'Create User', module: 'user', action: 'create' },
  { nm_permission: 'Read User', module: 'user', action: 'read' },
  { nm_permission: 'Update User', module: 'user', action: 'update' },
  { nm_permission: 'Delete User', module: 'user', action: 'delete' },
];

async function main() {
  console.log('Seeding permissions...');
  for (const permission of permissions) {
    await prismaClient.permission.upsert({
      where: {
        module_action: {
          module: permission.module,
          action: permission.action,
        },
      },
      update: {
        nm_permission: permission.nm_permission,
      },
      create: permission,
    });
  }
  console.log('permissions seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
