const { sequelize } = require('./src/models');

async function resetDatabase() {
    try {
        console.log('🔄 Resetting database...');

        // Force sync (drops all tables and recreates them)
        await sequelize.sync({ force: true });

        console.log('✅ Database reset complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
}

resetDatabase();
