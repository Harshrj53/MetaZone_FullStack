const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Generating seed categories and products...');

    // Upsert categories
    const mens = await prisma.category.upsert({
        where: { name: 'Mens' },
        update: {},
        create: { name: 'Mens', description: 'Men\'s clothing and accessories' }
    });

    const womens = await prisma.category.upsert({
        where: { name: 'Womens' },
        update: {},
        create: { name: 'Womens', description: 'Women\'s fashion and apparel' }
    });
    
    const kids = await prisma.category.upsert({
        where: { name: 'Kids' },
        update: {},
        create: { name: 'Kids', description: 'Clothing and toys for kids' }
    });

    const electronics = await prisma.category.upsert({
        where: { name: 'Electronics' },
        update: {},
        create: { name: 'Electronics', description: 'Gadgets and gear' }
    });

    // Create products
    await prisma.product.createMany({
        data: [
            // ELECTRONICS
            {
                name: 'Premium Wireless Headphones',
                description: 'High quality noise cancelling headphones with 40-hour battery life and spatial audio.',
                price: 199.99,
                stock: 50,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                categoryId: electronics.id
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
                name: '4K Action Camera',
                description: 'Capture your adventures in stunning 4K resolution with built-in stabilization.',
                price: 299.99,
                stock: 15,
                imageUrl: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=800&q=80',
                categoryId: electronics.id
            },
            // MENS
            {
                name: 'Classic Leather Jacket',
                description: 'Timeless genuine leather jacket that never goes out of style.',
                price: 189.99,
                stock: 20,
                imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
                categoryId: mens.id
            },
            {
                name: 'Slim Fit Denim Jeans',
                description: 'Comfortable everyday denim tailored for a sleek fit.',
                price: 59.99,
                stock: 100,
                imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
                categoryId: mens.id
            },
            {
                name: 'Oxford Dress Shirt',
                description: 'Crisp white oxford shirt suitable for the office or evening wear.',
                price: 45.00,
                stock: 80,
                imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80',
                categoryId: mens.id
            },
            // WOMENS
            {
                name: 'Flowy Summer Dress',
                description: 'Lightweight floral dress perfect for beach days or summer dates.',
                price: 79.99,
                stock: 45,
                imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
                categoryId: womens.id
            },
            {
                name: 'Leather Crossbody Bag',
                description: 'Elegant minimalist bag engineered with premium top-grain leather.',
                price: 125.00,
                stock: 25,
                imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
                categoryId: womens.id
            },
            {
                name: 'Oversized Knit Sweater',
                description: 'Cozy and comfortable knit sweater for layering during colder months.',
                price: 65.50,
                stock: 60,
                imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=80',
                categoryId: womens.id
            },
            // KIDS
            {
                name: 'Dinosaur Graphic Tee',
                description: 'Fun and bright cotton t-shirt featuring T-Rex graphics.',
                price: 18.99,
                stock: 150,
                imageUrl: 'https://images.unsplash.com/photo-1519238263530-99abad67b86e?w=800&q=80',
                categoryId: kids.id
            },
            {
                name: 'Sturdy Denim Overalls',
                description: 'Durable playwear designed to withstand the toughest playground adventures.',
                price: 34.99,
                stock: 85,
                imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
                categoryId: kids.id
            },
            {
                name: 'Light-up Sneakers',
                description: 'Magic sneakers that light up with every step your kid takes.',
                price: 42.00,
                stock: 45,
                imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80',
                categoryId: kids.id
            }
        ],
    });
    console.log('✅ Seed data successfully created across Mens, Womens, Kids, and Electronics categories!');
}

main()
    .catch(e => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
