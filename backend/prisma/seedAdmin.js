const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' }
  });

  if (existingAdmin) {
    console.log('An admin user already exists. Skipping default admin creation.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@metazone.com',
      password: hashedPassword,
      role: 'admin',
      isBlocked: false
    }
  });

  console.log('Default admin created successfully!');
  console.log(`Email: ${admin.email}`);
  console.log(`Password: admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
