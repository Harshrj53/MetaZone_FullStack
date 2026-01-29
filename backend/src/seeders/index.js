const { sequelize } = require('../models');
const seedCategories = require('./categorySeeder');
const seedProducts = require('./productSeeder');

async function runSeeders() {
    try {
        console.log('🚀 Starting database seeding process...\n');

        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Database connection established\n');

        // Sync models (without force to preserve existing data)
        await sequelize.sync();
        console.log('✅ Database models synced\n');

        // Run seeders in order (categories first, then products)
        await seedCategories();
        console.log('');
        await seedProducts();

        console.log('\n🎉 All seeders completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    }
}

runSeeders();
