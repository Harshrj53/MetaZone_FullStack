const Category = require('../models/Category');

const sampleCategories = [
    {
        name: 'Men',
        description: 'Clothing and accessories for men'
    },
    {
        name: 'Women',
        description: 'Clothing and accessories for women'
    },
    {
        name: 'Electronics',
        description: 'Latest tech gadgets and electronics'
    },
    {
        name: 'Accessories',
        description: 'Fashion accessories and more'
    }
];

async function seedCategories() {
    try {
        console.log('🌱 Starting category seeding...');

        // Clear existing categories (if needed for fresh start)
        await Category.destroy({ where: {} });
        console.log('✅ Cleared existing categories');

        // Insert categories
        await Category.bulkCreate(sampleCategories);

        console.log(`✅ Successfully seeded ${sampleCategories.length} categories!`);
        sampleCategories.forEach(cat => {
            console.log(`   - ${cat.name}`);
        });

    } catch (error) {
        console.error('❌ Error seeding categories:', error);
        throw error;
    }
}

module.exports = seedCategories;
