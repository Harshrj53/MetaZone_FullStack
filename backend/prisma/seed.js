const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const productsCount = await prisma.product.count();
    if (productsCount > 0) {
        console.log('We already have products! Skipping seed to prevent duplicates.');
        return;
    }

    console.log('Generating seed categories and products...');

    // Upsert categories
    const electronics = await prisma.category.upsert({
        where: { name: 'Electronics' },
        update: {},
        create: { name: 'Electronics', description: 'Gadgets and gear' }
    });

    const sports = await prisma.category.upsert({
        where: { name: 'Sports' },
        update: {},
        create: { name: 'Sports', description: 'Active lifestyle gear' }
    });

    const home = await prisma.category.upsert({
        where: { name: 'Home' },
        update: {},
        create: { name: 'Home', description: 'For your living space' }
    });

    // Create products
    await prisma.product.createMany({
        data: [
            {
                name: 'Premium Wireless Headphones',
                description: 'High quality noise cancelling headphones with 40-hour battery life and spatial audio.',
                price: 199.99,
                stock: 50,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                categoryId: electronics.id
            },
            {
                name: 'Aerodynamic Running Shoes',
                description: 'Ultra-lightweight mesh running shoes designed for marathon athletes.',
                price: 129.99,
                stock: 120,
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
                categoryId: sports.id
            },
            {
                name: 'Minimalist Smart Watch',
                description: 'Track your fitness, heart rate, and notifications in a sleek titanium frame.',
                price: 249.99,
                stock: 35,
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
                categoryId: electronics.id
            },
            {
                name: 'Artisan Coffee Maker',
                description: 'Brew the perfect cup of coffee with temperature control and built-in frother.',
                price: 89.99,
                stock: 200,
                imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
                categoryId: home.id
            }
        ],
    });
    console.log('✅ Seed data successfully created across new Relational Categories!');
}

main()
    .catch(e => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
