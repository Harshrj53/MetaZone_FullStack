const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            {
                name: 'Wireless Headphones',
                description: 'High quality noise cancelling headphones.',
                price: 99.99,
                imageUrl: 'https://via.placeholder.com/400',
                category: 'Electronics'
            },
            {
                name: 'Running Shoes',
                description: 'Comfortable running shoes.',
                price: 59.99,
                imageUrl: 'https://via.placeholder.com/400',
                category: 'Sports'
            },
            {
                name: 'Smart Watch',
                description: 'Track your fitness and notifications.',
                price: 149.99,
                imageUrl: 'https://via.placeholder.com/400',
                category: 'Electronics'
            },
            {
                name: 'Coffee Maker',
                description: 'Brew the perfect cup of coffee.',
                price: 39.99,
                imageUrl: 'https://via.placeholder.com/400',
                category: 'Home'
            }
        ],
    });
    console.log('Seed data created');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
